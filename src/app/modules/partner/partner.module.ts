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
import {PartnerRoutingModule} from "./partner-routing.module";
import {PartnerComponent} from "./partner.component";
import {PartnerCreateComponent} from "./partner-create/partner-create.component";
import {FormFieldValidationDirective} from "../../shared/directives/form-field-validation";

@NgModule({
  imports: [PartnerRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule,
    NzTableModule, FormsModule, NgClass, NzSelectModule, NzButtonModule, NzFormModule, NzInputModule, NzMessageModule, NzIconModule, NzModalModule, FormFieldValidationDirective, ReactiveFormsModule],
    declarations: [PartnerComponent, PartnerCreateComponent],
    exports: [PartnerComponent]
})
export class PartnerModule {
}
