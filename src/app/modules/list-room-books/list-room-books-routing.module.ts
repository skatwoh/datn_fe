import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ListRoomBooksComponent} from "./list-room-books.component";

const routes: Routes = [
  {
    path: '',
    component: ListRoomBooksComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoomBooksRoutingModule { }
