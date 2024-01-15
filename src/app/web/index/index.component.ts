import {Component, OnInit} from '@angular/core';
import {interval, Observable} from "rxjs";
import {AuthService} from "../../auth/services";
import {NotificationsModel} from "../../models/notifications.model";
import {environment} from "../../../environments/environment";
import {ServiceService} from "./page/service/service.service";
import {UserModel} from "../../auth/models/user.model";
import {RoomService} from "../../modules/room/services/room.service";
import {RoomModel} from "../../models/room.model";
import {Router} from "@angular/router";

@Component({
  selector: 'cons-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  user$: Observable<any>;
  user: UserModel | undefined;
  room: RoomModel[] = [];
  notificationCount = 200;
  showDropdown = false;
  notifications: NotificationsModel[] = [];
  searchInput: string = '';

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  constructor(private authService: AuthService, private service: ServiceService, private roomService: RoomService,
              private router: Router) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.getNoti();
    this.loadCartItems();
  }

  getNoti(): void {
    this.service.getListNoti(1, 5, this.user?.id).subscribe(res => {
      if (res && res.content) {
        this.notifications = res.content;
      }
    })
  }

  getRoomsSearch(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.roomService.getRoomBySearch(1, 50, this.searchInput).subscribe(res => {
      const queryParams = {
        searchInput: this.searchInput
      };
      if (res && res.content) {
        this.room = res.content;
      }
      this.router.navigate(['/room'], {queryParams});
    })
  }

  onLogout1(): void {
    this.authService.logout1();
  }

  private cartStorageKey = 'cartItems';
  cartItems: any[] = [];

  private loadCartItems(): void {
    const storedCartItems = localStorage.getItem(`${this.cartStorageKey}_${this.user?.id}`);
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }
}
