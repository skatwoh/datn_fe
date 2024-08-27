import {Component, OnInit} from '@angular/core';
import {RoomTypeModel} from "../../../../models/room-type.model";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs";
import {HomeService} from "../home/home.service";
import {RoomModel} from "../../../../models/room.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzNotificationPlacement} from "ng-zorro-antd/notification";

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
  giaPhong: number = 0;

  constructor(private http: HttpClient, private homeService: HomeService, private router: Router,
              private route: ActivatedRoute, private mess: NzMessageService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if(params['soPhong'] && params['soNguoi'] && params['checkIn'] && params['checkOut'] ){
        this.soPhong = params['soPhong'];
        this.soNguoi = params['soNguoi'];
        this.checkIn = params['checkIn'];
        this.checkOut = params['checkOut'];
        if(this.checkIn != undefined && this.checkOut != undefined && this.soNguoi != undefined && this.soPhong != undefined){
          this.homeService.getListLoaiPhongBySoNguoi(this.soPhong, this.soNguoi, this.checkIn, this.checkOut).subscribe(res=>{
            this.listLoaiPhong = res;
          })
        }
      }
      if(!params['soPhong'] && !params['soNguoi'] && !params['checkIn'] && !params['checkOut'] ){
        this.soPhong = 1;
        this.soNguoi = 1;
        this.checkIn = new Date().toISOString().split('T')[0];
        this.checkOut = new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
        this.homeService.getListLoaiPhongBySoNguoi(1, 1, this.checkIn, this.checkOut).subscribe(res=>{
          this.listLoaiPhong = res;
        })
      }
    })
  }

  orderRoom(id: any){
    const queryParams = {
      soPhong: this.soPhong,
      soNguoi: this.soNguoi,
      checkIn: this.checkIn,
      checkOut: this.checkOut
    }
    this.router.navigate(['/room-detail/' + id], {queryParams});
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

  searchByAll(soPhong: any, soNguoi: any){
    if(Number.parseInt((document.getElementById('soNguoi') as HTMLInputElement).value) < Number.parseInt((document.getElementById('soPhong') as HTMLInputElement).value)){
      this.mess.warning(
        'Số người không được nhỏ hơn số phòng!'
      );
      return;
    }
    const checkInElement = document.getElementById('checkIn') as HTMLInputElement;
    const checkOutElement = document.getElementById('checkOut') as HTMLInputElement;
    if(checkOutElement.value == '' || checkOutElement.value == ''){
      this.mess.warning(
        'Vui lòng nhập đầy đủ ngày nhận phòng và ngày trả phòng!'
      );
      return;
    }
    if(checkOutElement.value < new Date().toISOString().split('T')[0] || checkInElement.value < new Date().toISOString().split('T')[0] ||
      checkOutElement.value < checkInElement.value || checkOutElement.value == checkInElement.value){
      this.mess.warning("Ngày nhận và ngày trả không hợp lệ!");
      return;
    }
    // this.isVisible = true;
    setTimeout( () => {
      this.homeService.getListLoaiPhongBySoNguoi(soPhong, soNguoi, checkInElement.value, checkOutElement.value).subscribe(res=>{
        this.listLoaiPhong = res;
      })
    }, 500)
    setTimeout(() => {
      const queryParams = {
        soPhong: this.soPhong,
        soNguoi: this.soNguoi,
        checkIn: checkInElement.value,
        checkOut: checkOutElement.value
      }
      this.router.navigate(['/room-default'], {queryParams});
    }, 1000)
  }

  handleBlur(): void {
    console.log('blur');
  }
}
