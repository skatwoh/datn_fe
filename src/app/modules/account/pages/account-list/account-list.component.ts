import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {AccountModel} from '../../models/account.model';
import {AppConstants} from '../../../../app-constants';
import {Router} from "@angular/router";

@Component({
  selector: 'cons-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  readonly APP_DATE_TIME = AppConstants.APP_DATE_TIME;
  accounts: AccountModel[] = [];

  isLoading = false;
  constructor(private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  private getAccounts(): void {
    this.accountService.getUserList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.accounts = res.content;
      }
    })
  }

  manualUpdateUserStatus(email: any, index: number, status: boolean): void {
    this.isLoading = true;
    this.accountService.manualActiveUser(email).subscribe(res => {
      if (res?.code === AppConstants.API_SUCCESS_CODE) {
        this.accounts[index].emailVerified = !status;
      }
      this.isLoading = false;
    })
  }

  getDetailAccount(email: any) {
    this.router.navigate([`/detail/${email}`]);
  }
}
