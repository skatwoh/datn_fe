import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListRoomOrderService} from "./list-room-order.service";
import {RoomOrder} from "../../../../models/room-order";
import {Observable} from "rxjs";
import {UserModel} from "../../../../auth/models/user.model";
import {AuthService} from "../../../../auth/services";
import {formatNumber} from "@angular/common";
import {RoomModel} from "../../../../models/room.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {AppConstants} from "../../../../app-constants";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";

@Component({
  selector: 'cons-list-room-order',
  templateUrl: './list-room-order.component.html',
  styleUrls: ['./list-room-order.component.scss']
})
export class ListRoomOrderComponent implements OnInit, OnDestroy {
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

  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.roomOrderService.get(this.id).subscribe((data: RoomOrder) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
    });
  }
  showRoomUpperPrice(giaPhong: number | undefined, id: any): void {
    this.isVisible1 = true;
    this.id = id;
    this.roomOrderService.get(this.id).subscribe((data: RoomOrder) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
    });
    this.roomOrderService.getListRoomByUpperPrice(1, 50, giaPhong ).subscribe(res => {
      if (res && res.content) {
        this.room1 = res.content;
      }
    })
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
          console.log(res);
          if(res.body.code == "Failed") {
            this.message.error(res.body.message);
          } else {
            this.currentRoom.trangThai = 0
            this.successMessage();
            this.getRooms();
          }
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

  // getRoom2(id: any) {
  //   this.router.navigate([`/room-order-change/${id}`]);
  // }

  handleCancel1(): void {
    this.isVisible1 = false;
  }

  ngOnInit(): void {
    this.getRooms();
  }

    protected readonly formatNumber = formatNumber;
  protected readonly Number = Number;
}
