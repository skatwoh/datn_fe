import { Component, Input, OnInit } from '@angular/core';
import { RoomModel } from "../../models/room.model";
import { RoomService } from "../room/services/room.service";
import { Router } from "@angular/router";
import { RoomOrder } from "../../models/room-order";
import { RoomManagerService } from "../room-manager/services/room-manager.service";
import {count, forkJoin} from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @Input() roomOrder: RoomOrder[] = [];
  room: RoomModel[] = [];

  constructor(private roomService: RoomService, private router: Router, private roomOrderService: RoomManagerService) { }

  getRooms() {
    return this.roomService.getRoomList(1, 50);
  }

  getRoomOrders() {
    return this.roomOrderService.getListRoomManager(1, 50);
  }

  ngOnInit() {
    forkJoin([
      this.getRooms(),
      this.getRoomOrders()
    ]).subscribe(([roomsResponse, roomOrdersResponse]) => {
      if (roomsResponse && roomsResponse.content) {
        this.room = roomsResponse.content;
      }

      if (roomOrdersResponse && roomOrdersResponse.content) {
        this.roomOrder = roomOrdersResponse.content;
      }
    });
  }

  protected readonly count = count;
}
