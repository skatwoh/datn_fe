import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListRoomBooksComponent} from "./list-room-books.component";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {ListRoomBooksRoutingModule} from "./list-room-books-routing.module";



@NgModule({
  declarations: [ListRoomBooksComponent],
  imports: [
    CommonModule,
    NzBreadCrumbModule,
    NzPageHeaderModule,
    ListRoomBooksRoutingModule
  ],
  exports: [ListRoomBooksComponent]
})
export class ListRoomBooksModule { }
