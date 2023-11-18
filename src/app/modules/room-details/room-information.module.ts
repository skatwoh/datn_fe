import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import { RoomInformationRoutingModule } from './room-information-routing.module';
import { RoomInformationComponent } from './room-information.component';
import { RoomInformationCreateComponent } from './room-information-create/room-information-create.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RoomInformationDetailsComponent } from './room-information-details/room-information-details.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";

@NgModule({
    imports: [RoomInformationRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule, NzTableModule,
        NzButtonModule, NzFormModule, NzGridModule, NzInputModule, NzWaveModule, ReactiveFormsModule, FormsModule, NzSelectModule, NzIconModule, NzModalModule],
  declarations: [RoomInformationComponent, RoomInformationCreateComponent, RoomInformationDetailsComponent],
  exports: [RoomInformationComponent]
})
export class RoomInformationModule { }
