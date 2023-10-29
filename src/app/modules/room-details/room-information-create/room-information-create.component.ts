import { Component } from '@angular/core';
import {RoomInformationModel} from "../../../models/room-information.model";
import {RoomInformationService} from "../services/room-information.service";

@Component({
  selector: 'cons-room-information-create',
  templateUrl: './room-information-create.component.html',
  styleUrls: ['./room-information-create.component.scss']
})
export class RoomInformationCreateComponent {
  roomInformation : RoomInformationModel = {
    id: 0,
    tang: '',
    tienIch: '',
    dichVu: '',
    soLuongNguoi: 0,
    dienTich: 0,
    trangThai: 0,
    idLoaiPhong: '',
    tenLoaiPhong: ''
  };
  submitted = false;

  constructor(private roomInformationService: RoomInformationService) {}

  saveRoomInformation(): void {
    const data = {
      tang: this.roomInformation.tang,
      tienIch: this.roomInformation.tienIch,
      dichVu: this.roomInformation.dichVu,
      soLuongNguoi: this.roomInformation.soLuongNguoi,
      dienTich: this.roomInformation.dienTich,
      trangThai: 1,
      idLoaiPhong: '1'
    };

    this.roomInformationService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newRoomInformation(): void {
    this.submitted = false;
    this.roomInformation = {
      id: 0,
      tang: '',
      tienIch: '',
      dichVu: '',
      soLuongNguoi: 0,
      dienTich: 0,
      trangThai: 0,
      idLoaiPhong: '',
      tenLoaiPhong: ''
    };
  }

  protected readonly RoomInformationModel = RoomInformationModel;
}
