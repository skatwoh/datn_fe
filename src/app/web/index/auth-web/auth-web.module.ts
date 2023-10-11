import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as fromPages from './page';
import {HttpClientModule} from '@angular/common/http';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {AuthWebComponent} from "./auth-web.component";
import {AuthWebRoutingModule} from "./auth-web-routing.module";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {FormFieldValidationDirective} from "../../../shared/directives/form-field-validation";

@NgModule({
  declarations: [
    AuthWebComponent,
    ...fromPages.pages
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthWebRoutingModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    FormFieldValidationDirective
  ]
})
export class AuthWebModule {
}
