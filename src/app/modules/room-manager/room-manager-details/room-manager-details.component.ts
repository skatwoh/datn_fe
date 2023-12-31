import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, Observable, Subscription} from "rxjs";
import {RoomInformationModel} from "../../../models/room-information.model";
import {RoomTypeDtoModel} from "../../../models/room-type-dto.model";
import {UserModel} from "../../../auth/models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoomInformationService} from "../../room-details/services/room-information.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../room/services/room.service";
import {AuthService} from "../../../auth/services";
import {RoomManagerService} from "../services/room-manager.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {AppConstants} from "../../../app-constants";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../account/services/account.service";
import {AccountModel} from "../../account/models/account.model";
import {BillService} from "../../bill/bill.service";
import {VoucherModel} from "../../../models/voucher.model";
import {VoucherService} from "../../voucher/services/voucher.service";
import {BillModel} from "../../../models/bill.model";
import {CustomerService} from "../../customer/services/customer.service";
import {CustomerModel} from "../../customer/models/customer.model";

@Component({
  selector: 'cons-room-manager-details',
  templateUrl: './room-manager-details.component.html',
  styleUrls: ['./room-manager-details.component.scss']
})
export class RoomManagerDetailsComponent implements OnInit, OnDestroy {
  user$: Observable<any>;
  idPhong: number | undefined;
  room!: RoomInformationModel;
  roomType: RoomTypeDtoModel[] = [];
  message = '';
  user: UserModel | undefined;
  roomOrderForm: FormGroup;
  hasError = false;
  submitted = false;
  private unsubscribe: Subscription[] = [];
  accounts: AccountModel[] = [];
  voucher!: VoucherModel;
  voucherList: VoucherModel[] = [];
  giamGia: number | undefined;
  checkIn: any;
  checkOut: any;
  customer!: CustomerModel;
  idKhach: number | undefined;
  constructor(public roomService: RoomInformationService, private router: Router, private route: ActivatedRoute,
              private roomService1: RoomService, private authService: AuthService, private roomManagerService: RoomManagerService,
              private formBuilder: FormBuilder, private notification: NzNotificationService, private accountService: AccountService,
              private http: HttpClient, private billService: BillService, private voucherService: VoucherService, private customerService: CustomerService) {
    this.user$ = this.authService.currentUser$;
    this.user = this.authService.currentUserValue;
    this.roomOrderForm = this.formBuilder.group({
      // userId: [0, Validators.required],
      idKhachHang:[0],
      idPhong: this.idPhong = this.route.snapshot.params['id'],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      soNguoi: [0, Validators.required],
      tongGia: [0, Validators.required],
      hoTen: ['', Validators.required],
      sdt: ['', Validators.required],
      cccd: ['', Validators.required],
      ghiChu: [''],
      trangThai: 1
    })
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

  tinhGiamGia(): void {
    if ((document.getElementById('voucher') as HTMLInputElement).value == 'null') {
      this.giamGia = 0;
    } else {
      this.voucherService.get((document.getElementById('voucher') as HTMLInputElement).value).subscribe((data: VoucherModel) => {
        this.voucher = data;
        this.giamGia = data.giamGia;
        console.log(this.voucher);
      });
    }
  }

  updateTongTien(): void {
    const data = {
      idKhachHang: (document.getElementById('userId') as HTMLInputElement).value,
      tongTien: (document.getElementById('tongGia') as HTMLInputElement).value,
    }
    this.billService.updateTongTien(data).subscribe((res: any) => {
      console.log(res);
    })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const checkIn = params['checkInDate'];
      const checkOut = params['checkOutDate'];
      this.checkIn = checkIn;
      this.checkOut = checkOut;
    });
    this.getListVouchers();
    this.idPhong = this.route.snapshot.params['id'];
    this.accountService.getUserList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.accounts = res.content;
      }
    })
    this.roomService.getRoom(this.idPhong).subscribe((data: RoomInformationModel) => {
      this.room = data;
    });
  }

  messSuccess(): void {
    this.notification.blank('Bạn đã đặt phòng ' + this.room.maPhong, 'Thành công.', {
      nzKey: 'key'
    });
  }

  createBill(): void {
    const data1 = {
      hoTen: (document.getElementById('ten') as HTMLInputElement).value,
      sdt: (document.getElementById('sdt') as HTMLInputElement).value,
      cccd: (document.getElementById('cccd') as HTMLInputElement).value
    }
    this.customerService.create(data1).subscribe((res: any) => {
      this.customer = res;
    })
    setTimeout(() => {
      this.customerService.getIdByCCCD(data1.cccd).subscribe((res: any) => {
        this.idKhach = res;
        console.log(res);
      })
      setTimeout(() => {
        const data = {
          tongTien: (document.getElementById('tongGia') as HTMLInputElement).value,
          idKhachHang: this.idKhach
        }
        this.billService.createOrUpdateTaiQuay(data).subscribe((res: any) => {
          console.log(res);
        })
      }, 500)

    }, 500)
    // this.customerService.get()

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
        data.idKhachHang = this.idKhach;
        data.tongGia = (document.getElementById('tongGia') as HTMLInputElement).value;
        // data.idVourcher = (document.getElementById('voucher') as HTMLInputElement).value;
        data.ghiChu = (document.getElementById('ghiChu') as HTMLInputElement).value;
        const sub = this.roomManagerService.datPhongTaiQuay(data)
          .pipe(first())
          .subscribe((res) => {
              if (res?.code === AppConstants.API_SUCCESS_CODE) {
                this.submitted = true;
                this.messSuccess();

                this.router.navigate(['/admin/room-manager']);
                // this.showModal();
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
      }, 1500)

    }
  }

  deleteBill() {
    const data = {
      ngayThanhToan: (document.getElementById('checkOut') as HTMLInputElement).value,
      tongTien: (document.getElementById('tongGia') as HTMLInputElement).value,
      idKhachHang: (document.getElementById('userId') as HTMLInputElement).value
    }
    this.billService.deleteBill(data).subscribe((res: any) => {
      console.log(res);
    })
  }

  getListVouchers(): void {
    this.voucherService.getVoucherList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.voucherList = res.content;
      }
    })
  }

  parseDateString(dateString: string): Date | null {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  protected readonly Number = Number;
}

