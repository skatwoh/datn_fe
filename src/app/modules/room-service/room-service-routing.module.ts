import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RoomServiceComponent} from "./room-service.component";
import {RoomServiceCreateComponent} from "./room-service-create/room-service-create.component";



const routes: Routes = [
  {
    path: '',
    component: RoomServiceComponent,
  },{
    path: 'room-service-create',
    component: RoomServiceCreateComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomServiceRoutingModule { }
