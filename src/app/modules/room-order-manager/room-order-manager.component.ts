import {Component, OnInit} from '@angular/core';
import {RoomService} from "../room/services/room.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RoomTypeModel} from "../../models/room-type.model";
import {RoomManagerService} from "../room-manager/services/room-manager.service";
import {RoomOrderMappingModel} from "../../models/room-order-mapping.model";
import {formatDate} from "@angular/common";
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
import {first, Observable, Subscription} from "rxjs";
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
    (document.getElementById('checkIn') as HTMLInputElement).value = '';
    (document.getElementById('checkOut') as HTMLInputElement).value = '';
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
        this.checkInSearch = moment(checkIn);
        this.checkOutSearch = moment(checkOut);
        this.roomService.getRoomMapping(checkIn, checkOut).subscribe(res => {
          this.roomMapping = res;
        })
      } else if (!params['checkInDate'] && !params['checkOutDate']) {
        this.checkInSearch = this.date.toISOString();
        this.checkOutSearch = new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString();
        this.roomService.getRoomMapping(this.date.toISOString().split('T')[0], this.date.toISOString().split('T')[0]).subscribe(res => {
          this.roomMapping = res;
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
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2) => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    });
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
        this.mess.warning('Chưa đến ngày check-in!');
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
      this.viewRoom(this.idDatPhongNow, this.idDatPhongNow, this.idHoaDon);
    }, 1000)
  }

  showFormCheckout(id: any){
    this.roomOrderService.get(id).subscribe((data: RoomOrder) => {
      this.roomOrderModel = data;
      this.idDatPhongNow = id;
      this.isVisibleCheckOut = true;
    });
    this.roomManagerService.detailCheckIn(id).subscribe((data: CheckInDetailModel) => {
        this.checkInDetail = data;
    })
    setTimeout(() =>{
        console.log(this.checkInDetail);
    }, 1000)
  }

  createCheckOut(){
    const data = this.formCheckOut.value;
    data.idDatPhong = this.idDatPhongNow;
    if(data.cccdCheckOut === this.checkInDetail.cccd && data.hoTenCheckOut === this.checkInDetail.hoTen){
      this.billService.updateStatusRoomOrder(this.idDatPhongNow, 3).subscribe({})
      this.mess.success('Check-out thành công!');
      this.isVisibleCheckOut = false;
      this.isVisibleListDP = false;
      this.isVisible = false;
      this.router.navigate(['/admin/room-order-manager']);
      setTimeout(() => {
        this.viewRoom(this.idDatPhongNow, this.idDatPhongNow, this.idHoaDon);
      }, 1000)
    }else if(data.cccdCheckOut !== this.checkInDetail.cccd || data.hoTenCheckOut !== this.checkInDetail.hoTen) {
      this.mess.warning('Thông tin không trùng khớp!');
      return;
    }
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
    this.roomService.getRoomMapping(checkInElement, checkOutElement).subscribe(res => {
      this.roomMapping = res;
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
        })
      } else {
        this.roomManagerService.getDPMappingBySearch(id, this.date.toISOString().split('T')[0], this.date.toISOString().split('T')[0]).subscribe(res => {
          this.room = res;
        })
      }
    }, 2000)

  }

  handleCancelListDP() {
    this.isVisibleListDP = false;
  }

  showOrderRoom() {
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
        console.log(res);
      })
    }, 1000)
    setTimeout(async () => {
      const data2 = {
        tongTien: 0,
        idKhachHang: this.idKhach,
        trangThai: 3
      }
      data2.tongTien = this.calculateTotalDays() * (this.roomMapMd.giaTheoNgay ?? 0) + this.tongTien;
      data2.idKhachHang = this.idKhach
      this.billService.createOrUpdateTaiQuay(data2).subscribe((res: any) => {
        console.log(res);
      })
    }, 1500)
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
                const msg: any = res.entityMessages[0];
                this.notification.warning(`${msg.errorMessage}`, "");
                this.updateTongTien();
                this.deleteBill();
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
        soLuong: soLuong.value
      }
      this.billService.addDichVu(data1).subscribe((res: any) => {
        console.log(res)
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
        this.checkInSearch = checkIn;
        this.checkOutSearch = checkOut;
        this.roomService.getRoomMapping(checkIn, checkOut).subscribe(res => {
          this.roomMap2 = res;
        })
      } else if (!params['checkInDate'] && !params['checkOutDate']) {
        this.checkInSearch = this.date.toISOString();
        this.checkOutSearch = new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString();
        this.roomService.getRoomMapping(this.date.toISOString().split('T')[0], this.date.toISOString().split('T')[0]).subscribe(res => {
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
    this.billService.updateStatus(id, 0).subscribe({
      next: (res) => {
        this.currentBill.trangThai = 0;
        console.log(res);
      },
    })
    this.mess.success('Thanh toán thành công!');
    this.isVisibleListDP = false;
    this.isVisible = false;
    setTimeout(() => {
      this.viewRoom(idDatPhong, idDatPhong, id);
    }, 1000)
  }

  getSoLanDatPhong(id: any){
     this.roomService.getSoLanDatPhong(id, this.checkInSearch.split('T')[0], this.checkOutSearch.split('T')[0]).subscribe(res => {
       console.log(res);
    })
  }


  protected readonly formatDate = formatDate;
}
