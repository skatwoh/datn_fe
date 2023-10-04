import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { RoomCategoryComponent } from './room-category.component';


const routes: Routes = [
  {
    path: '',
    component: RoomCategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomCategoryRoutingModule { }
