import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {RoomComponent} from "./room/room.component";
import {ProfileComponent} from "./profile/profile.component";
import {BlogComponent} from "./blog/blog.component";
import {RoomDetailsComponent} from "./room-details/room-details.component";
import {ListRoomOrderComponent} from "./list-room-order/list-room-order.component";
import {RoomOrderChangeComponent} from "./room-order-change/room-order-change.component";
import {RoomOrderHistoryComponent} from "./room-order-history/room-order-history.component";


export const pages: any[] = [
  HomeComponent,
  AboutComponent,
  RoomComponent,
  ProfileComponent,
  BlogComponent,
  RoomDetailsComponent,
  ListRoomOrderComponent,
  RoomOrderChangeComponent,
  RoomOrderHistoryComponent
];

export * from './home/home.component';
