import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {BillModel} from "../../../../models/bill.model";
import {BillService} from "../../../../modules/bill/bill.service";
import {AuthService} from "../../../../auth/services";
import {UserModel} from "../../../../auth/models/user.model";
import {ListRoomOrderService} from "../../page/list-room-order/list-room-order.service";
import {CustomerModel} from "../../../../modules/customer/models/customer.model";
import {CustomerService} from "../../../../modules/customer/services/customer.service";

@Component({
  selector: 'cons-step',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})

export class Step2Component implements OnInit, OnDestroy {
  countdown: number = 180;
  currentBill!: BillModel;
  user: UserModel | undefined;
  private intervalId: any;
  customer!: CustomerModel;

  constructor(private router: Router, private message: NzMessageService, private billService: BillService,
              private authService: AuthService, private roomOrderService: ListRoomOrderService, private customerService: CustomerService) {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Check if the pressed key is F5
    if (event.key === 'F5' && event.ctrlKey) {
      event.preventDefault(); // Prevent the default behavior (refreshing the page)
    }
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    this.intervalId = setInterval(() => {
      this.countdown--;
      if (this.countdown === 60) {
        this.message.warning("Vui lòng thanh toán để xác nhận!");
      } else if (this.countdown === 0) {
        this.message.error("Hóa đơn quá thời gian!");
        this.huyHoaDon();
        this.router.navigate(['/']);
      }
    }, 1000);
    this.customerService.getKhachHangByUser(this.user?.id).subscribe(res => {
      console.log(res)
      this.customer = res ;
    })
  }

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedMinutes: string = this.padNumber(minutes);
    const formattedSeconds: string = this.padNumber(remainingSeconds);

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

  huyHoaDon() {
    const id = this.user?.id;
    this.roomOrderService.getRoomOfBill(1, 50, id).subscribe(res => {
      if (res && res.content) {
        this.billService.get(res.content[0].idHoaDon).subscribe((data: BillModel) => {
          this.currentBill = data;
        });
        this.billService.updateStatus(res.content[0].idHoaDon, 4).subscribe({
          next: (res) => {
            this.currentBill.trangThai = 4;
            console.log(res);
          },
        })
      }
    })
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    // const id = this.user?.id;
    this.roomOrderService.getRoomOfBill(1, 50, this.customer.id).subscribe(res => {
      if (res && res.content) {
        this.billService.get(res.content[0].idHoaDon).subscribe((data: BillModel) => {
          this.currentBill = data;
          if(data.trangThai == 1){
            this.billService.updateStatus(res.content[0].idHoaDon, 4).subscribe({
              next: (res) => {
                this.currentBill.trangThai = 4;
                console.log(res);
              },
            })
          }
        });
      }
    })
  }

}
