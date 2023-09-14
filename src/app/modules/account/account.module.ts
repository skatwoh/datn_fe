import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';

import * as fromPages from './pages';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {FormsModule} from '@angular/forms';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import { AccountDetailComponent } from './pages/account-detail/account-detail.component';
import {NzInputModule} from "ng-zorro-antd/input";

@NgModule({
  declarations: [
    ...fromPages.pages,
    AccountDetailComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    NzPageHeaderModule,
    NzTableModule,
    NzSwitchModule,
    FormsModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzInputModule
  ]
})
export class AccountModule {
}
