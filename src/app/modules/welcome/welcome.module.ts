import {NgModule} from '@angular/core';

import {WelcomeRoutingModule} from './welcome-routing.module';

import {WelcomeComponent} from './welcome.component';
import {NgStyle} from "@angular/common";
import {NzGridModule} from "ng-zorro-antd/grid";


@NgModule({
    imports: [WelcomeRoutingModule, NgStyle, NzGridModule],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
