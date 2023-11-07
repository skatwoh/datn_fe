import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PartnerComponent} from "./partner.component";
import {PartnerCreateComponent} from "./partner-create/partner-create.component";

const routes: Routes = [
  {
    path: '',
    component: PartnerComponent,
  },
  { path: 'partner-create', component: PartnerCreateComponent },
  // { path: 'partner-details/:id', component: RoomDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerRoutingModule { }
