import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';

import {WelcomeComponent} from './welcome.component';
import {ChartModule} from "primeng/chart";
import {NgStyle} from "@angular/common";
import {NzGridModule} from "ng-zorro-antd/grid";


@NgModule({
    imports: [WelcomeRoutingModule, ChartModule, NgStyle, NzGridModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
