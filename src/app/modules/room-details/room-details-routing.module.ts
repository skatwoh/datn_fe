import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { RoomDetailsComponent } from './room-details.component';



const routes: Routes = [
  {
    path: '',
    component: RoomDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomDetailsRoutingModule { }
