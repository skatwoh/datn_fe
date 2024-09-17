import {Component, HostListener, OnInit} from '@angular/core';
import {RoomModel} from "../../../../models/room.model";
import {RoomService} from "../../../../modules/room/services/room.service";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HomeService} from "../home/home.service";
import {HomeComponent} from "../home/home.component";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RoomTypeModel} from "../../../../models/room-type.model";
import {ServiceService} from "../service/service.service";
import {SaleModel} from "../../../../models/sale.model";
import {SaleService} from "../../../../modules/sale/sale.service";
import {ImageService} from "../../image/image.service";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {RoomTypeService} from "../../../../modules/room-category/services/room-type.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {CustomerService} from "../../../../modules/customer/services/customer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BillService} from "../../../../modules/bill/bill.service";
import * as moment from "moment/moment";
import {first, Observable, Subscription} from "rxjs";
import {AppConstants} from "../../../../app-constants";
import {RoomManagerService} from "../../../../modules/room-manager/services/room-manager.service";
import {CustomerModel} from "../../../../modules/customer/models/customer.model";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {UserModel} from "../../../../auth/models/user.model";
import {AuthService} from "../../../../auth/services";
import {BillModel} from "../../../../models/bill.model";
import {ListRoomOrderService} from "../list-room-order/list-room-order.service";

@Component({
  selector: 'cons-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  animations: [
    trigger('rotateAnimation', [
      state('initial', style({transform: 'rotate(0deg)'})),
      state('rotated', style({transform: 'rotate(360deg)'})),
      transition('initial => rotated', animate('5000ms ease-out')),
      transition('rotated => initial', animate('5000ms ease-in')),
    ]),
  ],
})
export class RoomComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  user$: Observable<any>;
  room: RoomModel[] = [];
  roomOfBill: RoomModel[] = [];
  roomType: RoomTypeModel[] = [];
  sale!: SaleModel;
  animationState: string = 'initial';
  soLuongNguoi: string = '';
  tenLoaiPhong: string = '';
  checkIn: any;
  checkOut: any;
  message: string = '';
  hasError: boolean = false;
  avatarUrls: any[] = [];
  data: any[] = [];
  user: UserModel | undefined;
  checkInDate: string = '';
  checkOutDate: string = '';
  soNguoi: number = 1;
  soPhong: number = 1;
  roomTypeModel!: RoomTypeModel;
  idRoomType: any;
  tongTien: number = 0;
  idKhach: any;
  roomOrderForm: FormGroup;
  customerModel!: CustomerModel;
  form: FormGroup;
  formTienCoc: FormGroup;
  imageUrl: string | undefined;
  imageUrlTienCoc: string | undefined;
  isVisible = false;
  isVisibleTT = false;
  isVisibleTienCoc = false;
  bill!: BillModel;
  isVisibleSpin = false;

  constructor(private roomService: RoomService,
              private homeService: HomeService,
              private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private roomTypeService: RoomTypeService,
              private service: ServiceService,
              private saleService: SaleService,
              private imageService: ImageService,
              private mess: NzMessageService,
              private customerService: CustomerService,
              private formBuilder: FormBuilder,
              private billService: BillService,
              private roomManagerService: RoomManagerService,
              private notification: NzNotificationService,
              private authService: AuthService,
              private roomOrderService: ListRoomOrderService) {
    this.user$ = this.authService.currentUser$;
    this.user = this.authService.currentUserValue;
    this.roomOrderForm = this.formBuilder.group({
      userId: this.user?.id,
      idPhong: [0],
      checkIn: [''],
      checkOut: [''],
      soNguoi: [0],
      tongGia: [0, Validators.required],
      hoTen: ['', Validators.required],
      sdt: ['', Validators.required],
      cccd: ['', Validators.required],
      ngaySinh: [''],
      ghiChu: [''],
      trangThai: 4
    })
    this.form = this.formBuilder.group({
      amount: ['', Validators.required],
      addInfo: ['', Validators.required],
      accountName: ['', Validators.required],
    })
    this.formTienCoc = this.formBuilder.group({
      amount1: ['', Validators.required],
      addInfo1: ['', Validators.required],
      accountName1: ['', Validators.required],
    })
    this.updateImageUrl();
    this.updateImageUrlTienCoc();

    // @ts-ignore
    this.form.get('amount').valueChanges.subscribe(() => this.updateImageUrl());
    // @ts-ignore
    this.form.get('addInfo').valueChanges.subscribe(() => this.updateImageUrl());

    // @ts-ignore
    this.formTienCoc.get('amount1').valueChanges.subscribe(() => this.updateImageUrlTienCoc());
    // @ts-ignore
    this.formTienCoc.get('addInfo1').valueChanges.subscribe(() => this.updateImageUrlTienCoc());
    this.customerService.getKhachHangByUser(this.user?.id).subscribe(res => {
      console.log(res)
      this.customerModel = res;
    })
  }

  updateImageUrl(): void {
    const {amount, addInfo, accountName} = this.form.value;
    console.log(amount);
    console.log(addInfo);
    this.imageUrl = this.generateImageUrl(amount, addInfo, accountName);
  }

  updateImageUrlTienCoc(): void {
    const {amount1, addInfo1, accountName1} = this.formTienCoc.value;
    console.log(amount1);
    console.log(addInfo1);
    this.imageUrlTienCoc = this.generateImageUrlTienCoc(amount1, addInfo1, accountName1);
  }

  generateImageUrl(amount: number, addInfo: string, accountName: string): string {
    const sale = amount * 0.95;
    const baseUrl = 'https://img.vietqr.io/image/vpb-62624112003-compact.jpg';
    const urlWithParams = `${baseUrl}?amount=${sale}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;
    console.log(amount, "amount", addInfo, accountName)
    console.log(urlWithParams, "url")
    return urlWithParams;
  }

  generateImageUrlTienCoc(amount: number, addInfo: string, accountName: string): string {
    const sale = amount * 0.5;
    const baseUrl = 'https://img.vietqr.io/image/vpb-62624112003-compact.jpg';
    const urlWithParams = `${baseUrl}?amount=${sale}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;
    return urlWithParams;
  }

  private image(): void {
    this.imageService.getAvatarUrls().subscribe(
      (res: any[]) => {
        if (res) {
          this.avatarUrls = res.map(item => item.userImageURL);
        }
      },
      error => {
        console.error('Error fetching avatar URLs', error);
      }
    );
  }

  updateUrlWithSearchParams(): void {
    const queryParams = {
      soLuongNguoi: this.soLuongNguoi,
      tenLoaiPhong: this.tenLoaiPhong,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
    };
    // Update URL without triggering a navigation
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const checkIn = params['checkIn'];
      const checkOut = params['checkOut'];
      const soPhong = params['soPhong'];
      const soNguoi = params['soNguoi'];
      if (checkIn === '' || checkOut === '') {
        this.checkIn = new Date().toISOString();
        this.checkOut = new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString();

      } else {
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.soPhong = soPhong;
        this.soNguoi = soNguoi;
      }
      this.getRoomType();

    });
    // const currentUrl = this.route.snapshot.url.join('/');
    // console.log(currentUrl, "ok");
    // this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2) => {
    //   this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    // });
    // this.route.queryParams.subscribe((params) => {
    //   if (params['tenLoaiPhong'] || params['checkIn'] || params['checkOut'] || params['soLuongNguoi'] || params['minGia'] || params['maxGia']) {
    //     this.checkIn = params['checkIn'];
    //     this.checkOut = params['checkOut'];
    //     this.tenLoaiPhong = params['tenLoaiPhong'];
    //     this.soLuongNguoi = params['soLuongNguoi'];
    //     if (params['soLuongNguoi'] === '') {
    //       this.homeService.getRoomListSearch(1, 50, '', this.tenLoaiPhong, this.checkIn, this.checkOut).subscribe(res => {
    //         if (res && res.content) {
    //           this.room = res.content;
    //           // this.updateUrlWithSearchParams();
    //         }
    //       })
    //     } else {
    //       this.getRoomsSearch();
    //     }
    //   } else {
    //     this.router.navigate(['/']);
    //   }
    // });
    //
    // this.getSale();
    // this.image();

  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): any {
    // Kiểm tra xem người dùng đang rời khỏi trang để chuyển tới URL cố định hay không
    if (this.router.url === '/') {
      console.log(this.router.url, "url")
      // Thông báo bạn muốn hiển thị
      const confirmationMessage = 'Bạn có chắc chắn muốn rời khỏi trang này?';

      // Gán thông báo cho sự kiện
      $event.returnValue = confirmationMessage;

      // Trả về thông báo (chỉ cho trình duyệt cũ)
      console.log("ok")
      return confirmationMessage;
    }
  }

  navigateToRoomDetails(id: any) {
    this.router.navigate(['/room-detail', id], {
      queryParamsHandling: 'merge'
    });
  }

  getRoomType() {
    const id = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      const soPhong = params['soPhong'];
      const checkIn = params['checkIn'];
      const checkOut = params['checkOut'];
      this.roomTypeService.get(id).subscribe(res => {
        this.roomTypeModel = res;
        this.tongTien = (this.calculateTotalDays() * (this.roomTypeModel.giaTheoNgay ?? 0)) * Number.parseInt(soPhong);
        this.homeService.getRoomListSearch(1, 50, '', (this.roomTypeModel.tenLoaiPhong ?? ''), checkIn, checkOut).subscribe(res => {
          if (res && res.content) {
            this.room = res.content;
            console.log(res.content);
          }
        })
      })
    })
  }

  checkCreate = false;

  bookNow() {
    // const queryParams = {
    //   soPhong: this.soPhong,
    //   soNguoi: this.soNguoi,
    //   checkIn: this.checkIn,
    //   checkOut: this.checkOut
    // }
    // this.router.navigate(['/room-order', id], {queryParams});
    if (this.user?.name == null) {
      this.router.navigate(['/hotel/login']);
    }
    const dateOfBirthInput = (document.getElementById('ngaySinh') as HTMLInputElement).value;
    const dateOfBirth = new Date(dateOfBirthInput);

    // Check if date of birth is less than 18 years ago
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDifference = today.getMonth() - dateOfBirth.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())) {
      age--;
    }

    if (age < 18) {
      this.mess.warning('Người dùng phải ít nhất 18 tuổi');
      return;
    }
    // if (!this.validateEmail((document.getElementById('email') as HTMLInputElement).value)) {
    //   this.mess.warning('Email không đúng định dạng');
    //   return;
    // }

    // Validation for CCCD length
    if ((document.getElementById('cccd') as HTMLInputElement).value.length !== 12 && (document.getElementById('cccd') as HTMLInputElement).value.length !== 9) {
      this.mess.warning('Số CCCD phải có độ dài 9 hoặc 12 chữ số');
      return;
    }
    // Validation for phone number length
    if((document.getElementById('sdt') as HTMLInputElement).value.length !== 10){
      this.mess.warning('Số điện thoại phải có 10 chữ số');
      return;
    }
    const data = {
      hoTen: (document.getElementById('hoTen') as HTMLInputElement).value,
      sdt: (document.getElementById('sdt') as HTMLInputElement).value,
      cccd: (document.getElementById('cccd') as HTMLInputElement).value,
      ngaySinh: (document.getElementById('ngaySinh') as HTMLInputElement).value,
      gioiTinh: (document.getElementById('gioiTinh') as HTMLInputElement).value
    }
    if (data.hoTen == '' || data.hoTen == null || data.sdt == '' || data.sdt == null || data.ngaySinh == null || data.ngaySinh == '') {
      this.mess.warning('Vui lòng điền đầy đủ thông tin người đặt');
      return;
    }
    this.isVisibleSpin = true;
    setTimeout(() => {
      this.customerService.updateCustomer(this.user?.id, data).subscribe(res => {

      })
    }, 300)
    // setTimeout(() => {
    //   this.customerService.getIdByCCCD(data.cccd).subscribe((res: any) => {
    //     this.idKhach = res;
    //     console.log(res);
    //   })
    //   this.roomManagerService.getKH(data.cccd).subscribe((res: any) => {
    //     this.customerModel = res;
    //   })
    // }, 1000)
    setTimeout(async () => {
      const data2 = {
        tongTien: 0,
        tienPhong: 0,
        idKhachHang: this.customerModel.id,
        trangThai: 1,
        ghiChu: '1'
      }
      data2.tongTien = this.tongTien;
      data2.tienPhong = this.tongTien;
      data2.idKhachHang = this.customerModel.id;
      this.billService.createOrUpdateTaiQuay(data2).subscribe((res: any) => {
        console.log(res);
        this.checkCreate = true;
      })
    }, 1500)
    console.log(this.room);
    setTimeout(() => {
      if (this.roomOrderForm.valid && this.checkCreate) {
        console.log(this.room);

        for (let x = 0; x < this.soPhong; x++) {
          const dataDatPhong = this.roomOrderForm.value;
          dataDatPhong.idKhachHang = this.customerModel.id;
          if (this.customerModel == null || this.customerModel.giamGia === 0) {
            console.log('khong ton tai');
            dataDatPhong.tongGia = this.calculateTotalDays() * (this.roomTypeModel.giaTheoNgay ?? 0);
          } else if (this.customerModel.giamGia !== 0) {
            console.log('ton tai');
            dataDatPhong.tongGia = this.calculateTotalDays() * (this.roomTypeModel.giaTheoNgay ?? 0) * (100 - this.customerModel.giamGia) / 100;
          }
          dataDatPhong.idPhong = this.room[x].id;
          dataDatPhong.checkIn = new Date(this.checkIn.toLocaleString());
          dataDatPhong.checkOut = new Date(this.checkOut.toLocaleString());
          // data.idVourcher = (document.getElementById('voucher') as HTMLInputElement).value;
          dataDatPhong.ghiChu = '';
          // const sub = this.roomManagerService.datPhongTaiQuay(dataDatPhong)
          //   .pipe(first())
          //   .subscribe((res) => {
          //       if (res?.code === AppConstants.API_SUCCESS_CODE) {
          //         console.log('Thành công')
          //       } else {
          //         const msg: any = res.entityMessages[0];
          //         this.notification.warning(`${msg.errorMessage}`, "");
          //         this.updateTongTien();
          //         this.deleteBill();
          //         return;
          //       }
          //     },
          //   );
          // this.unsubscribe.push(sub);
          const sub = this.roomManagerService.create(dataDatPhong)
            .pipe(first())
            .subscribe((res) => {
                if (res?.code === AppConstants.API_SUCCESS_CODE) {
                  // this.sendNotification();
                  // this.messSuccess();
                  console.log('thành công');
                } else {
                  if (res?.code === AppConstants.API_BAD_REQUEST_CODE && res?.entityMessages.length > 0) {
                    this.updateTongTien();
                    this.deleteBill();
                    const msg: any = res.entityMessages[0];
                    this.notification.warning(`${msg.errorMessage}`, "");
                  } else {
                    this.message = `Error`;
                  }
                  this.hasError = true;
                }
              },
            );
          this.unsubscribe.push(sub);
        }

        setTimeout(() => {
          this.getRoomsOfBill();
          this.isVisible = true;
          this.isVisibleSpin = false;
        }, 3500)
      }
    }, 3000)
  }

  calculateTotalDays(): number {
    // @ts-ignore
    const checkInDate = this.checkIn;
    // @ts-ignore
    const checkOutDate = this.checkOut;

    if (checkInDate && checkOutDate) {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
      return Math.round(differenceInMilliseconds / millisecondsPerDay);
    }

    return 0;
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

  deleteBill() {
    const data = {
      ngayThanhToan: moment(this.checkIn),
      tongTien: this.tongTien,
      idKhachHang: this.idKhach
    }
    this.billService.deleteBill().subscribe((res: any) => {
      console.log(res);
    })
  }

  private getRoomsOfBill(): void {
    const id = this.user?.id;
    this.roomOrderService.getRoomOfBill(1, 50, id).subscribe(res => {
      if (res && res.content) {
        this.billService.get(res.content[0].idHoaDon).subscribe(data => {
          this.bill = data;
        })
        this.roomOfBill = res.content;
      }
    })
  }

  showModalThanhToan(): void {
    this.isVisibleTT = true;
    console.log('12345')
  }

  showModalThanhToanTienCoc(): void {
    this.isVisibleTienCoc = true;
  }

  handleOkThanhToan(): void {
    this.billService.updateStatus(this.bill.id, 2).subscribe({
      next: (res) => {
        console.log(res);
        this.bill.trangThai = 2;
        // this.billService.updateTongTien()
      },
    })
    setTimeout(() => {
      this.mess.success('Bạn đã thanh toán hóa đơn thành công, vui lòng chờ xác nhận!');
      this.sendDataToApi();
      this.isVisibleTT = false;
      this.router.navigate(['/me/step/3']);
    }, 2000)
  }

  handleOkThanhToanTienCoc(): void {
    this.billService.updateStatus(this.bill.id, 6).subscribe({
      next: (res) => {
        console.log(res);
        this.bill.trangThai = 6;
      },
    })
    setTimeout(() => {
      this.mess.success('Bạn đã thanh toán tiền cọc thành công, vui lòng chờ xác nhận!');
      this.sendDataToApi2();
      this.isVisibleTienCoc = false;
      this.router.navigate(['/me/step/3']);
    }, 2000)
  }

  handleCancelThanhToan(): void {
    console.log('Button cancel clicked!');
    this.isVisibleTT = false;
  }

  handleCancelThanhToanTienCoc(): void {
    console.log('Button cancel clicked!');
    this.isVisibleTienCoc = false;
  }

  sendDataToApi(): void {
    const apiUrl = 'https://643eafd46c30feced8304742.mockapi.io/skatwoh/api-payment';
    const dataToSend = this.form.value;

    this.http.post(apiUrl, dataToSend).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
      },
      (error) => {
        console.error('Error sending data to API:', error);
      }
    );
  }

  sendDataToApi2(): void {
    const apiUrl = 'https://643eafd46c30feced8304742.mockapi.io/skatwoh/api-payment';
    const dataToSend = this.formTienCoc.value;

    this.http.post(apiUrl, dataToSend).subscribe(
      (response) => {
        console.log('Data sent successfully:', response);
      },
      (error) => {
        console.error('Error sending data to API:', error);
      }
    );
  }

  handleCancel() {
    this.isVisible = false;
  }

  protected readonly Number = Number;

}
