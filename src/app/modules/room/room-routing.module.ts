import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { RoomComponent } from './room.component';
import {RoomCreateComponent} from "./room-create/room-create.component";
import {RoomDetailsComponent} from "./room-details/room-details.component";


const routes: Routes = [
  {
    path: '',
    component: RoomComponent,
  },
  { path: 'room-create', component: RoomCreateComponent },
  { path: 'room-details/:id', component: RoomDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
