import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CaseComponent} from "./case.component";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
  declarations: [CaseComponent],
  imports: [
    CommonModule,
    NzToolTipModule,
    RouterLink,
    FormsModule,
    NzDropDownModule,
    NzIconModule,
    NzBadgeModule,
    NzModalModule,
  ],
  exports: [CaseComponent]
})
export class CaseModule { }
