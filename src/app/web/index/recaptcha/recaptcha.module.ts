import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';
import {RecaptchaComponent} from "./recaptcha.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  exports: [RecaptchaComponent],
  declarations: [RecaptchaComponent],
  imports: [
    CommonModule,
    NgxCaptchaModule,
    ReactiveFormsModule
  ]
})
export class RecaptchaModule { }
