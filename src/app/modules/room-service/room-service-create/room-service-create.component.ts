import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../project/service/project.service";
import {RoomServiceModel} from "../../../models/room-service.model";
import {RoomServiceService} from "../service/room-service.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {NzUploadFile} from "ng-zorro-antd/upload";

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
    trangThai: 0,
    soLuong: 0,
    image: ''
  };
  submitted = false;
  roomList: RoomServiceModel[] = [];
  imageDichVu = '';
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
      trangThai: 1,
      soLuong: this.roomservice.soLuong,
      image: ''
    };

    const fileInput: HTMLInputElement = document.getElementById('image') as HTMLInputElement;
    const file: File | null = (fileInput.files && fileInput.files.length > 0) ? fileInput.files[0] : null;

    if (file) {
      // Đọc file thành chuỗi Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        data.image = reader.result as string; // Thêm trường base64Image vào payload
        this.roomSerivceSerivce.create(data).subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
            this.successMessage();
          },
          error: (e) => console.error(e)
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.roomSerivceSerivce.create(data).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.successMessage();
        },
        error: (e) => console.error(e)
      });
    }

    setTimeout( () => {
      this.getRooms();
      this.router.navigate(['/admin/room-service']);
    }, 1000)
  }

  successMessage(): void {
    this.message.success('Thêm thành công');
  }

}
