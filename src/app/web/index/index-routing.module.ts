import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from "./index.component";
import {HomeComponent} from "./page";
import {AboutComponent} from "./page/about/about.component";
import {RoomComponent} from "./page/room/room.component";
import {ProfileComponent} from "./page/profile/profile.component";
import {BlogComponent} from "./page/blog/blog.component";
import {RoomDetailsComponent} from "./page/room-details/room-details.component";

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
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'blog',
        component: BlogComponent
      },
      {
        path: 'room-details',
        component: RoomDetailsComponent
      }
    ]
  },
  {path: '', loadChildren: () => import('./auth-web/auth-web.module').then(m => m.AuthWebModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
