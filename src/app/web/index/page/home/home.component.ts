import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {HomeService} from "./home.service";
import {RoomModel} from "../../../../models/room.model";
import {environment} from "../../../../../environments/environment";
import {RoomTypeModel} from "../../../../models/room-type.model";
import {AppConstants} from "../../../../app-constants";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {FormBuilder} from "@angular/forms";
import {first} from "rxjs";

@Component({
  selector: 'cons-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  room: RoomModel[] = [];
  roomBooking: RoomModel[] = [];
  soLuongNguoi: string = '';
  tenLoaiPhong :string = '';
  checkIn :string = '';
  checkOut :string = '';
  roomType : RoomTypeModel[] = [];
  hasError = false;
  message : string = '';
  constructor(private homeService: HomeService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient,
              private notification: NzNotificationService,
              private fb: FormBuilder
              ) {

  }

  getRoomsSearch(): void {
    const soLuongNguoiElement = document.getElementById('soLuongNguoi') as HTMLInputElement;
    const tenLoaiPhongElement = document.getElementById('tenLoaiPhong') as HTMLInputElement;
    const checkInElement = document.getElementById('checkIn') as HTMLInputElement;
    const checkOutElement = document.getElementById('checkOut') as HTMLInputElement;
    this.soLuongNguoi = soLuongNguoiElement.value;
    this.tenLoaiPhong = tenLoaiPhongElement.value;
    this.checkIn = checkInElement.value;
    this.checkOut = checkOutElement.value;
    this.homeService.getRoomListSearch(1, 50, this.soLuongNguoi, this.tenLoaiPhong, this.checkIn, this.checkOut).pipe(first()).subscribe(res => {
      if (res != null){
        const queryParams = {
          soLuongNguoi: this.soLuongNguoi,
          tenLoaiPhong: this.tenLoaiPhong,
          checkIn: this.checkIn,
          checkOut: this.checkOut,
        };
        if (res && res.content) {
          this.room= res.content;
        }
        this.router.navigate(['/room'], { queryParams });
      } else {
        this.message = 'Ngày nhận không hợp lệ';
        this.hasError = true;
      }

    })
  }

  getListTopRoomBooking(): void {
    this.homeService.getListTopRoomBooking(1, 3).subscribe(res => {
      if (res && res.content) {
        this.roomBooking= res.content;
      }
    })
  }

  ngOnInit(): void {
    this.getListTopRoomBooking();
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2)  => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    });
  }

}
