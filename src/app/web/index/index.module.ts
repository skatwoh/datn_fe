import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common'
import * as fromPages from './page';
import {HttpClientModule} from '@angular/common/http';
import {IndexComponent} from "./index.component";
import {IndexRoutingModule} from "./index-routing.module";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {FirstCharPipe} from "../../shared/pipes/first-char.pipe";

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
    ]
})
export class IndexModule {
}
