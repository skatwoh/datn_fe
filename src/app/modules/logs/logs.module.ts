import {NgModule} from '@angular/core';
import {LogsComponent} from "./logs.component";
import {LogsRoutingModule} from "./logs-routing.module";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";


@NgModule({
    imports: [LogsRoutingModule, NzSwitchModule, FormsModule, NzPageHeaderModule, NzTabsModule, NzBreadCrumbModule],
  declarations: [LogsComponent],
  exports: [LogsComponent]
})
export class LogsModule { }
