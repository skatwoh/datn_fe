import {NgModule} from "@angular/core";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import {VoucherRoutingModule} from "./voucher-routing.module";
import {VoucherComponent} from "./voucher.component";
import {VoucherCreateComponent} from "./voucher-create/voucher-create.component";
import {VoucherDetailsComponent} from "./voucher-details/voucher-details.component";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";

@NgModule({
    imports: [VoucherRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule,
        NzTableModule, FormsModule, NgClass, NzSelectModule, NzButtonModule, NzFormModule, NzInputModule, NzIconModule, NzModalModule, NzDatePickerModule, NzInputNumberModule, ReactiveFormsModule],
  declarations: [VoucherComponent, VoucherCreateComponent, VoucherDetailsComponent],
  exports: [VoucherComponent]
})
export class VoucherModule { }
