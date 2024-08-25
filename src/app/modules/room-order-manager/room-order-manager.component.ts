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
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
      ngaySinhCheckIn: ['', Validators.required],
      gioiTinhCheckIn: [0],
      trangThaiCheckIn: [1],
      ghiChuCheckIn: ['', Validators.required]
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
    this.roomService.getRoomMapping(this.date.toISOString().split('T')[0], this.date.toISOString().split('T')[0]).subscribe(res => {
      this.roomMapping = res;
    })
  }

  getRoomMapping() {
    this.route.queryParams.subscribe(params => {
      if (params['checkInDate'] && params['checkOutDate']) {
        const checkIn = params['checkInDate'];
        const checkOut = params['checkOutDate'];
        (document.getElementById('checkIn') as HTMLInputElement).value = checkIn;
        (document.getElementById('checkOut') as HTMLInputElement).value = checkOut ;
        this.checkInSearch = new Date(checkIn.toLocaleString());
        this.checkOutSearch = new Date(checkOut.toLocaleString());
        this.roomService.getRoomMapping(checkIn, checkOut).subscribe(res => {
          this.roomMapping = res;
          this.soPhongTrong = 0;
          for(let x = 0;x <= res.length;x++){
            if(res[x].soPhong == 0){
              this.soPhongTrong++;
            }
          }
        })
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
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2) => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    });
    this.dateNow = new Date().toISOString();
    this.getRoomMapping();
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
    this.billService.updateStatusRoomOrder(this.idDatPhongNow, 2).subscribe({})
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
    if((this.roomModel.checkOut??'').split('T')[0] > new Date().toISOString().split('T')[0]){
      console.log(this.roomModel.checkOut);
      const timeDiff = Math.abs(new Date(this.roomModel.checkOut||'').getTime() - new Date().getTime());
      this.soNgayCheckOutSom = Math.ceil(timeDiff / (1000 * 3600 * 24)) - 1;
      this.roomService.getOneMapping(this.roomModel.id).subscribe(res => {
        this.roomMapMd = res;
      })
      this.roomOrderService.get(id).subscribe((data: RoomOrder) => {
        this.roomOrderModel = data;
        this.idDatPhongNow = id;
      });
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

  createCheckOut(){
      // if(this.roomOrderModel.checkOut?.split('T')[0] == this.date.toISOString().split('T')[0]){
      //   if((Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12) > 0){
      //     this.thoiGianMuon = Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12;
      //     if((Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12) > 2){
      //       console.log(Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12);
      //       this.tienPhat = this.roomMapMd.giaTheoNgay ?? 0;
      //     }else{
      //       console.log('op2')
      //       console.log(Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12);
      //       this.tienPhat = (Number.parseInt(new Date().getHours().toLocaleString('vi-VN')) - 12) * (this.roomMapMd.giaTheoNgay ?? 0) * 0.15;
      //     }
      //     this.isVisibleCheckOutLater = true;
      //     return;
      //   }
      // }
      this.billService.updateStatusRoomOrder(this.idDatPhongNow, 3).subscribe({})
      this.mess.success('Check-out thành công!');
      this.isVisibleCheckOut = false;
      this.isVisibleListDP = false;
      this.isVisible = false;
      this.router.navigate(['/admin/room-order-manager']);
      setTimeout(() => {
        this.viewRoom(this.idDatPhongNow, this.idHoaDon, this.idDatPhongNow);
      }, 1000)
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
            if(res[x].trangThai !== 3){
                this.checkList = 1;
            }
            if(res[x].trangThai === 3){
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
    if ((document.getElementById('checkIn') as HTMLInputElement).value < new Date().toISOString().split('T')[0] ||
      (document.getElementById('checkOut') as HTMLInputElement).value < new Date().toISOString().split('T')[0]) {
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

  saveOrderForm() {

    if ((document.getElementById('cccd') as HTMLInputElement).value.length !== 12 && (document.getElementById('cccd') as HTMLInputElement).value.length !== 9) {
      this.mess.warning('Số CCCD phải có độ dài 9 hoặc 12 chữ số');
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
        dataDatPhong.idPhong = this.roomMapMd.id;
        dataDatPhong.checkIn = this.checkInSearch;
        dataDatPhong.checkOut = this.checkOutSearch;
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
  showFormOrderDichVu(id: any) {
    this.isVisibleDichVu = true;
    this.roomSerivceService.get(id).subscribe(res => {
      this.roomSvModel = res;
    })
    this.idDichVu = id;
  }

  cancelDichVu() {
    this.isVisibleDichVu = false;

  }

  okDichVu() {
    setTimeout(() => {
      const soLuong = document.getElementById('soLuong') as HTMLInputElement;
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
    this.isVisibleListCheckOut = true;
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
    this.isVisibleListDP = false;
    this.isVisible = false;
    this.isVisibleTichDiem = false;
    setTimeout(() => {
      this.viewRoom(idDatPhong, id, idDatPhong);
    }, 1000)
  }


  protected readonly formatDate = formatDate;
}
