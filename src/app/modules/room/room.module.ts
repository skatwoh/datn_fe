import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { RoomCreateComponent } from './room-create/room-create.component';
import {FormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import { RoomDetailsComponent } from './room-details/room-details.component';
import {NzMessageModule, NzMessageServiceModule} from "ng-zorro-antd/message";

@NgModule({
  imports: [RoomRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule,
    NzTableModule, FormsModule, NgClass, NzSelectModule, NzButtonModule, NzFormModule, NzInputModule, NzMessageServiceModule, NzMessageModule ],
  declarations: [RoomComponent, RoomCreateComponent, RoomDetailsComponent],
  exports: [RoomComponent]
})
export class RoomModule { }
