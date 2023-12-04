import {Component, OnInit} from '@angular/core';
import {RoomOrder} from "../../../../models/room-order";
import {RoomModel} from "../../../../models/room.model";
import {UserModel} from "../../../../auth/models/user.model";
import {ListRoomOrderService} from "../list-room-order/list-room-order.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthService} from "../../../../auth/services";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";

@Component({
  selector: 'cons-room-order-history',
  templateUrl: './room-order-history.component.html',
  styleUrls: ['./room-order-history.component.scss']
})
export class RoomOrderHistoryComponent implements OnInit{
  room: RoomOrder[] = [];
  room1: RoomModel[] = [];

  currentRoom!: RoomOrder;
  currentRoom2!: RoomOrder;
  user: UserModel | undefined;
  isVisible = false;
  isOkLoading = false;
  isVisible1 = false;
  isOkLoading1 = false;
  id : number | undefined;
  id2 : number | undefined;
  message2 : string = '';
  hasError = false;
  constructor(private roomOrderService: ListRoomOrderService,
              private message: NzMessageService,
              private authService: AuthService,
              private notification: NzNotificationService,
              private router: Router) {
    this.user = authService.currentUserValue;
  }
  getLichSuDatPhong(): void {
    const id = this.user?.id;
    this.roomOrderService.getLichSuDatPhong(1, 50, id).subscribe(res => {
      if (res && res.content) {
        this.room = res.content;
      }
    })
  }
  ngOnInit(): void {
      this.getLichSuDatPhong();
    }
}
