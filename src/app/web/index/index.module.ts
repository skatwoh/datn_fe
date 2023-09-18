import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common'
import * as fromPages from './page';
import {HttpClientModule} from '@angular/common/http';
import {IndexComponent} from "./index.component";
import {IndexRoutingModule} from "./index-routing.module";

@NgModule({
  declarations: [
    IndexComponent,
    ...fromPages.pages
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    IndexRoutingModule,
  ]
})
export class IndexModule {
}
