import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RoomServiceComponent} from "./room-service.component";



const routes: Routes = [
  {
    path: '',
    component: RoomServiceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomServiceRoutingModule { }
