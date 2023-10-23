import {Component, OnInit} from '@angular/core';
import {RoomModel} from "../../../models/room.model";
import {RoomService} from "../services/room.service";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RoomTypeDtoModel} from "../../../models/room-type-dto.model";
import {NzMessageModule, NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'cons-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit {
  room : RoomModel = {
    id: 0,
    ma: '',
    giaPhong: 0,
    trangThai: 0,
    idLoaiPhong: 0,
    tenLoaiPhong: ''
  };
  roomType : RoomTypeDtoModel[] = [];
  submitted = false;

  constructor(private roomService: RoomService, private http : HttpClient, private message: NzMessageService) {}

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((dataRoom)  => {
      this.roomType = dataRoom; // Gán dữ liệu lấy được vào biến roomType
    });
  }

  successMessage(): void {
    this.message.success('Thêm thành công');
  }

  saveRoom(): void {
    const data = {
      ma: this.room.ma,
      giaPhong: this.room.giaPhong,
      trangThai: 1,
      idLoaiPhong: this.room.idLoaiPhong
    };

    this.roomService.create(data).subscribe({
      next: (res) => {
        this.successMessage();
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
