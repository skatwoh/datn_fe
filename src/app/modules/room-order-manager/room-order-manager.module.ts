import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import {FormFieldValidationDirective} from "../../shared/directives/form-field-validation";
import {RoomOrderManagerComponent} from "./room-order-manager.component";
import {RoomOrderManagerRoutingModule} from "./room-order-manager-routing.module";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzCardModule} from "ng-zorro-antd/card";
import {IndexModule} from "../../web/index/index.module";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";

@NgModule({
    imports: [RoomOrderManagerRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule,
        NzTableModule, FormsModule, NgClass, NzSelectModule, NzButtonModule, NzFormModule, NzInputModule, NzMessageModule, NzIconModule, NzModalModule, ReactiveFormsModule, FormFieldValidationDirective, NzToolTipModule, NzCardModule, IndexModule, NzSpinModule, NzAlertModule, NzCheckboxModule, CurrencyPipe, NzPopconfirmModule, NzTabsModule, NzDatePickerModule],
  declarations: [RoomOrderManagerComponent],
  exports: [RoomOrderManagerComponent]
})
export class RoomOrderManagerModule {

}
