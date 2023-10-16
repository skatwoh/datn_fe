import {NgModule} from '@angular/core';
import {AccountUserComponent} from "./account-user.component";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {AccountUserRoutingModule} from "./account-user-routing.module";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";

@NgModule({
  imports: [AccountUserRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule, NzTableModule, NzIconModule],
  declarations: [AccountUserComponent],
  exports: [AccountUserComponent]
})
export class AccountUserModule { }
