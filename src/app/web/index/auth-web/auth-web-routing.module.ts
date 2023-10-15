import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthWebComponent} from "./auth-web.component";
import {LoginWebComponent, RegisterWebComponent} from "./page";
import {ForgotPasswordWebComponent} from "./page/forgot-password-web/forgot-password-web.component";

const routes: Routes = [
  {
    path: 'hotel',
    component: AuthWebComponent,
    children: [
      {
        path: 'login',
        component: LoginWebComponent
      },
      {
        path: 'register',
        component: RegisterWebComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordWebComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthWebRoutingModule { }
