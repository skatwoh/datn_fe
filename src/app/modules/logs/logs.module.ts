import {NgModule} from '@angular/core';
import {LogsComponent} from "./logs.component";
import {LogsRoutingModule} from "./logs-routing.module";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzModalModule} from "ng-zorro-antd/modal";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";


@NgModule({
    imports: [LogsRoutingModule, NzSwitchModule, FormsModule, NzPageHeaderModule, NzTabsModule, NzBreadCrumbModule, NzTableModule, NzButtonModule, DatePipe, NgIf, NgForOf, NzModalModule, CdkDropList, NzFormModule, CdkDrag, NzIconModule, NzDropDownModule],
  declarations: [LogsComponent],
  exports: [LogsComponent]
})
export class LogsModule { }
