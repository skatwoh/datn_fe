import { Component } from '@angular/core';
import {RoomModel} from "../../../models/room.model";
import {RoomService} from "../services/room.service";

@Component({
  selector: 'cons-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent {
  room : RoomModel = {
    id: 0,
    ma: '',
    giaPhong: 0,
    trangThai: 0,
    idLoaiPhong: 0,
    tenLoaiPhong: ''
  };
  submitted = false;

  constructor(private roomService: RoomService) {}

  saveRoom(): void {
    const data = {
      ma: this.room.ma,
      giaPhong: this.room.giaPhong,
      trangThai: 1,
      idLoaiPhong: '1'
    };

    this.roomService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newRoom(): void {
    this.submitted = false;
    this.room = {
      id: 0,
      ma: '',
      giaPhong: 0,
      trangThai: 0,
      idLoaiPhong: 0,
      tenLoaiPhong: ''
    };
  }

  protected readonly RoomModel = RoomModel;
}
