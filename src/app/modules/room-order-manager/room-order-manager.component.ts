import {Component, OnInit} from '@angular/core';
import {RoomService} from "../room/services/room.service";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RoomTypeModel} from "../../models/room-type.model";
import {RoomManagerService} from "../room-manager/services/room-manager.service";
import {RoomOrderMappingModel} from "../../models/room-order-mapping.model";
import {DatePipe, formatDate} from "@angular/common";
import {RoomServiceService} from "../room-service/service/room-service.service";
import {RoomServiceModel} from "../../models/room-service.model";
import {CheckInDetailModel} from "../../models/check-in-detail.model";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {RoomMappingModel} from "../../models/room-mapping.model";
import {NzNotificationPlacement, NzNotificationService} from "ng-zorro-antd/notification";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomModel} from "../../models/room.model";
import {CustomerModel} from "../customer/models/customer.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {CustomerService} from "../customer/services/customer.service";
import {BillService} from "../bill/bill.service";
import {first, Observable, Subscription, switchMap} from "rxjs";
import {AppConstants} from "../../app-constants";
import {RoomOrder} from "../../models/room-order";
import {ListRoomOrderService} from "../../web/index/page/list-room-order/list-room-order.service";
import {DetailsServiceModel} from "../../models/details-service.model";
import {BillModel} from "../../models/bill.model";
import * as moment from "moment";
import {CustomerUseRoom} from "../../models/CustomerUseRoom";
import { subYears, isBefore, isAfter } from 'date-fns';
import {GanttItem} from "@worktile/gantt";


@Component({
  selector: 'cons-room-order-manager',
  templateUrl: './room-order-manager.component.html',
  styleUrls: ['./room-order-manager.component.scss']
})
export class RoomOrderManagerComponent implements OnInit {
  room: RoomOrderMappingModel[] = [];
  roomMapping: RoomMappingModel[] = [];
  roomOfBill: RoomOrderMappingModel[] = [];
  roomType: RoomTypeModel[] = [];
  isVisible = false;
  isVisibleCheckIn = false;
  isVisibleCheckOut = false;
  isVisibleListDP = false;
  isVisibleOrderForm = false;
  roomModel!: RoomOrderMappingModel;
  roomServiceModel: RoomServiceModel[] = [];
  checkInDetail!: CheckInDetailModel;
  formCheckIn: FormGroup;
  formCheckOut: FormGroup;
  roomOrderForm: FormGroup;
  date: Date = new Date();
  roomMd!: RoomModel;
  roomMapMd!: RoomMappingModel;
  checkInSearch: any;
  checkOutSearch: any;
  private unsubscribe: Subscription[] = [];
  customerModel!: CustomerModel;
  customer!: CustomerModel;
  idKhach: any;
  hoTen: string = '';
  sdt: string = '';
  ngaySinh: any;
  idDatPhongNow: any;
  roomOrderModel!: RoomOrder;
  isVisibleSpin = false;
  idPhong: any;
  checkInDetailModel!: CheckInDetailModel;
  isVisibleDichVu = false;
  idDichVu: any;
  roomSvModel!: RoomServiceModel;
  detailsService: DetailsServiceModel[] = [];
  idHoaDon: any;
  currentBill!: BillModel;
  tongTien: number = 0;
  tongTienDichVu: number = 0;
  soPhongTrong: number = 0;
  isVisibleCheckOutLater = false;
  tienPhat: number = 0;
  thoiGianMuon: number = 0;
  checkList: number = 0;
  listRoomChange: RoomMappingModel[] = [];
  isVisibleChangeRoom = false;
  isVisibleXacNhanDoi = false;
  isVisibleListCheckOut = false;
  listCheckOutToDay: RoomOrderMappingModel[] = [];
  isVisibleXacNhanDatTruoc = false;
  isVisibleCheckOutMuon = false;
  checkInToday!: RoomOrderMappingModel;
  tongTienKhachHang: number = 0;
  isVisibleTichDiem = false;
  isVisibleCheckoutSom = false;
  soNgayCheckOutSom: any;
  dateNow: any;
  currentRoomOrder!: RoomOrder;
  isVisibleHuyPhong = false;
  isOkLoading = false;
  isOkLoadingTimPhong = false;
  soLuongDichVu: number = 0;
  cccdValue: string = '';
  isVisibleTimPhong = false;
  listRoomByCCCD : RoomOrderMappingModel[] = [];
  isVisibleListTimPhong = false;
  isAboveFifteen: boolean = false;
  customerUseRoom: CustomerUseRoom[] = [];

  listRoomOfBill : RoomOrder[] = [];

  constructor(private roomService: RoomService,
              private http: HttpClient,
              private roomManagerService: RoomManagerService,
              private roomSerivceService: RoomServiceService,
              private formBuilder: FormBuilder,
              private notification: NzNotificationService,
              private router: Router,
              private route: ActivatedRoute,
              private mess: NzMessageService,
              private customerService: CustomerService,
              private billService: BillService,
              private roomOrderService: ListRoomOrderService) {
    this.formCheckIn = this.formBuilder.group({
      idDatPhong: [0],
      cccdCheckIn: ['', Validators.required],
      hoTenCheckIn: ['', Validators.required],
      sdtCheckIn: ['', Validators.required],
      ngaySinhCheckIn: new FormControl(null, [Validators.required, this.minAgeValidator(18)]),
      gioiTinhCheckIn: [0],
      trangThaiCheckIn: [1],
      soNguoi: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10)])
    });
    this.formCheckOut = this.formBuilder.group({
      idDatPhong: [0],
      cccdCheckOut: ['', Validators.required],
      hoTenCheckOut: ['', Validators.required],
      ngaySinhCheckOut: ['', Validators.required],
    })
    this.roomOrderForm = this.formBuilder.group({
      idKhachHang: [0],
      idPhong: [0],
      checkIn: [''],
      checkOut: [''],
      soNguoi: [0, Validators.required],
      tongGia: [0, Validators.required],
      hoTen: ['', Validators.required],
      sdt: ['', Validators.required],
      cccd: ['', Validators.required],
      ghiChu: [''],
      trangThai: 1
    })
  }

  // getRoom(){
  //   this.roomManagerService.getAllDPMapping().subscribe(res => {
  //     this.room = res;
  //   })
  // }

  getRoomToDay() {
    (document.getElementById('checkIn') as HTMLInputElement).value = this.date.toISOString().split('T')[0];
    (document.getElementById('checkOut') as HTMLInputElement).value = new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString().split('T')[0];
    this.router.navigate(['/admin/room-order-manager/']);
    this.roomService.getRoomMapping(this.date.toISOString().split('T')[0], new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString().split('T')[0]).subscribe(res => {
      this.roomMapping = res;
    })
    const queryParams = {
      checkInDate: this.date.toISOString().split('T')[0],
      checkOutDate: new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
    };
    this.router.navigate(['/admin/room-order-manager/'], {queryParams});
  }

  getRoomMapping() {
    this.route.queryParams.subscribe(params => {
      if (params['checkInDate'] && params['checkOutDate']) {
        const checkIn = params['checkInDate'];
        const checkOut = params['checkOutDate'];
        this.checkInSearch = new Date(checkIn.toLocaleString());
        this.checkOutSearch = new Date(checkOut.toLocaleString());
        this.roomService.getRoomMapping(checkIn, checkOut).subscribe(res => {
          this.roomMapping = res;
          (document.getElementById('checkIn') as HTMLInputElement).value = checkIn;
          (document.getElementById('checkOut') as HTMLInputElement).value = checkOut;
        });
      } else if (!params['checkInDate'] && !params['checkOutDate']) {
        this.checkInSearch = this.date.toISOString();
        this.checkOutSearch = new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString();
        this.roomService.getRoomMapping(this.date.toISOString().split('T')[0], this.date.toISOString().split('T')[0]).subscribe(res => {
          this.roomMapping = res;
          this.soPhongTrong = 0;
          for(let x = 0;x <= res.length;x++){
            if(res[x].soPhong == 0){
              this.soPhongTrong++;
            }
          }
        })
      }
    });
  }

  resetSearch() {
    (document.getElementById('checkIn') as HTMLInputElement).value = '';
    (document.getElementById('checkOut') as HTMLInputElement).value = '';
    (document.getElementById('tenLoaiPhong') as HTMLInputElement).value = '';
    (document.getElementById('khachHang') as HTMLInputElement).value = '';
  }

  ngOnInit(): void {
    this.soPhongTrong = 0;
    this.getRoomMapping();
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2) => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    });
    this.dateNow = new Date().toISOString();
    if (this.roomModel.checkOut) {
      (document.getElementById('checkOut1') as HTMLInputElement).value = new Date(this.roomModel.checkOut).toISOString().split('T')[0];
    }
  }

  showDetail(id: any, idDP: any, idHD: any) {
    this.isVisible =  true;
    this.roomManagerService.getDPById(id).subscribe(res => {
      this.roomModel = res;
    })
    this.roomManagerService.getAllDPMappingByHD(idDP, idHD).subscribe(res => {
      this.roomOfBill = res;
    })
    this.getRoomSerivces();
  }

  private getRoomSerivces(): void {
    this.roomSerivceService.getRoomSerivceList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.roomServiceModel = res.content;
      }
    })
  }

  handleCancel() {
    this.isVisible = false;
  }

  onOk() {
    this.isVisible = false;
    if (this.formCheckIn.valid) {
      const data = this.formCheckIn.value;

      // this.roomInformationService.create(data).subscribe({
      //   next: (res) => {
      //     console.log(res);
      //     this.router.navigate(['/admin/room-information']);
      //   },
      //   error: (e) => console.error(e)
      // });
    }
  }

  viewRoom(id: any, idHD: any, idDP: any) {
    this.isVisible = true;
    this.idDatPhongNow = idDP;
    this.idHoaDon = idHD;
    this.roomManagerService.getDPById(id).subscribe(res => {
      this.roomModel = res;
    })
    this.roomManagerService.getAllDPMappingByHD(id, idHD).subscribe(res => {
      this.roomOfBill = res;
    })
    this.roomManagerService.detailCheckIn(idDP).subscribe(res => {
      this.checkInDetailModel = res;
    })
    this.billService.getAllChiTietDichVuByDatPhong(1, 15, idDP).subscribe(res => {
      this.detailsService = res.content;
    })
    this.getRoomSerivces();
    this.getTongTienDichVu(idDP);
  }

  minAgeValidator(minAge: number): ValidatorFn {
    const today = new Date();
    const minDate = subYears(today, minAge);

    // @ts-ignore
    return (control: FormControl): ValidationErrors | null => {
      const birthDate = new Date(control.value);
      return isAfter(birthDate, minDate) ? { minAge: true } : null;
    };
  }

  showFormCheckIn(id: any) {
    this.roomOrderService.get(id).subscribe((data: RoomOrder) => {
      this.roomOrderModel = data;
      if ((data.checkIn?.split('T')[0] ?? 0) > this.date.toISOString().split('T')[0] && data.trangThai == 1) {
        this.mess.warning('Chưa đến thời gian check-in!');
        return;
      }
      this.idDatPhongNow = id;
      this.isVisibleCheckIn = true;
    });
  }

  createCheckIn() {
    if ((document.getElementById('cccdCheckIn') as HTMLInputElement).value.length !== 12 && (document.getElementById('cccdCheckIn') as HTMLInputElement).value.length !== 9) {
      this.mess.warning('Số CCCD phải có độ dài 9 hoặc 12 chữ số');
      return;
    }
    // if ((document.getElementById('sdtCheckIn') as HTMLInputElement).value.length !== 10 && (document.getElementById('sdtCheckIn') as HTMLInputElement).value.length !== 11) {
    //   this.mess.warning('Số điện thoại không hợp lệ');
    //   return;
    // }
    const data = this.formCheckIn.value;
    data.idDatPhong = this.idDatPhongNow;
    this.roomManagerService.createCheckIn(data).subscribe(res => {
      console.log(res);
    })
    this.mess.success('Check-in thành công!');
    this.isVisibleCheckIn = false;
    this.isVisibleListDP = false;
    this.isVisible = false;
    this.router.navigate(['/admin/room-order-manager']);
    setTimeout(() => {
      this.roomManagerService.detailCheckIn(this.idDatPhongNow).subscribe(res => {
        this.checkInDetailModel = res;
      })
      this.viewRoom(this.idDatPhongNow, this.idHoaDon, this.idDatPhongNow);
    }, 1000)
  }

  showFormCheckout(id: any){
    console.log(new Date().getHours().toLocaleString('vi-VN'))
    console.log(new Date(this.roomModel.checkOut||'').getTime());
    console.log(new Date().getTime());
    const dateCheckIn = new Date(this.roomModel.checkIn||'');
    const dateCheckOut = new Date(this.roomModel.checkOut||'');
    if(dateCheckOut.getDay() - dateCheckIn.getDay() == 1) {
      console.log('Ngày checkIn kém ngày checkOut' + String(dateCheckOut.getDay() - dateCheckIn.getDay()) + 'ngày');
      this.roomService.getOneMapping(this.roomModel.id).subscribe(res => {
        this.roomMapMd = res;
      })
      this.roomOrderService.get(id).subscribe((data: RoomOrder) => {
        this.roomOrderModel = data;
        console.log(data.checkOut?.split('T')[0]);
        console.log(new Date().toLocaleTimeString('vi-VN'));
        console.log(new Date().toISOString());
        this.idDatPhongNow = id;
        this.isVisibleCheckOut = true;
      });
      return;
    }
    if(dateCheckOut.getDay() - dateCheckIn.getDay() > 1){
      if((this.roomModel.checkOut??'').split('T')[0] > new Date().toISOString().split('T')[0]){
       if((Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12) >= 1){
        console.log(Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12);
        const timeDiff = Math.abs(new Date(this.roomModel.checkOut||'').getTime() - new Date().getTime());
        this.soNgayCheckOutSom = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;
        }
        if((Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12) < 1){
          console.log(Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12);
          const timeDiff = Math.abs(new Date(this.roomModel.checkOut||'').getTime() - new Date().getTime());
          this.soNgayCheckOutSom = Math.ceil(timeDiff / (1000 * 3600 * 24));
        }
        console.log(this.roomModel.checkOut);
        this.roomService.getOneMapping(this.roomModel.id).subscribe(res => {
          this.roomMapMd = res;
        })
        this.roomOrderService.get(id).subscribe((data: RoomOrder) => {
          this.roomOrderModel = data;
          this.idDatPhongNow = id;
        });
      }
    }
    setTimeout(() => {
      if(this.soNgayCheckOutSom > 0){
        this.isVisibleCheckoutSom = true;
        return;
      }

    this.roomService.getOneMapping(this.roomModel.id).subscribe(res => {
      this.roomMapMd = res;
    })
    this.roomOrderService.get(id).subscribe((data: RoomOrder) => {
      this.roomOrderModel = data;
      console.log(data.checkOut?.split('T')[0]);
      console.log(new Date().toLocaleTimeString('vi-VN'));
      console.log(new Date().toISOString());
      this.idDatPhongNow = id;
      this.isVisibleCheckOut = true;
    });
    }, 500)
    // this.roomManagerService.detailCheckIn(id).subscribe((data: CheckInDetailModel) => {
    //     this.checkInDetail = data;
    // })
    // setTimeout(() =>{
    //     console.log(this.checkInDetail);
    // }, 1000)
  }

  okCheckOutSom(){
    this.billService.updateTienHoanLai(this.idHoaDon, this.soNgayCheckOutSom*this.roomModel.giaPhong).subscribe({})
    this.billService.updateStatusRoomOrder(this.idDatPhongNow, 3).subscribe({})
    this.mess.success('Check-out thành công!');
    this.isVisibleCheckoutSom = false;
    this.isVisibleListDP = false;
    this.isVisible = false;
    this.router.navigate(['/admin/room-order-manager']);
    setTimeout(() => {
      this.viewRoom(this.idDatPhongNow, this.idHoaDon, this.idDatPhongNow);
    }, 1000)
    setTimeout(() => {
      this.billService.getDatPhongByHoaDon(1, 50, this.idHoaDon).subscribe(res => {
        if (res && res.content) {
          for(let x = 0; x < res.content.length;x++){
            if(res.content[x].trangThai != 3 && res.content[x].trangThai != 0){
              this.listRoomOfBill.push(res.content[x]);
            }
          }
        }
      })
    }, 1500)
    setTimeout(() => {
      if(this.listRoomOfBill.length == 0){
        this.isVisibleXacNhanTT = true;
      }
    }, 2000)
  }

  cancelCheckOutSom(){
    this.isVisibleCheckoutSom = false;
  }

  cancel(): void {
    this.mess.info('click cancel');
  }

  confirm(): void {
    this.mess.info('click confirm');
  }

  //Check-out
  isVisibleXacNhanTT = false;
  createCheckOut(){
      if(this.roomOrderModel.checkOut?.split('T')[0] == this.date.toISOString().split('T')[0]){
        if((Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12) > 0){
          this.thoiGianMuon = Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12;
          if((Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12) >= 6){
            console.log(Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12);
            this.tienPhat = this.roomMapMd.giaTheoNgay ?? 0;
            console.log('1');
          }
          if((Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12) >= 3 &&
             (Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12) < 6){
              console.log(Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12);
              this.tienPhat = (this.roomMapMd.giaTheoNgay ?? 0)*0.5;
            console.log('2');
          }
          if((Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12) >= 1 &&
            (Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12) < 3){
            console.log(Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12);
            this.tienPhat = (this.roomMapMd.giaTheoNgay ?? 0)*0.3;
            console.log('3');
          }
          this.isVisibleCheckOutLater = true;
          return;
        }
      }
      this.billService.updateStatusRoomOrder(this.idDatPhongNow, 3).subscribe({})
      this.mess.success('Check-out thành công!');
      this.isVisibleCheckOut = false;
      this.isVisibleListDP = false;
      this.isVisible = false;
      setTimeout(() => {
        this.viewRoom(this.idDatPhongNow, this.idHoaDon, this.idDatPhongNow);
      }, 1000)
      setTimeout(() => {
        this.billService.getDatPhongByHoaDon(1, 50, this.idHoaDon).subscribe(res => {
          if (res && res.content) {
            for(let x = 0; x < res.content.length;x++){
              if(res.content[x].trangThai != 3 && res.content[x].trangThai != 0){
                this.listRoomOfBill.push(res.content[x]);
              }
            }
          }
        })
      }, 1500)
    setTimeout(() => {
      if(this.listRoomOfBill.length == 0){
        this.isVisibleXacNhanTT = true;
      }
    }, 2000)
  }

  handleCancelThanhToan(){
    this.isVisibleXacNhanTT = false;
  }

  cancelCheckOutLater(){
    this.isVisibleCheckOutLater = false;
  }

  okCheckOutLater(){
    this.billService.updateTienPhat(this.idHoaDon, this.tienPhat).subscribe({})
    this.billService.updateStatusRoomOrder(this.idDatPhongNow, 3).subscribe({})
    this.mess.success('Check-out thành công!');
    this.isVisibleCheckOut = false;
    this.isVisibleListDP = false;
    this.isVisible = false;
    this.isVisibleCheckOutLater = false;
    this.router.navigate(['/admin/room-order-manager']);
    setTimeout(() => {
      this.viewRoom(this.idDatPhongNow, this.idHoaDon, this.idDatPhongNow);
    }, 1000)
  }

  handleCancelCheckIn() {
    this.isVisibleCheckIn = false;
  }

  handleCancelCheckOut() {
    this.isVisibleCheckOut = false;
  }

  searchRoom(position: NzNotificationPlacement) {
    const checkInElement = (document.getElementById('checkIn') as HTMLInputElement).value;
    const checkOutElement = (document.getElementById('checkOut') as HTMLInputElement).value;
    if (checkInElement == '' && checkOutElement == '') {
      this.notification.blank(
        'Vui lòng nhập đầy đủ ngày nhận phòng và ngày trả phòng!',
        '',
        {nzPlacement: position}
      );
      return;
    }
    if((document.getElementById('checkIn') as HTMLInputElement).value >= (document.getElementById('checkOut') as HTMLInputElement).value){
      this.mess.warning('Thời gian không hợp lệ!');
      return;
    }
    this.checkInSearch = checkInElement;
    this.checkOutSearch = checkOutElement;
    const queryParams = {
      checkInDate: checkInElement,
      checkOutDate: checkOutElement,
    };
    this.router.navigate(['/admin/room-order-manager/'], {queryParams});
    this.soPhongTrong = 0;
    this.roomService.getRoomMapping(checkInElement, checkOutElement).subscribe(res => {
      this.roomMapping = res;
      this.soPhongTrong = 0;
      for(let x = 0;x <= res.length;x++){
        if(res[x].soPhong == 0){
          this.soPhongTrong++;
        }
      }
    })
  }

  showListDP(id: any) {
    this.idPhong = id;
    setTimeout(() => {
      this.isVisibleSpin = true;
    }, 500)
    setTimeout(() => {
      this.isVisibleSpin = false;
      this.isVisibleListDP = true;
      this.roomService.getOneMapping(id).subscribe(res => {
        this.roomMapMd = res;
      })
      const checkInElement = (document.getElementById('checkIn') as HTMLInputElement).value;
      const checkOutElement = (document.getElementById('checkOut') as HTMLInputElement).value;
      if (checkOutElement != '' && checkOutElement != '') {
        this.roomManagerService.getDPMappingBySearch(id, checkInElement, checkOutElement).subscribe(res => {
          this.room = res;
          for(let x = 0;x < res.length;x++){
            if(res[x].trangThai != 3 && res[x].trangThai != 1){
                this.checkList = 1;
            }
            if(res[x].trangThai == 3 || res[x].trangThai == 1){
              this.checkList = 0;
            }
          }
          console.log(this.checkList)
        })
      } else {
        this.roomManagerService.getDPMappingBySearch(id, this.date.toISOString().split('T')[0], this.date.toISOString().split('T')[0]).subscribe(res => {
          this.room = res;
          for(let x = 0;x < res.length;x++){
            if(res[x].trangThai !== 3){
              this.checkList = 1;
            }
            if(res[x].trangThai === 3){
              this.checkList = 0;
            }
          }
          console.log(this.checkList)
        })
      }
    }, 2000)

  }

  handleCancelListDP() {
    this.isVisibleListDP = false;
  }

  showOrderRoom() {
    if((document.getElementById('checkIn') as HTMLInputElement).value == '' || (document.getElementById('checkOut') as HTMLInputElement).value == ''){
      this.mess.warning('Vui lòng điền ngày nhận hoặc ngày trả');
      return;
    } else {
      if ((document.getElementById('checkIn') as HTMLInputElement).value < new Date().toISOString().split('T')[0]) {
        this.mess.warning('Đã quá thời gian đặt phòng!');
        return;
      }
      if ((document.getElementById('checkIn') as HTMLInputElement).value > (document.getElementById('checkOut') as HTMLInputElement).value) {
        this.mess.warning('Thời gian đặt phòng không hợp lệ!');
        return;
      }
    }
    if (this.checkInSearch < new Date().toISOString().split('T')[0] ||
      this.checkOutSearch < new Date().toISOString().split('T')[0]) {
      this.mess.warning('Đã quá thời gian đặt phòng!');
      return;
    }
    console.log(this.roomMapMd.giaTheoNgay);
    console.log(this.calculateTotalDays());
    this.isVisibleOrderForm = true;
    // console.log(Number.parseInt((document.getElementById('tongGia') as HTMLInputElement).value));
  }

  cancelOrderForm() {
    this.isVisibleOrderForm = false;
  }

  deleteBill() {
    const data = {
      ngayThanhToan: moment(this.checkInSearch),
      tongTien: (document.getElementById('tongGia') as HTMLInputElement).value,
      idKhachHang: this.idKhach
    }
    this.billService.deleteBill(data).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateTongTien(): void {
    const data = {
      idKhachHang: this.idKhach,
      tongTien: (document.getElementById('tongGia') as HTMLInputElement).value,
    }
    this.billService.updateTongTien(data).subscribe((res: any) => {
      console.log(res);
    })
  }

  checkAge() {
    const birthday = new Date(this.ngaySinh);
    const today = new Date();
    const minAge = 15;

    birthday.setFullYear(birthday.getFullYear() + minAge);

    if (birthday <= today) {
      this.isAboveFifteen = true;
      this.mess.warning('Ngày sinh không hợp lệ');
    }
  }

  saveOrderForm() {
    if ((document.getElementById('cccd') as HTMLInputElement).value.length !== 12 && (document.getElementById('cccd') as HTMLInputElement).value.length !== 9) {
      this.mess.warning('Số CCCD phải có độ dài 9 hoặc 12 chữ số');
      return;
    }
    if((document.getElementById('sdt') as HTMLInputElement).value.length !== 10){
      this.mess.warning('Số định dạng 10 chữ số');
      return;
    }

    const data = {
      hoTen: (document.getElementById('ten') as HTMLInputElement).value,
      sdt: (document.getElementById('sdt') as HTMLInputElement).value,
      cccd: (document.getElementById('cccd') as HTMLInputElement).value,
      ngaySinh: (document.getElementById('ngaySinh') as HTMLInputElement).value,
    }
    setTimeout(() => {
      this.customerService.create(data).subscribe((res: any) => {
        console.log(res)
      })
    }, 300)
    setTimeout(() => {
      this.customerService.getIdByCCCD(data.cccd).subscribe((res: any) => {
        this.idKhach = res;
        const data2 = {
          tongTien: 0,
          tienPhong: 0,
          idKhachHang: res,
          trangThai: 3
        }
        data2.tongTien = this.calculateTotalDays() * (this.roomMapMd.giaTheoNgay ?? 0) + this.tongTien;
        data2.tienPhong = this.calculateTotalDays() * (this.roomMapMd.giaTheoNgay ?? 0) + this.tongTien;
        data2.idKhachHang = res
        this.billService.createOrUpdateTaiQuay(data2).subscribe((res2: any) => {
          console.log(res2);
        })
      })
    }, 1000)
    // setTimeout(async () => {
    //   const data2 = {
    //     tongTien: 0,
    //     idKhachHang: this.idKhach,
    //     trangThai: 3
    //   }
    //   data2.tongTien = this.calculateTotalDays() * (this.roomMapMd.giaTheoNgay ?? 0) + this.tongTien;
    //   data2.idKhachHang = this.idKhach
    //   this.billService.createOrUpdateTaiQuay(data2).subscribe((res: any) => {
    //     console.log(res);
    //   })
    // }, 1500)
    if (this.roomOrderForm.valid) {
      setTimeout(() => {
        const dataDatPhong = this.roomOrderForm.value;
        dataDatPhong.idKhachHang = this.idKhach;
        if (this.customerModel == null || this.customerModel.giamGia === 0) {
          console.log('khong ton tai');
          dataDatPhong.tongGia = this.calculateTotalDays() * (this.roomMapMd.giaTheoNgay ?? 0);
        } else if (this.customerModel.giamGia !== 0) {
          console.log('ton tai');
          dataDatPhong.tongGia = this.calculateTotalDays() * (this.roomMapMd.giaTheoNgay ?? 0) * (100 - this.customerModel.giamGia) / 100;
        }
        // const formatDate = (date: Date): string => {
        //   const year = date.getFullYear();
        //   const month = String(date.getMonth() + 1).padStart(2, '0');
        //   const day = String(date.getDate()).padStart(2, '0');
        //   return `${year}-${month}-${day}`;
        // };
        dataDatPhong.idPhong = this.roomMapMd.id;
        dataDatPhong.checkIn = moment(this.checkInSearch);
        dataDatPhong.checkOut = moment(this.checkOutSearch);
        // data.idVourcher = (document.getElementById('voucher') as HTMLInputElement).value;
        dataDatPhong.ghiChu = (document.getElementById('ghiChu') as HTMLInputElement).value;
        const sub = this.roomManagerService.datPhongTaiQuay(dataDatPhong)
          .pipe(first())
          .subscribe((res) => {
              if (res?.code === AppConstants.API_SUCCESS_CODE) {
                console.log('Thành công')
              } else {
                this.updateTongTien();
                this.deleteBill();
                const msg: any = res.entityMessages[0];
                this.notification.warning(`${msg.errorMessage}`, "");
                return;
              }
            },
          );
        this.unsubscribe.push(sub);
        for(let x = 0;x < this.dataList.length;x++) {
          const data3 = this.roomOrderForm.value;
          data3.idKhachHang = this.idKhach;
          if (this.customerModel == null || this.customerModel.giamGia === 0) {
            console.log('khong ton tai');
            data3.tongGia = this.calculateTotalDays() * (this.dataList[x].giaTheoNgay ?? 0);
          } else if (this.customerModel.giamGia !== 0) {
            console.log('ton tai');
            data3.tongGia = this.calculateTotalDays() * (this.dataList[x].giaTheoNgay ?? 0) * (100 - this.customerModel.giamGia) / 100;
          }
          data3.idPhong = this.dataList[x].id;
          data3.checkIn = moment(this.checkInSearch);
          data3.checkOut = moment(this.checkOutSearch);
          data3.ghiChu = (document.getElementById('ghiChu') as HTMLInputElement).value;
          const sub2 = this.roomManagerService.datPhongTaiQuay(data3)
            .pipe(first())
            .subscribe((res) => {
                if (res?.code === AppConstants.API_SUCCESS_CODE) {
                  console.log('Thành công');
                } else {
                  const msg: any = res.entityMessages[0];
                  this.notification.warning(`${msg.errorMessage}`, "");
                  this.updateTongTien();
                  return;
                }
              },
            );
          this.unsubscribe.push(sub2);
        }
        this.mess.success('Đặt phòng thành công!');
        const queryParams = {
          checkInDate: (document.getElementById('checkIn') as HTMLInputElement).value,
          checkOutDate: (document.getElementById('checkOut') as HTMLInputElement).value,
        };
        this.router.navigate(['/admin/room-order-manager/'], {queryParams});
        this.getRoomMapping();
        this.isVisibleOrderForm = false;
        this.isVisibleListDP = false;
        this.isVisibleXacNhanDatTruoc = false;
        this.isVisibleListCheckOut = false;
      }, 3000)

    }
  }

  handleByCCCD() {
    const cccd = (document.getElementById('cccd') as HTMLInputElement).value;
    this.roomManagerService.getKH(cccd).subscribe((res: any) => {
      this.customerModel = res;
      this.hoTen = res.hoTen;
      this.sdt = res.sdt;
      (document.getElementById('ngaySinh') as HTMLInputElement).value = res.ngaySinh;
    })
  }

  parseDateString(dateString: string): Date | null {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  changeNgay() {
    console.log((document.getElementById('ngaySinh') as HTMLInputElement).value);
  }

  calculateTotalDays(): number {
    // @ts-ignore
    const checkInDate = this.checkInSearch;
    // @ts-ignore
    const checkOutDate = this.checkOutSearch;

    if (checkInDate && checkOutDate) {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
      return Math.round(differenceInMilliseconds / millisecondsPerDay);
    }

    return 0;
  }

  // Đặt dịch vụ
  showFormOrderDichVu(id: any, soLuong: any) {
    this.isVisibleDichVu = true;
    this.roomSerivceService.get(id).subscribe(res => {
      this.roomSvModel = res;
    })
    this.soLuongDichVu = soLuong;
    this.idDichVu = id;
  }

  cancelDichVu() {
    this.isVisibleDichVu = false;

  }

  okDichVu() {
    setTimeout(() => {
      const soLuong = document.getElementById('soLuong') as HTMLInputElement;
      if(this.soLuongDichVu < Number.parseInt(soLuong.value)){
        this.mess.warning('Số lượng trong kho không đủ');
        return;
      }
      const data1 = {
        idDichVu: this.idDichVu,
        idDatPhong: this.idDatPhongNow,
        ghiChu: '',
        giaDichVu: this.roomSvModel.giaDichVu,
        trangThai: 1,
        soLuong: Number.parseInt(soLuong.value)
      }
      this.billService.addDichVu(data1).subscribe((res: any) => {
        console.log(res)
      })
      this.billService.updateTienDichVu(this.idHoaDon, data1.giaDichVu*data1.soLuong).subscribe(res =>{
      })
      this.roomSerivceService.updateSoLuong(this.idDichVu, Number.parseInt(soLuong.value)).subscribe(res =>{
      })
    }, 500)
    setTimeout(() => {
      this.isVisibleDichVu = false;
      this.billService.getAllChiTietDichVuByDatPhong(1, 15, this.idDatPhongNow).subscribe(res => {
        this.detailsService = res.content;
        this.tongTienDichVu = 0;
        for(let x = 0;x < res.content.length;x++) {
          this.tongTienDichVu+=(res.content[x].giaDichVu*res.content[x].soLuong);
        }
      })
      this.roomManagerService.getDPById(this.idDatPhongNow).subscribe(res => {
        this.roomModel = res;
      })
      this.roomSerivceService.getRoomSerivceList(1, 15).subscribe(res => {
        if (res && res.content) {
          this.roomServiceModel = res.content;
        }
      })
    }, 1000)
  }

  getTongTienDichVu(idDP: any){
    this.tongTienDichVu = 0;
    this.billService.getAllChiTietDichVuByDatPhong(1, 15, idDP).subscribe(res => {
      for(let x = 0;x < res.content.length;x++) {
        this.tongTienDichVu+=(res.content[x].giaDichVu*res.content[x].soLuong);
      }
    })
  }

  // Đặt thêm phòng
  state: Map<number, boolean> = new Map();
  isVisibleMoreRoom = false;
  roomMap2: RoomMappingModel[] = [];
  dataList: RoomMappingModel[] = [];

  showMoreRoom() {
    this.isVisibleMoreRoom = true;
    this.route.queryParams.subscribe(params => {
      if (params['checkInDate'] && params['checkOutDate']) {
        const checkIn = params['checkInDate'];
        const checkOut = params['checkOutDate'];
        console.log(new Date(checkIn));
        console.log(new Date(checkOut));
        this.checkInSearch = new Date(checkIn);
        this.checkOutSearch = new Date(checkOut);
        this.roomService.getListThemPhong(this.roomMapMd.id, checkIn, checkOut).subscribe(res => {
          this.roomMap2 = res;
        })
      } else if (!params['checkInDate'] && !params['checkOutDate']) {
        this.checkInSearch = this.date.toISOString();
        this.checkOutSearch = new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString();
        console.log(this.date.toISOString());
        console.log(new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString());
        this.roomService.getListThemPhong(this.roomMapMd.id, this.date.toISOString().split('T')[0], new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString().split('T')[0]).subscribe(res => {
          this.roomMap2 = res;
        })
      }
    });
  }

  showListMoreRoom = false;

  addRoomToList(value: any, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.roomService.getOneMapping(value).subscribe(res => {
        this.dataList.push(res);
      })
      console.log(this.dataList)
    }
    if (!checkbox.checked) {
      // setTimeout(() => {
      //   this.roomMd = res;
      // }, 100)
      // setTimeout(() => {
      //   console.log(this.dataList.indexOf(this.roomMd) + ' mã phòng ' + res.ma);
      //   this.dataList.splice(this.dataList.indexOf(this.roomMd), 1);
      // }, 200)
      for (var x = 0; x <= this.dataList.length; x++) {
        if (this.dataList[x].id === value) {
          this.dataList.splice(x, 1);
        }
      }
      this.state.set(value, !checkbox.checked);
      console.log(this.dataList)
    }
  }

  cancelMoreRoom() {
    this.isVisibleMoreRoom = false;
    this.dataList = [];

  }

  okMoreRoom() {
    this.showListMoreRoom = true;
    this.isVisibleMoreRoom = false;
    for (let x = 0;x <= this.dataList.length;x++){
      this.tongTien += (this.calculateTotalDays() * (this.dataList[x].giaTheoNgay ?? 0));
    }
  }

  // Thanh toán hóa đơn

  updateBillStatus(id: any, idDatPhong: any){
    if(Number.parseInt(this.roomModel.giamGia) >= 1000){
      this.isVisibleTichDiem = true;
      return;
    }
    this.billService.updateStatus(id, 5).subscribe({
      next: (res) => {
        this.currentBill.trangThai = 5;
        console.log(res);
      },
    })
    this.customerService.updateTichDiem(String((this.roomModel.tongTien ?? 0)*0.05), this.roomModel.idKhachHang).subscribe(res => {
      console.log(res);
    })
    this.mess.success('Thanh toán thành công!');
    this.isVisibleXacNhanTT = false;
    this.isVisibleListDP = false;
    this.isVisible = false;
    setTimeout(() => {
      this.viewRoom(idDatPhong, id, idDatPhong);
    }, 1000)
  }


  showFormChangeRoom(tenLoaiPhong: any, id: any, checkIn: any, checkOut: any){
      this.roomService.getListDoiPhong(tenLoaiPhong, id, checkIn, checkOut).subscribe(res => {
        this.listRoomChange = res;
      })
    this.isVisibleXacNhanDoi = true;
  }

  okShowListChange(){
    this.isVisibleXacNhanDoi = false;
    this.isVisibleChangeRoom = true;
  }

  cancelShowListChange(){
    this.isVisibleXacNhanDoi = false;
    this.isVisibleChangeRoom = false;
  }

  doiPhong(idPhong: any){
    this.roomManagerService.doiPhongById(idPhong, this.idDatPhongNow).subscribe(res => {
      this.mess.success("Đổi phòng thành công!");
      this.isVisibleXacNhanDoi = false;
      this.isVisibleChangeRoom = false;
      this.isVisible = false;
      this.isVisibleOrderForm = false;
      this.isVisibleListDP = false;
    })

    setTimeout(() => {
      this.getRoomMapping();
      this.viewRoom(this.idDatPhongNow, this.idHoaDon, this.idDatPhongNow);
    }, 2000)
  }



  getSoLanDatPhong(id: any){
     this.roomService.getSoLanDatPhong(id, this.checkInSearch.split('T')[0], this.checkOutSearch.split('T')[0]).subscribe(res => {
       console.log(res);
    })
  }

  generatePDF(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Charset': 'UTF-8'
    });
    this.http.get(`rpc/bds/hoa-don/generate-hoa-don?id=${id}`, {headers: headers, responseType: 'blob'})
      .subscribe(response => {
        this.billService.get(id).subscribe(res => {
          const blob = new Blob([response], {type: 'application/pdf'});
          const url = window.URL.createObjectURL(blob);
          window.open(url);
          const downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.download = 'hoa_don_dat_phong_' + res.ma + '.pdf';
          downloadLink.click();
        })
      });
  }

  getListCheckOutToDay(){
    this.checkInSearch = this.date.toISOString();
    this.checkOutSearch = new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString();
    this.roomManagerService.getListCheckOutToday(new Date().toISOString().split('T')[0]).subscribe(res => {
      this.listCheckOutToDay = res;
    })
    // this.isVisibleListCheckOut = true;
  }

  cancelListCheckOutToDay(){
    this.isVisibleListCheckOut = false;
  }

  xacNhanDatTruoc(id: any){
    this.roomService.getOneMapping(id).subscribe(res => {
      this.roomMapMd = res;
    })
    this.roomManagerService.getRoomCheckInToday(id, new Date().toISOString().split('T')[0]).subscribe(res => {
      this.checkInToday = res;
    })
    this.isVisibleXacNhanDatTruoc = true;
  }

  cancelDatTruoc() {
    this.isVisibleXacNhanDatTruoc = false;
  }


  showOrderRoom2() {
    if(this.checkInToday){
      this.mess.warning('Phòng này đã có khách đặt trước!')
      this.isVisibleXacNhanDatTruoc = false;
      return;
    }
    console.log(this.calculateTotalDays());
    this.isVisibleOrderForm = true;
    // console.log(Number.parseInt((document.getElementById('tongGia') as HTMLInputElement).value));
  }

  showFormCheckoutMuon(id: any){
    this.roomService.getOneMapping(this.roomModel.id).subscribe(res => {
      this.roomMapMd = res;
    })
    this.roomOrderService.get(id).subscribe((data: RoomOrder) => {
      this.roomOrderModel = data;
      this.idDatPhongNow = id;
      this.isVisibleCheckOutMuon = true;
    });
  }

  cancelCheckOutMuon(){
    this.isVisibleCheckOutMuon = false;
  }

  okCheckOutMuon(){
    if(Number.parseInt((document.getElementById("soGioCheckOut") as HTMLInputElement).value) > 10){
      this.mess.warning('Chỉ được check-out muộn tối đa 10 tiếng');
      return;
    }
    this.tienPhat = Number.parseInt((document.getElementById("soGioCheckOut") as HTMLInputElement).value) * (this.roomMapMd.giaTheoNgay ?? 0) * 0.15;
    this.billService.updateTienPhat(this.idHoaDon, Number.parseInt((document.getElementById("soGioCheckOut") as HTMLInputElement).value) * (this.roomMapMd.giaTheoNgay ?? 0) * 0.15).subscribe({})
    this.billService.updateStatusRoomOrder(this.idDatPhongNow, 5).subscribe({})
    this.mess.success('Check-out muộn thành công!');
    this.isVisibleCheckOut = false;
    this.isVisibleListDP = false;
    this.isVisible = false;
    this.isVisibleCheckOutMuon = false;
    this.router.navigate(['/admin/room-order-manager']);
    setTimeout(() => {
      this.viewRoom(this.idDatPhongNow, this.idHoaDon, this.idDatPhongNow);
    }, 1000)
  }

  cancelTichDiem(){
    this.isVisibleTichDiem = false;
  }

  okTichDiem(id: any, idDatPhong: any){
    if((document.getElementById('soDiem') as HTMLInputElement).value == '' || Number.parseInt((document.getElementById('soDiem') as HTMLInputElement).value) < 1000){
      this.mess.warning('Số điểm tối thiểu là 1000!');
      return;
    }
    if(Number.parseInt((document.getElementById('soDiem') as HTMLInputElement).value) > Number.parseInt(this.roomModel.giamGia)){
      this.mess.warning('Số điểm của bạn không đủ, vui lòng nhập lại!');
      return;
    }
    if(Number.parseInt((document.getElementById('soDiem') as HTMLInputElement).value) > ((this.roomModel.tongTien??0)/10)){
      this.mess.warning('Không thể giảm quá 10% hóa đơn(tối đa ' + (this.roomModel.tongTien??0)/10 + 'VNĐ');
      return;
    }
    this.billService.updateTienTichDiem(id, Number.parseInt((document.getElementById('soDiem') as HTMLInputElement).value)).subscribe({
      next: (res) => {
        this.currentBill.trangThai = 5;
        console.log(res);
      },
    })
    this.customerService.tinhLaiGiamGia(String(Number.parseInt(this.roomModel.giamGia) - Number.parseInt((document.getElementById('soDiem') as HTMLInputElement).value)), this.roomModel.idKhachHang).subscribe(res => {
      console.log(res);
    })
    this.mess.success('Thanh toán thành công!');
    this.isVisibleXacNhanTT = false;
    this.isVisibleListDP = false;
    this.isVisible = false;
    this.isVisibleTichDiem = false;
    setTimeout(() => {
      this.viewRoom(idDatPhong, id, idDatPhong);
    }, 1000)
    this.isVisibleTichDiem = false;
  }

  thanhToanKhongTichDiem(id: any, idDatPhong: any){
    this.billService.updateStatus(id, 5).subscribe({
      next: (res) => {
        this.currentBill.trangThai = 5;
        console.log(res);
      },
    })
    this.customerService.updateTichDiem(String((this.roomModel.tongTien ?? 0)*0.02), this.roomModel.idKhachHang).subscribe(res => {
      console.log(res);
    })
    this.mess.success('Thanh toán thành công!');
    this.isVisibleXacNhanTT = false;
    this.isVisibleListDP = false;
    this.isVisible = false;
    this.isVisibleTichDiem = false;
    setTimeout(() => {
      this.viewRoom(idDatPhong, id, idDatPhong);
    }, 1000)
  }

  showModalHuyPhong(id: any): void {
    this.isVisibleHuyPhong = true;
    this.roomOrderService.get(id).subscribe((data: RoomOrder) => {
        this.currentRoomOrder = data;
    });
  }

  handleOkHuyPhong(): void {
    this.isOkLoading = true;
    this.deleteRoom();
    setTimeout(() => {
      this.isVisibleHuyPhong = false;
      this.isOkLoading = false;
      this.isVisibleListDP = false;
      this.isVisible = false;
    }, 500);
    setTimeout(() => {
      this.viewRoom(this.currentRoomOrder.id, this.currentRoomOrder.idHoaDon, this.currentRoomOrder.id);
    }, 1000)
  }

  handleCancelHuyPhong(): void {
    this.isVisibleHuyPhong = false;
  }

  deleteRoom(): void {
    this.roomOrderService.updateStatus(this.currentRoomOrder.id, 0)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.body.code == "Failed") {
            this.mess.error(res.body.message);
          } else {
            this.currentRoomOrder.trangThai = 0
            this.successMessage();
          }
        },
      });
    setTimeout(() => {
      let checkCount = 0;
      this.billService.getDatPhongByHoaDon(1, 15, this.currentRoomOrder.idHoaDon).subscribe(res => {
        // this.roomByHD = res.content;
        for(let x = 0;x < res.content.length;x++){
          if(res.content[x].trangThai !== 0){
            checkCount++;
          }
        }
        console.log(checkCount);
        if(checkCount === 0){
          this.billService.updateStatus(this.currentRoomOrder.idHoaDon, 4).subscribe(res => {
            console.log(res);
          })
        }
      })
    }, 200)
  }

  successMessage(): void {
    this.mess.success('Hủy phòng thành công');
  }
  huyDichVu(id: any, idDichVu: any, tienDichVu: number, soLuong: number) {
    const idDV = idDichVu;
    const tienDV = tienDichVu;
    const soLuongDV = soLuong
    setTimeout(() => {
      this.billService.huyDichVu(id).subscribe({
        next: (res) => {
          this.mess.success("Hủy dịch vụ thành công");
        },
      })
      this.billService.updateTienDichVu(this.idHoaDon, (-tienDichVu)).subscribe(res => {
      })
      this.roomSerivceService.updateCongSoLuong(idDichVu, soLuong).subscribe(res => {
      })
    }, 500)
    setTimeout(() => {
      this.isVisibleDichVu = false;
      this.billService.getAllChiTietDichVuByDatPhong(1, 15, this.idDatPhongNow).subscribe(res => {
        this.detailsService = res.content;
        this.tongTienDichVu = 0;
        for (let x = 0; x < res.content.length; x++) {
          this.tongTienDichVu += (res.content[x].giaDichVu * res.content[x].soLuong);
        }
      })
      this.roomManagerService.getDPById(this.idDatPhongNow).subscribe(res => {
        this.roomModel = res;
      })
      this.roomSerivceService.getRoomSerivceList(1, 15).subscribe(res => {
        if (res && res.content) {
          this.roomServiceModel = res.content;
        }
      })
    }, 1000)
  }

  handleChangeCccd(cccd: Event): void {
    const inputElement = cccd.target as HTMLInputElement;
    this.cccdValue = inputElement.value;
    if(this.cccdValue == '') {
      this.roomService.getRoomMapping(this.date.toISOString().split('T')[0], new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString().split('T')[0]).subscribe(res => {
        this.roomMapping = res;
      })
    } else {
      this.roomOrderService.listRoomBooks(this.cccdValue).subscribe(res => {
        this.roomMapping = res;
      })
    }
  }

  getRoomToDay2() {
    const localDate = new Date(this.date.getTime() - (this.date.getTimezoneOffset() * 60000));
    const localCheckInDate = localDate.toISOString().split('T')[0];

    const checkOutDate = new Date();
    checkOutDate.setDate(checkOutDate.getDate() + 1);
    const localCheckOutDate = new Date(checkOutDate.getTime() - (checkOutDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

    (document.getElementById('checkIn') as HTMLInputElement).value = localCheckInDate;
    (document.getElementById('checkOut') as HTMLInputElement).value = localCheckOutDate;

    this.router.navigate(['/admin/room-order-manager/']);
    this.roomService.getRoomMapping(localCheckInDate, localCheckOutDate).subscribe(res => {
      this.roomMapping = res;
    });

    const queryParams = {
      checkInDate: localCheckInDate,
      checkOutDate: localCheckOutDate,
    };
    this.router.navigate(['/admin/room-order-manager/'], { queryParams });
  }

  showFormTimPhong(){
    this.isVisibleTimPhong = true;
  }

  handleCancelTimPhong(){
    this.isVisibleTimPhong = false;
  }

  handleOkTimPhong(){
    this.isOkLoadingTimPhong = true;
    const cccdTim = (document.getElementById('cccdTimPhong') as HTMLInputElement).value;
    const checkInTim = (document.getElementById('checkInTimPhong') as HTMLInputElement).value;
    this.roomManagerService.getDPMappingByCheckInAndCCCD(checkInTim, cccdTim).subscribe(res => {
      this.listRoomByCCCD = res;
    })
    setTimeout(() => {
      this.isVisibleTimPhong = false;
      this.isOkLoadingTimPhong = false;
      this.isVisibleListTimPhong = true;
    }, 500)
  }

  cancelListTimPhong(){
    this.isVisibleListTimPhong = false;
  }

  getDaysBetweenCheckInAndCheckOut(): number {
    if (!this.roomModel.checkIn || !this.roomModel.checkOut) {
      return 0;
    }
    const checkInDate = new Date(this.roomModel.checkIn);
    const checkOutDate = new Date(this.roomModel.checkOut);

    // Đặt thời gian của cả hai ngày về 00:00:00
    checkInDate.setHours(0, 0, 0, 0);
    checkOutDate.setHours(0, 0, 0, 0);

    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();

    // Chia số mili giây để lấy ra số ngày
    return timeDiff / (1000 * 3600 * 24);
  }

  checkAPICheckOut = false;
  updateCheckOut(event: Date): void {
    if (event) {
      if (this.roomModel.checkIn) {
        const checkInDate = new Date(this.roomModel.checkIn);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (event < checkInDate) {
          this.notification.error("Ngày trả phòng không thể nhỏ hơn ngày nhận phòng", "");
        } else if (event < today) {
          this.notification.error("Ngày trả phòng không thể nhỏ hơn ngày hôm nay", "");
        } else {
          // Chuyển đổi đối tượng Date thành định dạng yyyy-MM-dd
          const formatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          };

          const formattedCheckOut = formatDate(event);
          const formattedCheckIn = formatDate(new Date(this.roomModel.checkIn));

          this.roomOrderService.updateCheckout(
            this.roomModel.idDatPhong,
            formattedCheckOut,
            formattedCheckIn,
            this.roomModel.id
          ).subscribe({
            next: res => {
              this.checkAPICheckOut = true;
              this.notification.success("Cập nhật thành công ngày trả phòng", "");
            },
            error: (errorResponse) => {

              const status = errorResponse.status;
              const errorBody = errorResponse.error || errorResponse.message || "Phòng đã có khách đặt trong ngày đó";

              console.log(errorResponse.response)
              // Log and display error information
              console.error(`Error Status: ${status}`, errorBody);
              this.notification.error(`${errorBody}`, "");
            }
          });
        }
      } else {
        this.notification.error("Ngày nhận phòng không hợp lệ", "");
      }
    }
  }

  listCustomers(): void {
    this.roomOrderService.listCustomerUseRoom().subscribe(res => {
      this.customerUseRoom = res.body;
    });
  }

  protected readonly formatDate = formatDate;
}
