import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MaintenanceComponent} from "./maintenance.component";
import {MaintenanceCreateComponent} from "./maintenance-create/maintenance-create.component";

const routes: Routes = [
  {
    path: '',
    component: MaintenanceComponent,
  },
   { path: 'maintenance-create', component: MaintenanceCreateComponent },
  // { path: 'maintenance-details/:id', component: RoomDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
