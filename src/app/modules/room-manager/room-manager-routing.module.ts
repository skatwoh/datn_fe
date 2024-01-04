import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomManagerComponent} from "./room-manager.component";
import {RoomManagerCreateComponent} from "./room-manager-create/room-manager-create.component";
import {RoomManagerDetailsComponent} from "./room-manager-details/room-manager-details.component";
import {RoomListOrderComponent} from "./room-list-order/room-list-order.component";

const routes: Routes = [
  { path: '', component: RoomManagerComponent },
  { path: 'room-manager-create', component: RoomManagerCreateComponent },
  { path: 'room-manager-details/:id', component: RoomManagerDetailsComponent },
  { path: 'room-list-order', component: RoomListOrderComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomManagerRoutingModule { }
