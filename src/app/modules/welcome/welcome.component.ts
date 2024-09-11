import {Component, Input, OnInit} from '@angular/core';
import {RoomModel} from "../../models/room.model";
import {RoomService} from "../room/services/room.service";
import {Router} from "@angular/router";
import {RoomOrder} from "../../models/room-order";
import {RoomManagerService} from "../room-manager/services/room-manager.service";
import {forkJoin} from 'rxjs';
import {ServiceService} from "../../web/index/page/service/service.service";
import {AccountModel} from "../account/models/account.model";
import {AccountService} from "../account/services/account.service";
import {CommentService} from "../../web/index/comment/comment.service";
import * as moment from "moment/moment";
import {NzMessageService} from "ng-zorro-antd/message";
import {ListRoomOrderService} from "../../web/index/page/list-room-order/list-room-order.service";
import {CustomerUseRoom} from "../../models/CustomerUseRoom";


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @Input() roomOrder: RoomOrder[] = [];
  room: RoomModel[] = [];
  accounts: AccountModel[] = [];
  count: number | undefined;
  yearSelect: number[] = [];
  monthSelect: number[] = [];
  daySelect: number[] = [];
  pages: string[] = ['room', 'room-detail', 'about'];
  checkInDate: string = '';
  checkOutDate: string = '';
  tongDoanhThu: any = 0;
  tongSoPhong: any = 0;
  yearNumber: string = '';
  monthNumber: string = '';
  luaChon: string = '';
  tongSoDichVu: number = 0;
  customerUseRoom: CustomerUseRoom[] = [];
  public tasks: any[] = [];

  constructor(private roomService: RoomService, private router: Router, private roomOrderService: RoomManagerService,
              private service: ServiceService, private accountService: AccountService, private commentService: CommentService,
              private mess: NzMessageService, private roomOrderService1: ListRoomOrderService) {
  }

  getRooms() {
    return this.roomService.getRoomList(1, 50);
  }

  getRoomOrders() {
    return this.roomOrderService.getListRoomManager(1, 50);
  }

  getAccounts() {
    return this.accountService.getUserList(1, 50);
  }

  loadComments(): void {
    this.commentService.count().subscribe(res => {
      this.count = res;
    });
  }

  ngOnInit() {
    forkJoin([
      this.getRooms(),
      this.getRoomOrders(),
      this.getAccounts(),
    ]).subscribe(([roomsResponse, roomOrdersResponse, accountsResponse]) => {
      if (roomsResponse && roomsResponse.content) {
        this.room = roomsResponse.content;
      }

      if (roomOrdersResponse && roomOrdersResponse.content) {
        this.roomOrder = roomOrdersResponse.content;
        this.tongSoPhong = this.roomOrder.length;
      }

      if (accountsResponse && accountsResponse.content) {
        this.accounts = accountsResponse.content;
      }
    });
    this.service.getAllDoanhThu().subscribe(res => {
      this.tongDoanhThu = res.body;
    });
    this.loadComments();
    this.getDoanhThuByDay();
    this.getSoPhongDaDat();
    this.addYearSelect();
    this.addMonthSelect();
    this.getDayByMonthAndYear();
    this.service.getCountDichVuByYear(2024).subscribe(res => {
      this.tongSoDichVu = res.body;
    })
  }

  getVisitCount() {
    const page = 'HomePage'; // Cần thay đổi tùy thuộc vào trang hiện tại

    this.service.getVisitCount(page).subscribe(count => {
      console.log(`Số lượt truy cập: ${count}`);
    });
  }


  getUniqueVisitorsCount(page: string) {
    // Gọi phương thức từ service để lấy số lượng người truy cập duy nhất cho từng trang
    let count = 0;
    this.service.getUniqueVisitorsCount(page).subscribe(response => {
      count = response;
    });
    return count;
  }

  getDoanhThuByDay(): void {

    console.log((document.getElementById('checkIn') as HTMLInputElement).value);
    if ((document.getElementById('checkIn') as HTMLInputElement).value !== '' && (document.getElementById('checkOut') as HTMLInputElement).value !== '') {
      if((document.getElementById('checkIn') as HTMLInputElement).value > (document.getElementById('checkOut') as HTMLInputElement).value){
        this.mess.warning('Khoảng thời gian không hợp lệ');
        return;
      }
      this.service.getDoanhThuByTime((document.getElementById('checkIn') as HTMLInputElement).value,
        (document.getElementById('checkOut') as HTMLInputElement).value).subscribe(res => {
        this.tongDoanhThu = res.body;
      });
    }
    this.getSoPhongDaDat();
  }

  getSoPhongDaDat(): void {
    if ((document.getElementById('checkIn') as HTMLInputElement).value !== '' && (document.getElementById('checkOut') as HTMLInputElement).value !== '') {
      this.service.getSoPhongDaDat((document.getElementById('checkIn') as HTMLInputElement).value,
        (document.getElementById('checkOut') as HTMLInputElement).value).subscribe(res => {
        this.tongSoPhong = res.body;
      });
      this.service.getCountChiTietDichVu((document.getElementById('checkIn') as HTMLInputElement).value,
        (document.getElementById('checkOut') as HTMLInputElement).value).subscribe(res => {
        this.tongSoDichVu = res.body;
      });
    }
  }

  addYearSelect() {
    for (var x = 2024; x <= 2030; x++) {
      this.yearSelect.push(x);
    }
  }

  addMonthSelect() {
    for (var x = 1; x <= 12; x++) {
      this.monthSelect.push(x);
    }
  }

  getDayByMonthAndYear() {
    const yearInput = document.getElementById('year') as HTMLInputElement;
    const monthInput = document.getElementById('month') as HTMLInputElement;
    this.yearNumber = yearInput.value;
    this.monthNumber = monthInput.value;
    let date = new Date(Number(this.yearNumber), Number(this.monthNumber), 1);
    let date2 = moment({year: Number(this.yearNumber), month: Number(this.monthNumber) - 1});
    let daysInMonth = date2.daysInMonth();
    this.daySelect = [];
    for (let x = 1; x <= daysInMonth; x++) {
      this.daySelect.push(x);
    }
    this.getDoanhThuByYear();
    console.log(daysInMonth);
  }

  getDoanhThuByYear(): void {
    (document.getElementById('checkIn') as HTMLInputElement).value = '';
    (document.getElementById('checkOut') as HTMLInputElement).value = '';
    const luaChon = document.getElementById('luaChon') as HTMLInputElement;
    const yearSl = document.getElementById('year') as HTMLInputElement;
    const monthSl = document.getElementById('month') as HTMLInputElement;
    const daySl = document.getElementById('day') as HTMLInputElement;
    this.luaChon = luaChon.value;
    if (this.luaChon == '1' && (yearSl.value !== null && yearSl.value !== '')) {
      this.service.getDoanhThuByYear(yearSl.value).subscribe(res => {
        this.tongDoanhThu = res.body;
      })
      this.service.getSoPhongDaDatByYear(yearSl.value).subscribe(res => {
        this.tongSoPhong = res.body;
      })
      this.service.getCountDichVuByYear(yearSl.value).subscribe(res => {
        this.tongSoDichVu = res.body;
      })
    } else if (this.luaChon == '2' && yearSl.value !== null && yearSl.value !== '' && monthSl.value !== null && yearSl.value !== '') {
      this.service.getDoanhThuByMonth(yearSl.value, monthSl.value).subscribe(res => {
        this.tongDoanhThu = res.body;
      })
      this.service.getSoPhongDaDatByMonth(yearSl.value, monthSl.value).subscribe(res => {
        this.tongSoPhong = res.body;
      })
      this.service.getCountDichVuByMonth(yearSl.value, monthSl.value).subscribe(res => {
        this.tongSoDichVu = res.body;
      })
    } else if (this.luaChon == '3' && yearSl.value !== null && yearSl.value !== ''
      && monthSl.value !== null && yearSl.value !== '' && daySl.value !== null && daySl.value !== '') {
      this.service.getDoanhThuByDay(yearSl.value, monthSl.value, daySl.value).subscribe(res => {
        this.tongDoanhThu = res.body;
      })
      this.service.getSoPhongDaDatByToDay(yearSl.value, monthSl.value, daySl.value).subscribe(res => {
        this.tongSoPhong = res.body;
      })
      this.service.getCountDichVuByToDay(yearSl.value, monthSl.value, daySl.value).subscribe(res => {
        this.tongSoDichVu = res.body;
      })
    }
  }


}
