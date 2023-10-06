import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomManagerComponent} from "./room-manager.component";

const routes: Routes = [
  { path: '', component: RoomManagerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomManagerRoutingModule { }
