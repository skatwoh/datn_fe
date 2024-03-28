import {Component, OnInit} from '@angular/core';
import {RoomTypeModel} from "../../../../models/room-type.model";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {HomeService} from "../home/home.service";
import {RoomModel} from "../../../../models/room.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'cons-room-default',
  templateUrl: './room-default.component.html',
  styleUrls: ['./room-default.component.scss']
})
export class RoomDefaultComponent implements OnInit{
  roomType : RoomTypeModel[] = [];
  soLuongNguoi: string = '';
  tenLoaiPhong :string = '';
  checkIn :string = '';
  checkOut :string = '';
  room: RoomModel[] = [];
  hasError = false;
  message : string = '';
  soNguoi: number = 1;
  soPhong: number = 1;
  listLoaiPhong : RoomTypeModel[] = [];

  constructor(private http: HttpClient, private homeService: HomeService, private router: Router,
              private route: ActivatedRoute, private mess: NzMessageService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.soPhong = params['soPhong'];
      this.soNguoi = params['soNguoi'];
      this.checkIn = params['checkIn'];
      this.checkOut = params['checkOut'];
      this.homeService.getListLoaiPhongBySoNguoi(this.soPhong, this.soNguoi, this.checkIn, this.checkOut).subscribe(res=>{
        this.listLoaiPhong = res;
      })
    })
  }

  getRoomsSearch(): void {
    const tenLoaiPhongElement = document.getElementById('tenLoaiPhong') as HTMLInputElement;
    const checkInElement = document.getElementById('checkIn') as HTMLInputElement;
    const checkOutElement = document.getElementById('checkOut') as HTMLInputElement;
    this.tenLoaiPhong = tenLoaiPhongElement.value;
    this.checkIn = checkInElement.value;
    this.checkOut = checkOutElement.value;
    if(this.checkIn == '' || this.checkOut == ''){
      this.mess.warning('Vui lòng chọn ngày nhận và ngày trả');
      return;
    }
    this.homeService.getRoomListSearch(1, 50, '', this.tenLoaiPhong, this.checkIn, this.checkOut).pipe(first()).subscribe(res => {
      if (res != null){
        const queryParams = {
          soLuongNguoi: '',
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
        this.mess.warning('Ngày nhận và ngày trả không hợp lệ');
        this.hasError = true;
      }

    })
  }

  handleBlur(): void {
    console.log('blur');
  }
}
