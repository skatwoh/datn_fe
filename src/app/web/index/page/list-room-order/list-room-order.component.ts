import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListRoomOrderService} from "./list-room-order.service";
import {RoomOrder} from "../../../../models/room-order";
import {Observable} from "rxjs";
import {UserModel} from "../../../../auth/models/user.model";
import {AuthService} from "../../../../auth/services";
import {formatNumber} from "@angular/common";
import {RoomModel} from "../../../../models/room.model";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'cons-list-room-order',
  templateUrl: './list-room-order.component.html',
  styleUrls: ['./list-room-order.component.scss']
})
export class ListRoomOrderComponent implements OnInit, OnDestroy {
  room: RoomOrder[] = [];
  currentRoom!: RoomOrder;
  user: UserModel | undefined;
  isVisible = false;
  isOkLoading = false;
  id : number | undefined;
  constructor(private roomOrderService: ListRoomOrderService,
              private message: NzMessageService,
              private authService: AuthService,) {
    this.user = authService.currentUserValue;
  }

  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.roomOrderService.get(this.id).subscribe((data: RoomOrder) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.deleteRoom();
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  successMessage(): void {
    this.message.success('Hủy phòng thành công');
  }

  deleteRoom(): void {
    this.roomOrderService.updateStatus(this.currentRoom.id, 0)
      .subscribe({
        next: (res) => {
          this.currentRoom.trangThai = 0
          this.successMessage();
          this.getRooms();
        },
      });
  }

  ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

  private getRooms(): void {
    const id = this.user?.id;
      this.roomOrderService.getListRoomOrder(1, 50, id, 1).subscribe(res => {
        if (res && res.content) {
          this.room = res.content;
        }
      })
  }

  ngOnInit(): void {
    this.getRooms();
  }

    protected readonly formatNumber = formatNumber;
}
