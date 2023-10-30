import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { RoomTypeComponent } from './room-type.component';
import {RoomTypeCreateComponent} from "./room-type-create/room-type-create.component";

const routes: Routes = [
  {
    path: '',
    component: RoomTypeComponent,
  },
  { path: 'room-type-create', component: RoomTypeCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomTypeRoutingModule { }
