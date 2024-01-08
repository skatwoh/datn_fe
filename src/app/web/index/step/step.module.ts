import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Step1Component} from "./step1/step1.component";
import {Step2Component} from "./step2/step2.component";
import {Step3Component} from "./step3/step3.component";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {IndexModule} from "../index.module";
import {NzModalModule} from "ng-zorro-antd/modal";



@NgModule({
  declarations: [Step1Component, Step2Component, Step3Component],
  exports: [Step1Component, Step2Component, Step3Component],
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    IndexModule,
    NzModalModule
  ]
})
export class StepModule { }
