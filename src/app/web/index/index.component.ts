import {Component, OnInit} from '@angular/core';
import {interval, Observable} from "rxjs";
import {AuthService} from "../../auth/services";
import {NotificationsModel} from "../../models/notifications.model";
import {environment} from "../../../environments/environment";
import {ServiceService} from "./page/service/service.service";
import {UserModel} from "../../auth/models/user.model";

@Component({
  selector: 'cons-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit{
  user$: Observable<any>;
  user: UserModel | undefined;

  notificationCount = 200;
  showDropdown = false;
  notifications: NotificationsModel[] = [];

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  constructor(private authService: AuthService, private service: ServiceService) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.getNoti();

    interval(30000).subscribe(() => {
      this.getNoti();
    });
    }

  getNoti(): void {
    this.service.getListNoti(1, 5, this.user?.id).subscribe(res => {
      if (res && res.content) {
        this.notifications = res.content;
      }
    })
  }

  onLogout1(): void {
    this.authService.logout1();
  }
}
