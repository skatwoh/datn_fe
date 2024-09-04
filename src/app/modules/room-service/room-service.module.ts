import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {RoomServiceRoutingModule} from './room-service-routing.module';
import {RoomServiceCreateComponent} from './room-service-create/room-service-create.component';
import {RoomServiceDetailComponent} from './room-service-detail/room-service-detail.component';
import {RoomServiceComponent} from "./room-service.component";
import {NzTableModule} from "ng-zorro-antd/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzUploadModule} from "ng-zorro-antd/upload";

@NgModule({
  imports: [RoomServiceRoutingModule, NzBreadCrumbModule, NzTableModule, FormsModule, NzFormModule, NzPageHeaderModule, NgIf, NzInputModule, NzButtonModule, NgForOf, NzIconModule, NzSelectModule, ReactiveFormsModule, NzModalModule, NzUploadModule, NgStyle],
  declarations: [RoomServiceComponent, RoomServiceCreateComponent, RoomServiceDetailComponent],
  exports: [RoomServiceComponent]
})
export class RoomServiceModule { }

