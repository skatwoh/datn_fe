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
import {ReactiveFormsModule} from "@angular/forms";



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
    ReactiveFormsModule
  ],
  exports: [
    BillComponent
  ]
})
export class BillModule { }
