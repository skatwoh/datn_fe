import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {HomeService} from "./home.service";
import {RoomModel} from "../../../../models/room.model";
import {environment} from "../../../../../environments/environment";
import {RoomTypeModel} from "../../../../models/room-type.model";
import {AppConstants} from "../../../../app-constants";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'cons-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  room: RoomModel[] = [];
  tenLoaiPhong :string = '';
  checkIn :string = '';
  checkOut :string = '';
  roomType : RoomTypeModel[] = [];
  hasError = false;
  message : string = '';
  constructor(private homeService: HomeService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient,
              private notification: NzNotificationService,
              ) { }


  // getRoomsSearch(): void {
  //   const soNguoiElement = (document.getElementById('tenLoaiPhong') as HTMLInputElement).value;
  //   const checkInElement = (document.getElementById('checkIn') as HTMLInputElement).value;
  //   const checkOutElement = (document.getElementById('checkOut') as HTMLInputElement).value;
  //   this.router.navigate(['/room'], {
  //     queryParams: {
  //       checkIn: checkInElement,
  //       checkOut: checkOutElement,
  //       tenLoaiPhong: soNguoiElement,
  //     },
  //   });
  // }

  getRoomsSearch(): void {
    const tenLoaiPhongElement = document.getElementById('tenLoaiPhong') as HTMLInputElement;
    const checkInElement = document.getElementById('checkIn') as HTMLInputElement;
    const checkOutElement = document.getElementById('checkOut') as HTMLInputElement;
    this.tenLoaiPhong = tenLoaiPhongElement.value;
    this.checkIn = checkInElement.value;
    this.checkOut = checkOutElement.value;
    this.hasError = false;
    this.homeService.getRoomListSearch(1, 50, this.tenLoaiPhong, this.checkIn, this.checkOut).subscribe(res => {
        if (res?.code === AppConstants.API_BAD_REQUEST_CODE && res?.entityMessages.length > 0) {
          const msg: any = res.entityMessages[0];
          this.notification.warning(`${msg.errorMessage}`, "");
        } else {
          this.message = `Error`;
        }
        this.hasError = true;
      if (res && res.content) {
        this.room= res.content;
      }
    })
    const queryParams = {
      tenLoaiPhong: this.tenLoaiPhong,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
    };

    this.router.navigate(['/room'], { queryParams });
  }

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2)  => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    });
  }

}
