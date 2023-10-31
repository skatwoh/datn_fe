import {Component, OnInit} from '@angular/core';
import {RoomInformationModel} from "../../../models/room-information.model";
import {RoomInformationService} from "../services/room-information.service";
import {RoomModel} from "../../../models/room.model";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'cons-room-information-create',
  templateUrl: './room-information-create.component.html',
  styleUrls: ['./room-information-create.component.scss']
})
export class RoomInformationCreateComponent implements OnInit {
  roomInformation : RoomInformationModel = {
    id: 0,
    tang: '',
    tienIch: '',
    dichVu: '',
    soLuongNguoi: 0,
    dienTich: 0,
    trangThai: 0,
    idPhong: 0,
    maPhong: ''
  };
  room: RoomModel[] = [];
  submitted = false;

  constructor(private roomInformationService: RoomInformationService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/chi-tiet-phong/single-list-room`).subscribe((dataRoom)  => {
      this.room = dataRoom; // Gán dữ liệu lấy được vào biến roomType
    });
  }

  saveRoomInformation(): void {
    const data = {
      tang: this.roomInformation.tang,
      tienIch: this.roomInformation.tienIch,
      dichVu: this.roomInformation.dichVu,
      soLuongNguoi: this.roomInformation.soLuongNguoi,
      dienTich: this.roomInformation.dienTich,
      trangThai: 1,
      idPhong: this.roomInformation.idPhong
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
      idPhong: 0,
      maPhong: ''
    };
  }

  protected readonly RoomInformationModel = RoomInformationModel;
}
