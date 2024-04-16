import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RoomOrderManagerComponent} from "./room-order-manager.component";

const routes: Routes = [
  {
    path: '',
    component: RoomOrderManagerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomOrderManagerRoutingModule {


}
