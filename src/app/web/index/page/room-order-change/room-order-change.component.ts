import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, Observable, Subscription} from "rxjs";
import {RoomInformationModel} from "../../../../models/room-information.model";
import {RoomModel} from "../../../../models/room.model";
import {RoomTypeDtoModel} from "../../../../models/room-type-dto.model";
import {UserModel} from "../../../../auth/models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoomInformationService} from "../../../../modules/room-details/services/room-information.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../../../modules/room/services/room.service";
import {ServiceService} from "../service/service.service";
import {AuthService} from "../../../../auth/services";
import {RoomManagerService} from "../../../../modules/room-manager/services/room-manager.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {BillService} from "../../../../modules/bill/bill.service";
import {AppConstants} from "../../../../app-constants";
import {RoomOrder} from "../../../../models/room-order";
import {ListRoomOrderService} from "../list-room-order/list-room-order.service";
import {CustomerModel} from "../../../../modules/customer/models/customer.model";
import {CustomerService} from "../../../../modules/customer/services/customer.service";

declare var KeenSlider: any;
@Component({
  selector: 'cons-room-order-change',
  templateUrl: './room-order-change.component.html',
  styleUrls: ['./room-order-change.component.scss']
})
export class RoomOrderChangeComponent implements OnInit, OnDestroy{
  isVisible = false;
  user$: Observable<any>;
  idPhong: number | undefined;
  checkIn: string | undefined;
  checkOut: string | undefined;
  idOrder: number | undefined;
  roomOrder!: RoomOrder;
  room!: RoomInformationModel;
  roomList : RoomModel[] = [];
  roomType: RoomTypeDtoModel[] = [];
  message = '';
  user: UserModel | undefined;
  roomOrderForm: FormGroup;
  hasError = false;
  submitted = false;
  phiDichVu : number = 0 ;
  customerModel!: CustomerModel;
  private unsubscribe: Subscription[] = [];
  constructor(public roomService: RoomInformationService, private router: Router, private route: ActivatedRoute, private roomService2: RoomService,
              private service: ServiceService, private authService: AuthService, private roomManagerService: RoomManagerService,
              private formBuilder: FormBuilder, private notification: NzNotificationService, private billService: BillService,
              private roomOrderService: ListRoomOrderService, private customerService: CustomerService) {
    this.user$ = this.authService.currentUser$;
    this.user = this.authService.currentUserValue;
    this.idOrder = this.route.snapshot.params['id1'];
    this.roomOrderForm = this.formBuilder.group({
      userId: this.user?.id,
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      idPhong: this.idPhong = this.route.snapshot.params['id'],
      soNguoi: 0,
      tongGia: [0, Validators.required],
      trangThai: 1
    })

    this.customerService.getKhachHangByUser(this.user?.id).subscribe(res => {
      console.log(res)
      this.customerModel = res ;
    })
    // (document.getElementById('tongGia') as HTMLInputElement).value
  }

  ngOnInit() {
    this.idPhong = this.route.snapshot.params['id'];
    this.roomService2.getListRoomSame(1, 3, this.idPhong).subscribe(res => {
      if (res && res.content) {
        this.roomList = res.content;
      }
    })
    this.roomService.getRoom(this.idPhong).subscribe((data: RoomInformationModel) => {
      this.room = data;
    });
    this.idOrder = this.route.snapshot.params['id1'];
    this.roomOrderService.get(this.idOrder).subscribe((data: RoomOrder) => {
      this.roomOrder = data;
      console.log(this.roomOrder);
    });
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
    this.notification.blank('Bạn đã đổi phòng '+ this.room.maPhong , 'Thành công.', {
      nzKey: 'key'
    });

    setTimeout(() => {
      this.notification.blank('Chúc bạn có trải nghiêm', 'vui vẻ.', {
        nzKey: 'key'
      });
    }, 1000);
  }

  sendNotification(): void {
    const data = {
      userId: this.user?.id,
      noiDung: 'Đã đổi phòng '+ this.room.maPhong,
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

  calculateTotalDays(): number {
    // @ts-ignore
    // const checkInDate = this.roomOrderForm.get('checkIn').value;
    // // @ts-ignore
    // const checkOutDate = this.roomOrderForm.get('checkOut').value;
    const checkInElement = document.getElementById('checkIn') as HTMLInputElement;
    const checkOutElement = document.getElementById('checkOut') as HTMLInputElement;
    if (checkInElement.value && checkOutElement.value) {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const startDate = new Date(checkInElement.value);
      const endDate = new Date(checkOutElement.value);

      const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
      return Math.round(differenceInMilliseconds / millisecondsPerDay);
    }

    return 0;
  }

  options: Array<'L' | 'M' | 'Q' | 'H'> = ['L', 'M', 'Q', 'H'];
  errorLevel: 'L' | 'M' | 'Q' | 'H' = 'L';

  handleIndexChange(e: number): void {
    this.errorLevel = this.options[e];
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.sendNotification();
    this.messSuccess();
    this.router.navigate(['/room']);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  createBill(): void{
    const data = {
      ngayThanhToan: (document.getElementById('checkOut') as HTMLInputElement).value,
      tongTien: (document.getElementById('tongGia') as HTMLInputElement).value,
      idKhachHang: this.user?.id
    }
    this.billService.create(data).subscribe((res: any) => {
      console.log(res)
    })
  }

  saveRoomOrder(): void {
    if(this.user?.name == null){
      this.router.navigate(['/hotel/login']);
    }
    this.hasError = false;

      const data = this.roomOrderForm.value;
      data.tongGia = (document.getElementById('tongGia') as HTMLInputElement).value;
      data.checkIn = (document.getElementById('checkIn') as HTMLInputElement).value;
      data.checkOut = (document.getElementById('checkOut') as HTMLInputElement).value;
      const sub = this.roomManagerService.updateRoomOrder(this.idOrder, data)
        .pipe(first())
        .subscribe((res) => {
            if (res?.code === AppConstants.API_SUCCESS_CODE){
              this.submitted = true;
              this.messSuccess();

              this.router.navigate(['/profile/me/list-room-order'])
            } else {
              if (res?.code === AppConstants.API_BAD_REQUEST_CODE && res?.entityMessages.length > 0) {
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
  updateTongTien(): void {
    const data = {
      idKhachHang: this.user?.id,
      tongTien: (document.getElementById('tongGia') as HTMLInputElement).value,
    }
    this.billService.updateTongTien(data).subscribe((res: any) => {
      console.log(res);
    })
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  protected readonly Number = Number;
  protected readonly Math = Math;
}
