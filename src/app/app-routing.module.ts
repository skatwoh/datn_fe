import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './modules/layout/layout.component';
import {AuthGuard} from './auth/services';
import {NotFoundComponent} from "./error/not-found/not-found.component";
import {ForbiddenComponent} from "./error/forbidden/forbidden.component";

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
        path: 'account-user',
        loadChildren: () => import('./modules/account-user/account-user.module').then(m => m.AccountUserModule)
      },
      {
        path: 'customer',
        loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'room',
        loadChildren: () => import('./modules/room/room.module').then(m => m.RoomModule)
      },
      {
        path: 'room-type',
        loadChildren: () => import('./modules/room-category/room-type.module').then(m => m.RoomTypeModule)
      },
      {
        path: 'room-information',
        loadChildren: () => import('./modules/room-details/room-information.module').then(m => m.RoomInformationModule)
      },
      {
        path: 'project',
        loadChildren: () => import('./modules/project/project.module').then(m => m.ProjectModule)
      },
      {
        path: 'voucher',
        loadChildren: () => import('./modules/voucher/voucher.module').then(m => m.VoucherModule)
      },
      {
        path: 'room-service',
        loadChildren: () => import('./modules/room-service/room-service.module').then(m => m.RoomServiceModule)
      },
      {
        path: 'asset',
        loadChildren: () => import('./modules/asset/asset.module').then(m => m.AssetModule)
      },
      {
        path: 'maintenance',
        loadChildren: () => import('./modules/maintenance/maintenance.module').then(m => m.MaintenanceModule)
      },
      {
        path: 'partner',
        loadChildren: () => import('./modules/partner/partner.module').then(m => m.PartnerModule)
      },
      {
        path: 'bill',
        loadChildren: () => import('./modules/bill/bill.module').then(m => m.BillModule)
      },
      {
        path: 'sale',
        loadChildren: () => import('./modules/sale/sale.module').then(m => m.SaleModule)
      },
      {
        path: 'room-order-manager',
        loadChildren: () => import('./modules/room-order-manager/room-order-manager.module').then(m => m.RoomOrderManagerModule)
      },
      {
        path: 'list-room-books',
        loadChildren: () => import('./modules/list-room-books/list-room-books.module').then(m => m.ListRoomBooksModule)
      }
    ]
  },
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'forbidden', component: ForbiddenComponent },
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
