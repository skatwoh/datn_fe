import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../project/service/project.service";
import {RoomServiceModel} from "../../../models/room-service.model";
import {RoomServiceService} from "../service/room-service.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

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
  roomList: RoomServiceModel[] = [];
  constructor(private roomSerivceSerivce: RoomServiceService,
              private message: NzMessageService,
              private router: Router) {}

  ngOnInit() {

  }

  getRooms(): void {
    this.roomSerivceSerivce.getRoomSerivceList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.roomList= res.content;
      }
    })
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
        console.log(res);
        this.submitted = true;
        this.successMessage();
        this.router.navigate(['/admin/room-service']);
        this.getRooms();
      },
      error: (e) => console.error(e)
    });
  }

  successMessage(): void {
    this.message.success('Thêm thành công');
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

  handleChangService(value: any) {
    if(value == null && value == undefined){
      this.roomservice.giaDichVu = 500000;
    }
    if(value == "Massage"){
      this.roomservice.giaDichVu = 500000;
    } else if (value == "Do an"){
      this.roomservice.giaDichVu = 100000;
    }
  }

}
