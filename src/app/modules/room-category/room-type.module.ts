import {NgModule} from "@angular/core";
import {RoomTypeRoutingModule} from "./room-type-routing.module";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RoomTypeComponent} from "./room-type.component";
import {RoomTypeCreateComponent} from "./room-type-create/room-type-create.component";
import { RoomTypeDetailsComponent } from './room-type-details/room-type-details.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";


@NgModule({
    imports: [RoomTypeRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule, NzTableModule, NzButtonModule, NzFormModule, NzInputModule, ReactiveFormsModule, FormsModule, NzIconModule, NzModalModule, NzSelectModule],
  declarations: [RoomTypeComponent, RoomTypeCreateComponent, RoomTypeDetailsComponent],
  exports: [RoomTypeComponent]
})
export class RoomTypeModule { }
