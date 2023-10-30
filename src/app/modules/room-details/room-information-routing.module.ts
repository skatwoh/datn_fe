import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { RoomInformationComponent } from './room-information.component';
import {RoomInformationCreateComponent} from "./room-information-create/room-information-create.component";
import {RoomInformationDetailsComponent} from "./room-information-details/room-information-details.component";



const routes: Routes = [
  {
    path: '',
    component: RoomInformationComponent,

  },
  { path: 'room-information-create', component: RoomInformationCreateComponent },
  { path: 'room-information-details/:id', component: RoomInformationDetailsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomInformationRoutingModule { }
