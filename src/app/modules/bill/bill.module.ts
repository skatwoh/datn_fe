import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BillComponent} from "./bill.component";
import {BillRoutingModule} from "./bill-routing.module";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTableModule} from "ng-zorro-antd/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";



@NgModule({
  declarations: [BillComponent],
  imports: [
    BillRoutingModule,
    CommonModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzPageHeaderModule,
    NzSelectModule,
    NzTableModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzDropDownModule,
    NzWaveModule,
    FormsModule,
    NzToolTipModule,
    NzCheckboxModule
  ],
  exports: [
    BillComponent
  ]
})
export class BillModule { }
