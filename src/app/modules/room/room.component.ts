import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RoomModel} from '../../models/room.model';
import {RoomService} from './services/room.service';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {RoomTypeDtoModel} from "../../models/room-type-dto.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {RoomTypeModel} from "../../models/room-type.model";
import {RoomOrderMappingModel} from "../../models/room-order-mapping.model";

@Component({
  selector: 'cons-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room: RoomModel[] = [];
  currentRoom!: RoomModel;
  message = '';
  isVisible = false;
  isOkLoading = false;

  // detail
  id: number | undefined;
  // roomModel!: RoomModel;
  roomType: RoomTypeModel[] = [];

  listOfColumn = [
    {
      title: 'Mã',
      compare: (a: RoomModel, b: RoomModel) => String(a.ma).localeCompare(String(b.ma)),
      priority: 1
    },
    {
      title: 'Loại phòng',
      compare: (a: RoomModel, b: RoomModel) => String(a.tenLoaiPhong).localeCompare(String(b.tenLoaiPhong)),
      priority: 2
    },
    {
      title: 'Trạng thái',
      compare: (a: RoomModel, b: RoomModel) => a.trangThai??0 - (b.trangThai??0),
      priority: 3
    }
  ]

  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.roomService.get(this.id).subscribe((data: RoomModel) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.updateRoom();
    setTimeout(() => {
      this.messageNoti.success('Cập nhật thành công', {
        nzDuration: 5000
      });
      this.isVisible = false;
      this.isOkLoading = false;
      this.getRooms();
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(private roomService: RoomService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private messageNoti: NzMessageService) {
  }

  getRooms(): void {
    this.roomService.getRoomList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.room = res.content;
      }
    })
  }

  searchInput: string = '';

  getRoomsSearch(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.roomService.getRoomListSearch(1, 50, this.searchInput).subscribe(res => {
      if (res && res.content) {
        this.room = res.content;
      }
    })
  }

  updateRoomStatus(id: any, status: number): void {
    this.roomService.get(id).subscribe((data: RoomModel) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
    });
    this.roomService.updateStatus(id, status)
      .subscribe({
        next: (res) => {
          this.message = res.message
          this.currentRoom.trangThai = status
          this.getRoomsSearch();
        },
      });
  }

  updateRoom(): void {
    this.roomService
      .update(this.currentRoom.id, this.currentRoom)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : this.messageNoti.success('Update thành công', {
              nzDuration: 5000
            });
          this.getRooms();
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit() {
    this.getRooms();
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2) => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
      console.log(data2);
      console.log(this.roomType);
    });
  }
}
