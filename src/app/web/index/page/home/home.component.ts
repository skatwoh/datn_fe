import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {HomeService} from "./home.service";
import {RoomModel} from "../../../../models/room.model";
import {environment} from "../../../../../environments/environment";
import {RoomTypeModel} from "../../../../models/room-type.model";
import {AppConstants} from "../../../../app-constants";
import {NzNotificationPlacement, NzNotificationService} from "ng-zorro-antd/notification";
import {FormBuilder} from "@angular/forms";
import {first} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {ModalData} from "./ModalData";
import {RoomService} from "../../../../modules/room/services/room.service";
import {RoomTypeService} from "../../../../modules/room-category/services/room-type.service";
import _default from "chart.js/dist/plugins/plugin.title";
import position = _default.defaults.position;

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
  soNguoi: number = 1;
  soPhong: number = 1;
  soTreEm: number = 1;
  modalData: ModalData = {
    soPhong: this.soPhong,
    soNguoi: this.soNguoi,
    isShowPhong: false,
    isShowNguoi: false
  };
  isVisible = false;
  isVisibleLP = false;
  listOK: any[] = [];
  listLoaiPhong: RoomTypeModel[] = [];
  sP: any;
  sN: any;

  constructor(private homeService: HomeService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient,
              private notification: NzNotificationService,
              private fb: FormBuilder,
              private mess: NzMessageService,
              private roomTypeService: RoomTypeService
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
    if(this.checkIn === '' || this.checkOut === ''){
      this.mess.warning('Vui lòng nhập ngày nhận và ngày trả');
      return;
    }
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

  changeSoNguoi(): void {
    if(this.modalData.isShowNguoi == false){
      this.modalData.isShowNguoi = true;
    }else{
      this.modalData.isShowNguoi = false;
    }
  }

  showLoaiPhong(): void{
    if(this.isVisibleLP == false){
      this.isVisibleLP = true;
    }else{
      this.isVisibleLP = false;
    }
  }

  changeSoPhong(): void {
    if(this.modalData.isShowPhong == false){
      this.modalData.isShowPhong = true;
    }else{
      this.modalData.isShowPhong = false;
    }
  }

  giamSoNguoi(): void {
    if(this.soNguoi === 1){
      return;
    }
    if(this.soNguoi === this.soPhong){
      this.soPhong--;
      this.soNguoi--;
      return;
    }
    this.soNguoi--;
  }

  tangSoNguoi(): void {
    if(this.soNguoi === 30){
      return;
    }
    this.soNguoi++;
    if(this.soNguoi > 5 && this.soPhong === Math.floor(this.soNguoi/5) && this.soNguoi%5 !== 0){
      this.soPhong++;
    }
  }

  giamSoPhong(): void {
    // (document.getElementById(value) as HTMLInputElement).value = String(Number((document.getElementById(value) as HTMLInputElement).value) - 1);
    if(this.soPhong === 1){
      return;
    }
    this.soPhong--;
    if(this.soNguoi > 5 && this.soNguoi%5 === 0 && this.soPhong < this.soNguoi/5){
        this.soNguoi-=5;
        return;
    }
    if(this.soNguoi > 5 && this.soNguoi%5 !== 0 && this.soPhong === Math.floor(this.soNguoi/5)){
      this.soNguoi-=this.soNguoi%5;
      return;
    }
  }

  tangSoPhong(): void {
    // (document.getElementById(value) as HTMLInputElement).value = String(Number((document.getElementById(value) as HTMLInputElement).value) + 1);
    if(this.soPhong === 8){
      return;
    }
    if(this.soPhong === this.soNguoi){
      this.soNguoi++;
      this.soPhong++;
      return;

    }
    this.soPhong++;
  }

  testSearch(soPhong: any, soNguoi: any, position: NzNotificationPlacement): void{
    const checkInElement = document.getElementById('checkIn') as HTMLInputElement;
    const checkOutElement = document.getElementById('checkOut') as HTMLInputElement;
    if(checkOutElement.value == '' || checkOutElement.value == ''){
      this.notification.blank(
        'Vui lòng nhập đầy đủ ngày nhận phòng và ngày trả phòng!',
        '',
        { nzPlacement: position }
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

  getListRoomType(){
    this.roomTypeService.getRoomTypeList(1, 50).subscribe(res => {
      this.roomType = res.content;
    })
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  ngOnInit(): void {
    // this.getListTopRoomBooking();
  }

}
