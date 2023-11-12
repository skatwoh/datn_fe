import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {VoucherComponent} from "./voucher.component";
import {VoucherCreateComponent} from "./voucher-create/voucher-create.component";
import {VoucherDetailsComponent} from "./voucher-details/voucher-details.component";

const routes: Routes = [
  {
    path: '',
    component: VoucherComponent,
  },
  { path: 'voucher-create', component: VoucherCreateComponent },
  { path: 'voucher-details/:id', component: VoucherDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VoucherRoutingModule { }
