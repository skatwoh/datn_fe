import { Component } from '@angular/core';
import {RoomService} from "../../room/services/room.service";
import {RoomTypeModel} from "../../../models/room-type.model";
import {RoomTypeService} from "../services/room-type.service";

@Component({
  selector: 'cons-room-type-create',
  templateUrl: './room-type-create.component.html',
  styleUrls: ['./room-type-create.component.scss']
})
export class RoomTypeCreateComponent {
  roomType : RoomTypeModel = {
    id: 0,
    maLoaiPhong: '',
    tenLoaiPhong: '',
    ghiChu: ''
  };
  submitted = false;

  constructor(private roomTypeService: RoomTypeService) {}

  saveRoom(): void {
    const data = {
      maLoaiPhong : this.roomType.maLoaiPhong,
      tenLoaiPhong: this.roomType.tenLoaiPhong,
      ghiChu: this.roomType.ghiChu,
    };

    this.roomTypeService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newRoomType(): void {
    this.submitted = false;
    this.roomType = {
      id: 0,
      maLoaiPhong: '',
      tenLoaiPhong: '',
      ghiChu: ''
    };
  }

  protected readonly RoomTypeModel = RoomTypeModel;
}
