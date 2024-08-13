import {Component, OnChanges, OnInit} from '@angular/core';
import {CaseService} from "./case.service";
import {RoomMappingCtpModel} from "../../../models/room-mapping-ctp.model";
import {RoomListModel} from "../../../models/room-list.model";
import {AuthService} from "../../../auth/services";
import {UserModel} from "../../../auth/models/user.model";
import {BillService} from "../../../modules/bill/bill.service";
import * as moment from 'moment';
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'cons-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit{
  isVisible = false;
  rooms: RoomMappingCtpModel[] = [];
  bookings: RoomListModel[] = [];
  user: UserModel | undefined;
  checkInDate: string = '';
  checkOutDate: string = '';
  show = true;
  constructor(private caseService: CaseService, private authService: AuthService, private billService: BillService,
              private message: NzMessageService, private router : Router) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.getRoomOfFloar();
  }

  test() {
    if (this.checkOutDate !== '' && this.checkInDate !== '') {
      this.caseService.getRoomActive(1, 50, this.checkInDate, this.checkOutDate).subscribe(res => {
        if (res && res.content) {
          this.rooms = res.content;
        }
      })
    }
  }

  getRoomOfFloar(): void {
    this.caseService.getRoomOfFloar(1, 50).subscribe(res => {
      if (res && res.content) {
        this.rooms = res.content;
      }
    })
  }

  getTooltipContent(room: RoomMappingCtpModel): string {
    return `
      Số lượng người: ${room.soLuong} -
      Giá phòng: ${room.giaPhong} VND -
      ${room.tenLoaiPhong}
   `;
  }

  addToBookingList(room: any): void {
    const checkInDate = new Date(this.checkInDate);
    const checkOutDate = new Date(this.checkOutDate);

    const oneDay = 24 * 60 * 60 * 1000;
    const numberOfDays = Math.round(Math.abs((checkOutDate.getTime() - checkInDate.getTime()) / oneDay));

    const booking: RoomListModel = {
      userId: this.user?.id,
      idPhong: room.id,
      checkIn: checkInDate.toISOString(),
      checkOut: checkOutDate.toISOString(),
      soNguoi: 0,
      tongGia: room.giaPhong * numberOfDays,
      trangThai: 4,
      ma: room.ma
    };

    this.bookings.push(booking);
  }

checkToRoom(room: any) {
    return this.bookings.some(booking => booking.ma === room.ma)
}

  removeFromBookingList(index: number): void {
    this.bookings.splice(index, 1);
  }

  createBill(): void {
    const data = {
      tongTien: this.getTotalTongGia(),
      idKhachHang: this.user?.id
    }
    this.billService.createOrUpdate(data).subscribe((res: any) => {
      console.log(res);
    })
  }

  getTotalTongGia(): number {
    return this.bookings.reduce((total, booking) => total + (booking.tongGia || 0), 0);
  }

  onSubmit(): void {
    if (this.checkInDate > this.checkOutDate) {
      this.message.warning("Ngày nhận phòng phải nhỏ hơn ngày trả phòng");
    } else if (this.bookings.length === 0) {
      this.message.warning("Vui lòng chọn phòng");
    } else {
      this.createBookingsAPI();
      this.router.navigate(['/me/step/1']);
    }
  }

  createBookingsAPI(): void {
    this.createBill();
    setTimeout(() => {
      console.log('Calling createBookings API...');
      console.log('Bookings:', this.bookings);

      this.caseService.createBookings(this.bookings)
          .subscribe(
              response => console.log('API Response:', response),
              error => console.error('API Error:', error)
          );
    }, 500);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
