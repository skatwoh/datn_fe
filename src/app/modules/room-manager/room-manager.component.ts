import {Component, OnInit} from '@angular/core';
import {RoomModel} from "../../models/room.model";
import {RoomTypeDtoModel} from "../../models/room-type-dto.model";
import {RoomService} from "../room/services/room.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {environment} from "../../../environments/environment";
import {RoomOrder} from "../../models/room-order";
import {RoomManagerService} from "./services/room-manager.service";
import {AppConstants} from "../../app-constants";

@Component({
  selector: 'cons-room-manager',
  templateUrl: './room-manager.component.html',
  styleUrls: ['./room-manager.component.scss']
})
export class RoomManagerComponent implements OnInit{
  readonly APP_DATE = AppConstants.APP_DATE;
  roomOrder: RoomOrder[] = [];
  message ='';
  isVisible = false;
  isOkLoading = false;

  // detail
  id: number | undefined;

  // showModal(id: any): void {
  //   this.isVisible = true;
  //   this.id = id;
  //   this.roomService.get(this.id).subscribe((data: RoomModel) => {
  //     this.currentRoom = data;
  //     console.log(this.currentRoom);
  //   });
  // }

  // handleOk(): void {
  //   this.isOkLoading = true;
  //   this.updateRoom();
  //   setTimeout(() => {
  //     this.isVisible = false;
  //     this.isOkLoading = false;
  //   }, 500);
  // }

  // handleCancel(): void {
  //   this.isVisible = false;
  // }
  constructor(private roomManagerService : RoomManagerService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient, private messageNoti: NzMessageService) { }

  private getRoomOrders(): void {
    this.roomManagerService.getListRoomManager(1, 50).subscribe(res => {
      if (res && res.content) {
        this.roomOrder= res.content;
      }
    })
  }

  searchInput :string = '';
  // getRoomsSearch(): void {
  //   const inputElement = document.getElementById('searchInput') as HTMLInputElement;
  //   this.searchInput = inputElement.value;
  //   this.roomService.getRoomListSearch(1, 50, this.searchInput).subscribe(res => {
  //     if (res && res.content) {
  //       this.room= res.content;
  //     }
  //   })
  // }

  // updateRoomStatus(id: any, status: number): void {
  //   this.roomService.get(id).subscribe((data: RoomModel) => {
  //     this.currentRoom = data;
  //     console.log(this.currentRoom);
  //   });
  //   this.roomService.updateStatus(id, status)
  //     .subscribe({
  //       next: (res) => {
  //         this.message = res.message
  //         this.currentRoom.trangThai = status
  //         this.getRooms();
  //       },
  //     });
  // }
  //
  // updateRoom(): void {
  //   this.roomService
  //     .update(this.currentRoom.id, this.currentRoom)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.message = res.message
  //           ? res.message
  //           : this.messageNoti.success('Update thành công', {
  //             nzDuration: 5000
  //           });
  //         this.getRooms();
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  ngOnInit() {
    this.getRoomOrders();
    // this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2)  => {
    //   this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    //   console.log(data2);
    //   console.log(this.roomType);
    // });
  }
}
