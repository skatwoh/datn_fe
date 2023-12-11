import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomTypeDtoModel} from "../../../../models/room-type-dto.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomInformationModel} from "../../../../models/room-information.model";
import {RoomInformationService} from "../../../../modules/room-details/services/room-information.service";
import {first, Observable, Subscription} from "rxjs";
import {AuthService} from "../../../../auth/services";
import {RoomManagerService} from "../../../../modules/room-manager/services/room-manager.service";
import {UserModel} from "../../../../auth/models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {AppConstants} from "../../../../app-constants";
import {ServiceService} from "../service/service.service";
import {BillService} from "../../../../modules/bill/bill.service";
import {RoomModel} from "../../../../models/room.model";
import {RoomService} from "../../../../modules/room/services/room.service";
import {VoucherService} from "../../../../modules/voucher/services/voucher.service";
import {VoucherModel} from "../../../../models/voucher.model";
import {HttpClient} from '@angular/common/http';
import {SaleService} from "../../../../modules/sale/sale.service";
import {SaleModel} from "../../../../models/sale.model";

declare var KeenSlider: any;

@Component({
  selector: 'cons-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit, OnDestroy {
  isVisible = false;
  user$: Observable<any>;
  idPhong: number | undefined;
  voucher!: VoucherModel;
  room!: RoomInformationModel;
  roomList: RoomModel[] = [];
  roomType: RoomTypeDtoModel[] = [];
  message = '';
  voucherList: VoucherModel[] = [];
  user: UserModel | undefined;
  roomOrderForm: FormGroup;
  giamGia: number | undefined;
  hasError = false;
  submitted = false;
  phiDichVu: number = 0;
  imageUrl: string | undefined;
  form: FormGroup;
  sale!: SaleModel;
  private unsubscribe: Subscription[] = [];

  constructor(public roomService: RoomInformationService, private router: Router, private route: ActivatedRoute, private saleService: SaleService,
              private service: ServiceService, private authService: AuthService, private roomManagerService: RoomManagerService,
              private formBuilder: FormBuilder, private notification: NzNotificationService, private billService: BillService,
              private voucherService: VoucherService, private http: HttpClient, private roomService2: RoomService) {
    this.user$ = this.authService.currentUser$;
    this.user = this.authService.currentUserValue;
    this.roomOrderForm = this.formBuilder.group({
      userId: this.user?.id,
      idPhong: this.idPhong = this.route.snapshot.params['id'],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      soNguoi: [0, Validators.required],
      idVoucher: [null],
      tongGia: [0, Validators.required],
      trangThai: 1
    })

    // qr
    this.form = this.formBuilder.group({
      amount: ['', Validators.required],
      addInfo: ['', Validators.required],
      accountName: ['', Validators.required],
    })
    this.updateImageUrl();

    // @ts-ignore
    this.form.get('amount').valueChanges.subscribe(() => this.updateImageUrl());
    // @ts-ignore
    this.form.get('addInfo').valueChanges.subscribe(() => this.updateImageUrl());
  }

  private getSale(): void {
    this.saleService.getSale().subscribe(res => {
      if (res) {
        this.sale = res;
      }
    })
  }

  generateImageUrl(amount: number, addInfo: string, accountName: string): string {
    const baseUrl = 'https://img.vietqr.io/image/vpb-62624112003-compact.jpg';
    const urlWithParams = `${baseUrl}?amount=${amount}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;
    return urlWithParams;
  }

  updateImageUrl(): void {
    const {amount, addInfo, accountName} = this.form.value;
    this.imageUrl = this.generateImageUrl(amount, addInfo, accountName);
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

  ngOnInit() {
    this.getListVouchers();
    this.idPhong = this.route.snapshot.params['id'];
    this.roomService2.getListRoomSame(1, 3, this.idPhong).subscribe(res => {
      if (res && res.content) {
        this.roomList = res.content;
      }
    })
    this.roomService.getRoom(this.idPhong).subscribe((data: RoomInformationModel) => {
      this.room = data;
    });
    this.getSale();

    // check
    const keenSlider = new KeenSlider('#keen-slider', {
      loop: true,
      slides: {
        origin: 'center',
        perView: 1.25,
        spacing: 16,
      },
      breakpoints: {
        '(min-width: 1024px)': {
          slides: {
            origin: 'auto',
            perView: 2.5,
            spacing: 32,
          },
        },
      },
    });

    const keenSliderPrevious = document.getElementById('keen-slider-previous');
    const keenSliderNext = document.getElementById('keen-slider-next');

    // @ts-ignore
    keenSliderPrevious.addEventListener('click', () => keenSlider.prev());
    // @ts-ignore
    keenSliderNext.addEventListener('click', () => keenSlider.next());
  }

  messSuccess(): void {
    this.notification.blank('Bạn đã đặt phòng ' + this.room.maPhong, 'Thành công.', {
      nzKey: 'key'
    });

    setTimeout(() => {
      this.notification.blank('Chúc bạn ngày mới', 'tốt lành.', {
        nzKey: 'key'
      });
    }, 1000);
  }

  sendNotification(): void {
    const data = {
      userId: this.user?.id,
      noiDung: 'Đã đặt phòng ' + this.room.maPhong,
      trangThai: 0
    }
    this.service.sendNotification(data).subscribe((res: any) => {
      console.log(res)
    })
  }

  dichVuMienPhi(): void {
    this.phiDichVu = 0;
  }

  dichVuDayDu(): void {
    this.phiDichVu = 500000;
  }

  tinhGiamGia(): void {
    if((document.getElementById('voucher') as HTMLInputElement).value == 'null'){
      this.giamGia = 0;
    }
    else{
      this.voucherService.get((document.getElementById('voucher') as HTMLInputElement).value).subscribe((data: VoucherModel) => {
        this.voucher = data;
        this.giamGia = data.giamGia;
        console.log(this.voucher);
      });
    }
  }


  calculateTotalDays(): number {
    // @ts-ignore
    const checkInDate = this.roomOrderForm.get('checkIn').value;
    // @ts-ignore
    const checkOutDate = this.roomOrderForm.get('checkOut').value;

    if (checkInDate && checkOutDate) {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);

      const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
      return Math.round(differenceInMilliseconds / millisecondsPerDay);
    }

    return 0;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.sendNotification();
    this.messSuccess();
    this.sendDataToApi();
    this.router.navigate(['/room']);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  createBill(): void {
    const data = {
      ngayThanhToan: (document.getElementById('checkOut') as HTMLInputElement).value,
      tongTien: (document.getElementById('tongGia') as HTMLInputElement).value,
      idKhachHang: this.user?.id
    }
    this.billService.createOrUpdate(data).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateTongTien(): void {
    const data = {
      idKhachHang: this.user?.id,
      tongTien: (document.getElementById('tongGia') as HTMLInputElement).value,
    }
    this.billService.updateTongTien(data).subscribe((res: any) => {
      console.log(res);
    })
  }

  saveRoomOrder(): void {
    if (this.user?.name == null) {
      this.router.navigate(['/hotel/login']);
    }
    this.createBill();
    this.hasError = false;
    if (this.roomOrderForm.valid) {
      setTimeout(() => {
        const data = this.roomOrderForm.value;
        data.tongGia = (document.getElementById('tongGia') as HTMLInputElement).value;
        const sub = this.roomManagerService.create(data)
          .pipe(first())
          .subscribe((res) => {
              if (res?.code === AppConstants.API_SUCCESS_CODE) {
                this.submitted = true;
                this.sendNotification();
                this.messSuccess();
                this.router.navigate(['/room']);
              } else {
                if (res?.code === AppConstants.API_BAD_REQUEST_CODE && res?.entityMessages.length > 0) {
                  this.updateTongTien();
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
      }, 1000)

    }
  }

  getListVouchers(): void {
    this.voucherService.getVoucherList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.voucherList = res.content;
      }
    })
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  protected readonly Number = Number;
  protected readonly Math = Math

}
