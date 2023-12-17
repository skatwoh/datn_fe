import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SaleComponent} from "./sale.component";
import {SlaeRoutingModule} from "./slae-routing.module";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {NzSelectModule} from "ng-zorro-antd/select";



@NgModule({
  declarations: [SaleComponent],
  imports: [
    CommonModule, SlaeRoutingModule, NzBreadCrumbModule, NzPageHeaderModule, NzTableModule, NzSwitchModule, FormsModule, NzButtonModule, NzFormModule, NzInputModule, NzDrawerModule, NzSelectModule
  ],
  exports: [SaleComponent]
})
export class SaleModule { }
