import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./index.component";
import {HomeComponent} from "./page";
import {AboutComponent} from "./page/about/about.component";
import {RoomComponent} from "./page/room/room.component";
import {ProfileComponent} from "./page/profile/profile.component";
import {BlogComponent} from "./page/blog/blog.component";
import {RoomDetailsComponent} from "./page/room-details/room-details.component";
import {ListRoomOrderComponent} from "./page/list-room-order/list-room-order.component";
import {RoomOrderChangeComponent} from "./page/room-order-change/room-order-change.component";
import {RoomOrderHistoryComponent} from "./page/room-order-history/room-order-history.component";
import {CommingSoonComponent} from "./page/comming-soon/comming-soon.component";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'room',
        component: RoomComponent
      },
      {
        path: 'profile/me',
        component: ProfileComponent
      },
      {
        path: 'profile/me/list-room-order',
        component: ListRoomOrderComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'room-detail/:id',
        component: RoomDetailsComponent
      },
      {
        path: 'room-order-change/:id1/:id',
        component: RoomOrderChangeComponent
      },
      {
        path: 'profile/me/room-order-history',
        component: RoomOrderHistoryComponent
      },
      {
        path: 'comming-soon',
        component: CommingSoonComponent
      },
      {
        path: 'me/cart',
        component: CartComponent
      }
    ]
  },
  {path: '', loadChildren: () => import('./auth-web/auth-web.module').then(m => m.AuthWebModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule {
}
