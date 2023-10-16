import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AccountUserComponent} from "./account-user.component";
import {AccountUserDetailComponent} from "./account-user-detail/account-user-detail.component";

const routes: Routes = [
  {
    path: '',
    component: AccountUserComponent,
  },
  { path: 'account-user-detail/:id', component: AccountUserDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountUserRoutingModule { }
