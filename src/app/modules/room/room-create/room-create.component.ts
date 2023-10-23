import {Component, OnInit} from '@angular/core';
import {RoomModel} from "../../../models/room.model";
import {RoomService} from "../services/room.service";
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
  submitted = false;

  constructor(private roomService: RoomService, private message: NzMessageService) {}

  createBasicMessage(): void {
    this.message.info('This is a normal message');
  }

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
  value: any;

  ngOnInit() {
    console.log(this.room);
  }
}
