import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountDetailComponent, AccountListComponent} from './pages';
import {UserModel} from "../../auth/models/user.model";

const routes: Routes = [
  {
    path: '',
    component: AccountListComponent,
    children: [
      {
        path: `detail`,
        component: AccountDetailComponent,
        resolve: {
          user: UserModel,
        },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
