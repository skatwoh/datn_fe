import { Component } from '@angular/core';
import {AccountModel} from "../../models/account.model";

@Component({
  selector: 'cons-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent {
  accounts: AccountModel | null = null;
}
