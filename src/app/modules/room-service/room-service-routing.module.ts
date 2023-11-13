import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RoomServiceComponent} from "./room-service.component";
import {RoomServiceCreateComponent} from "./room-service-create/room-service-create.component";
import {RoomServiceDetailComponent} from "./room-service-detail/room-service-detail.component";


const routes: Routes = [
  {
    path: '',
    component: RoomServiceComponent,
  },
  { path: 'room-service-create', component: RoomServiceCreateComponent },
  { path: 'room-service-details/:id', component: RoomServiceDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomServiceRoutingModule { }
