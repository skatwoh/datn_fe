import {NgModule} from '@angular/core';
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
import {NzMessageModule } from "ng-zorro-antd/message";
import {ProjectRoutingModule} from "./project-routing.module";
import {ProjectCreateComponent} from "./project-create/project-create.component";
import {ProjectComponent} from "./project.component";
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormFieldValidationDirective} from "../../shared/directives/form-field-validation";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";


@NgModule({
  imports: [ProjectRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule,
    NzTableModule, FormsModule, NgClass, NzSelectModule, NzButtonModule, NzFormModule, NzInputModule, NzMessageModule, NzIconModule, FormFieldValidationDirective, ReactiveFormsModule,NzDatePickerModule],
  declarations: [ProjectComponent, ProjectCreateComponent, ProjectDetailComponent],
  exports: [ProjectComponent]
})
export class ProjectModule { }

