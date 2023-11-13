import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {RoomManagerComponent} from "./room-manager.component";
import {RoomManagerRoutingModule} from "./room-manager-routing.module";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzTableModule} from "ng-zorro-antd/table";


@NgModule({
    imports: [RoomManagerRoutingModule, NzBreadCrumbModule, NzFormModule, NzSelectModule, NzModalModule, NzPageHeaderModule, FormsModule, NgForOf, NzTableModule, NgIf, DatePipe],
  declarations: [RoomManagerComponent],
  exports: [RoomManagerComponent]
})
export class RoomManagerModule { }
