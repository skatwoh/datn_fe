import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SaleComponent} from "./sale.component";
import {SlaeRoutingModule} from "./slae-routing.module";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTableModule} from "ng-zorro-antd/table";



@NgModule({
  declarations: [SaleComponent],
  imports: [
    CommonModule, SlaeRoutingModule, NzBreadCrumbModule, NzPageHeaderModule, NzTableModule
  ],
  exports: [SaleComponent]
})
export class SaleModule { }
