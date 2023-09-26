import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './modules/layout/layout.component';
import {AuthGuard} from './auth/services';
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path: '', loadChildren: () => import('./web/index/index.module').then(m => m.IndexModule)},
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'accounts',
        loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'logs',
        loadChildren: () => import('./modules/logs/logs.module').then(m => m.LogsModule)
      },
      {
        path: 'room-manager',
        loadChildren: () => import('./modules/room-manager/room-manager.module').then(m => m.RoomManagerModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule)
      }
    ]
  },
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {
    path: '**', // Đây là route wildcard để xử lý tất cả các đường dẫn không khớp
    component: NotFoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
