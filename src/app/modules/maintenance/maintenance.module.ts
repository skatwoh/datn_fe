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
import {NzMessageModule} from "ng-zorro-antd/message";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import {MaintenanceComponent} from "./maintenance.component";
import {MaintenanceRoutingModule} from "./maintenance-routing.module";
import { MaintenanceCreateComponent } from './maintenance-create/maintenance-create.component';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";

@NgModule({
    imports: [MaintenanceRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule,
        NzTableModule, FormsModule, NgClass, NzSelectModule, NzButtonModule, NzFormModule, NzInputModule, NzMessageModule, NzIconModule, NzModalModule, ReactiveFormsModule],
  declarations: [MaintenanceComponent, MaintenanceCreateComponent],
  exports: [MaintenanceComponent]
})
export class MaintenanceModule { }
