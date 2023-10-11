import {LoginWebComponent} from "./login-web/login-web.component";
import {RegisterWebComponent} from "./register-web/register-web.component";
import {ForgotPasswordWebComponent} from "./forgot-password-web/forgot-password-web.component";

export const pages: any[] = [
  LoginWebComponent,
  RegisterWebComponent,
  ForgotPasswordWebComponent
];

export * from './login-web/login-web.component';
export * from './register-web/register-web.component';
