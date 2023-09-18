import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {RoomManagerComponent} from "./room-manager.component";
import {RoomManagerRoutingModule} from "./room-manager-routing.module";


@NgModule({
  imports: [RoomManagerRoutingModule,NzBreadCrumbModule],
  declarations: [RoomManagerComponent],
  exports: [RoomManagerComponent]
})
export class RoomManagerModule { }
