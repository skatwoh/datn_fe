import {AuthService} from './auth.service';
import {AuthHttpService} from './auth-http.service';
import {AuthGuard} from './auth.guard';

export const services: any[] = [
  AuthService,
  AuthHttpService,
  AuthGuard
];

export * from './auth.service';
export * from './auth-http.service';
export * from './auth.guard';
