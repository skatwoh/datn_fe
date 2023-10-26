import {Component, OnInit} from '@angular/core';
import {AccountUserService} from "./services/account-user.service";
import {Router} from "@angular/router";
import {AccountUserModel} from "../../models/account-user.model";
import {NzModalComponent} from "ng-zorro-antd/modal";

@Component({
  selector: 'cons-account-user',
  templateUrl: './account-user.component.html',
  styleUrls: ['./account-user.component.scss']
})
export class AccountUserComponent implements OnInit{
  accountUser: AccountUserModel[] = [];
  constructor(private accountUserService: AccountUserService, private router: Router) { }

  private getAccountUsers(): void {
    this.accountUserService.getAccountUserList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.accountUser= res.content;
      }
    })
  }

  ngOnInit() {
    this.getAccountUsers();
  }

}
