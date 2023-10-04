import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountDetailComponent, AccountListComponent} from './pages';

const routes: Routes = [
  {
    path: '',
    component: AccountListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
