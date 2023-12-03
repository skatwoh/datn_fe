import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';

import {WelcomeComponent} from './welcome.component';
import {NgStyle} from "@angular/common";
import {NzGridModule} from "ng-zorro-antd/grid";
import {ChartComponent} from "../../shared/components/chart/chart.component";


@NgModule({
    imports: [WelcomeRoutingModule, NgStyle, NzGridModule, ChartComponent],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
