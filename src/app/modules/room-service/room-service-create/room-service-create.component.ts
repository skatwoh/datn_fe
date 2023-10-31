import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../project/service/project.service";
import {RoomServiceModel} from "../../../models/room-service.model";
import {RoomServiceService} from "../service/room-service.service";

@Component({
  selector: 'cons-room-service-create',
  templateUrl: './room-service-create.component.html',
  styleUrls: ['./room-service-create.component.scss']
})
export class RoomServiceCreateComponent implements OnInit{
  roomservice : RoomServiceModel ={
    id: 0,
    ma: '',
    tenDichVu: '',
    ghiChu: '',
    giaDichVu: 0,
    trangThai: 0
  };
  submitted = false;

  constructor(private roomSerivceSerivce: RoomServiceService) {}

  ngOnInit() {
    console.log(this.roomservice);
  }


  saveRoomSerivce(): void {
    const data = {
      ma: this.roomservice.ma,
      tenDichVu: this.roomservice.tenDichVu,
      ghiChu: this.roomservice.ghiChu,
      giaDichVu: this.roomservice.giaDichVu,
      trangThai: 1
    };

    this.roomSerivceSerivce.create(data).subscribe({
      next: (res) => {
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newRoomService(): void {
    this.submitted = false;
    this.roomservice = {
      id: 0,
      ma: '',
      tenDichVu: '',
      ghiChu: '',
      giaDichVu: 0,
      trangThai: 0
    };
  }

  protected readonly RoomServiceModel = RoomServiceModel;

}
