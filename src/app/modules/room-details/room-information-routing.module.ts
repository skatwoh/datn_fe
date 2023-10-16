import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { RoomInformationComponent } from './room-information.component';
import {RoomInformationCreateComponent} from "./room-information-create/room-information-create.component";



const routes: Routes = [
  {
    path: '',
    component: RoomInformationComponent,

  },
  { path: 'room-information-create', component: RoomInformationCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomInformationRoutingModule { }
