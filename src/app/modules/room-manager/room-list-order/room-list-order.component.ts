import {Component, OnInit} from '@angular/core';
import {RoomService} from "../../room/services/room.service";
import {RoomModel} from "../../../models/room.model";
import {CaseService} from "../../../web/index/case/case.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomTypeModel} from "../../../models/room-type.model";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {HomeService} from "../../../web/index/page/home/home.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'cons-room-list-order',
  templateUrl: './room-list-order.component.html',
  styleUrls: ['./room-list-order.component.scss']
})
export class RoomListOrderComponent implements OnInit {

  room: RoomModel[] = [];
  searchInput: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  roomType: RoomTypeModel[] = [];
  tenLoaiPhong: string = '';

  constructor(private roomService: RoomService, private caseService: CaseService,
              private router: Router, private route: ActivatedRoute, private http: HttpClient,
              private homeService: HomeService, private mess: NzMessageService) {
  }

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2) => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    });
    this.getRooms();
  }

  private getRooms(): void {
    this.roomService.getRoomListOrder(1, 50).subscribe(res => {
      if (res && res.content) {
        this.room = res.content;
      }
    })
  }

  getRoomByString(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.roomService.getRoomBySearch(1, 50, this.searchInput).subscribe(res => {
      const queryParams = {
        searchInput: this.searchInput
      };
      if (res && res.content) {
        this.room = res.content;
      }
      // this.router.navigate(['/room'], { queryParams });
    })
  }

  getRoomByDate() {
    const tenLoaiPhongElement = document.getElementById('tenLoaiPhong') as HTMLInputElement;
    this.tenLoaiPhong = tenLoaiPhongElement.value;
    if (this.checkInDate === '' || this.checkOutDate === '') {
      if (this.tenLoaiPhong !== '') {
        this.homeService.getRoomListLoaiPhong(1, 50, this.tenLoaiPhong).pipe(first()).subscribe(res => {
          if (res != null) {
            if (res && res.content) {
              this.room = res.content;
            }
          }
        })
      }else if(this.tenLoaiPhong === ''){
        this.getRooms();
      }
    } else if (this.checkInDate !== '' && this.checkOutDate !== '') {

      this.homeService.getRoomListSearch(1, 50, '', this.tenLoaiPhong, this.checkInDate, this.checkOutDate).pipe(first()).subscribe(res => {
        if (res != null) {
          if (res && res.content) {
            this.room = res.content;
          }
        } else {
          this.mess.warning('Ngày nhận và ngày trả không hợp lệ');
          this.room = [];
        }
      })
    }
    this.route.queryParams.subscribe(params => {
      const checkIn = params['checkIn'];
      const checkOut = params['checkOut'];
    });
  }

  test(id: any) {
    const checkIn = document.getElementById('checkIn') as HTMLInputElement;
    const checkOut = document.getElementById('checkOut') as HTMLInputElement;
    this.checkInDate = checkIn.value;
    this.checkOutDate = checkOut.value;
    const queryParams = {
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
    };
    this.router.navigate(['/admin/room-manager/room-manager-details/', id], {queryParams});
  }
}
