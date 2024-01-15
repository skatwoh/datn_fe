import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {RoomManagerComponent} from "./room-manager.component";
import {RoomManagerRoutingModule} from "./room-manager-routing.module";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CurrencyPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {NzTableModule} from "ng-zorro-antd/table";
import {RoomManagerCreateComponent} from './room-manager-create/room-manager-create.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzInputModule} from "ng-zorro-antd/input";
import {RoomManagerDetailsComponent} from './room-manager-details/room-manager-details.component';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzRateModule} from "ng-zorro-antd/rate";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {RoomListOrderComponent} from './room-list-order/room-list-order.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {IndexModule} from "../../web/index/index.module";


@NgModule({
  imports: [RoomManagerRoutingModule, NzBreadCrumbModule, NzFormModule, NzSelectModule, NzModalModule, NzPageHeaderModule,
    FormsModule, NgForOf, NzTableModule, NgIf, NzIconModule, NzInputModule, DecimalPipe, CurrencyPipe, NzDatePickerModule,
    NzInputNumberModule, NzRateModule, ReactiveFormsModule, DatePipe, NzToolTipModule, IndexModule, NzButtonModule, NzWaveModule, NzCardModule],
  declarations: [RoomManagerComponent, RoomManagerCreateComponent, RoomManagerDetailsComponent, RoomListOrderComponent],
  exports: [RoomManagerComponent]
})
export class RoomManagerModule {
}
