import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CaseComponent} from "./case.component";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [CaseComponent],
  imports: [
    CommonModule,
    NzToolTipModule,
    RouterLink,
  ],
  exports: [CaseComponent]
})
export class CaseModule { }
