import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';

import {WelcomeComponent} from './welcome.component';
import {NgStyle} from "@angular/common";
import {NzGridModule} from "ng-zorro-antd/grid";
import {ChartComponent} from "../../shared/components/chart/chart.component";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {CaseModule} from "../../web/index/case/case.module";


@NgModule({
    imports: [WelcomeRoutingModule, NgStyle, NzGridModule, ChartComponent, NzBreadCrumbModule, NzPageHeaderModule, CaseModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
