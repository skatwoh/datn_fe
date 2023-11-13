import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common'
import * as fromPages from './page';
import {HttpClientModule} from '@angular/common/http';
import {IndexComponent} from "./index.component";
import {IndexRoutingModule} from "./index-routing.module";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {FirstCharPipe} from "../../shared/pipes/first-char.pipe";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCarouselModule} from "ng-zorro-antd/carousel";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzRateModule} from "ng-zorro-antd/rate";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";

@NgModule({
  declarations: [
    IndexComponent,
    ...fromPages.pages,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    IndexRoutingModule,
    NzDropDownModule,
    NzAvatarModule,
    FirstCharPipe,
    NzImageModule,
    NgOptimizedImage,
    NzTypographyModule,
    NzButtonModule,
    NzCarouselModule,
    NzBadgeModule,
    NzIconModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzRateModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzInputNumberModule,
    FormsModule,
  ]
})
export class IndexModule {
}
