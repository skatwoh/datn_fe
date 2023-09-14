import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as fromPages from './pages';
import {FormFieldValidationDirective} from '../shared/directives/form-field-validation';
import {HttpClientModule} from '@angular/common/http';
import {NzIconModule} from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    AuthComponent,
    ...fromPages.pages
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    FormFieldValidationDirective,
    NzIconModule
  ]
})
export class AuthModule {
}
