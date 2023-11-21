import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {BillComponent} from "./bill.component";

const routes: Routes = [
  {
    path: '',
    component: BillComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
