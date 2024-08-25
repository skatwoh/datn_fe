import {Component, OnInit} from '@angular/core';
import {RoomOrder} from "../../../../models/room-order";
import {RoomModel} from "../../../../models/room.model";
import {UserModel} from "../../../../auth/models/user.model";
import {ListRoomOrderService} from "../list-room-order/list-room-order.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {AuthService} from "../../../../auth/services";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {BillService} from "../../../../modules/bill/bill.service";
import {BillModel} from "../../../../models/bill.model";
import {CustomerService} from "../../../../modules/customer/services/customer.service";
import {CustomerModel} from "../../../../modules/customer/models/customer.model";

@Component({
  selector: 'cons-list-order-now',
  templateUrl: './list-order-now.component.html',
  styleUrls: ['./list-order-now.component.scss']
})
export class ListOrderNowComponent implements OnInit {
  room: RoomOrder[] = [];
  roomByHD: RoomOrder[] = [];
  room1: RoomModel[] = [];
  bill!: BillModel;
  listBill: BillModel[] = [];
  currentRoom!: RoomOrder;
  user: UserModel | undefined;
  isVisible = false;
  isOkLoading = false;
  isVisible1 = false;
  isOkLoading1 = false;
  id: number | undefined;
  id2: number | undefined;
  hasError = false;
  khachHang!: CustomerModel;
  listDP: any[] = [];
  isVisibleHD = false;
  isOkLoadingHD = false;
  date: Date = new Date();

  constructor(private roomOrderService: ListRoomOrderService,
              private billService: BillService,
              private customerService: CustomerService,
              private message: NzMessageService,
              private authService: AuthService,
              private notification: NzNotificationService,
              private router: Router) {
    this.user = authService.currentUserValue;
  }

  getLichSuDatPhong(): void {
    const id = this.user?.id;
    this.roomOrderService.getLichSuDatPhong(1, 50, id).subscribe(res => {
      if (res && res.content) {
        this.room = res.content;
      }
    })
  }

  ngOnInit(): void {
    this.getListBillByCustomer();
  }

  protected readonly Number = Number;

  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.roomOrderService.get(this.id).subscribe((data: RoomOrder) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
    });
  }

  showModalHuyHoaDon(id: any): void {
    this.isVisibleHD = true;
    this.billService.get(id).subscribe((data: any) => {
      this.bill = data;
      console.log(this.bill);
    });
  }

  showRoomUpperPrice(giaPhong: number | undefined, id: any): void {
    this.id = id;
    this.roomOrderService.get(id).subscribe((data: RoomOrder) => {
      if ((data.checkIn?.split('T')[0] ?? 0) <= this.date.toISOString().split('T')[0]) {
        this.message.warning('Đã quá thời gian đổi phòng!');
        return;
      }else if((data.checkIn?.split('T')[0] ?? 0) > this.date.toISOString().split('T')[0]) {
        this.isVisible1 = true;
        this.currentRoom = data;
        console.log(this.currentRoom);
        this.roomOrderService.getListRoomByUpperPrice(1, 50, giaPhong, data.checkIn, data.checkOut, data.idPhong).subscribe(res => {
          if (res && res.content) {
            this.room1 = res.content;
          }
        })
      }
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.deleteRoom();
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  successMessage(): void {
    this.message.success('Hủy phòng thành công');
  }

  deleteRoom(): void {
    this.roomOrderService.updateStatus(this.currentRoom.id, 0)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.body.code == "Failed") {
            this.message.error(res.body.message);
          } else {
            this.currentRoom.trangThai = 0
            this.successMessage();
          }
        },
      });
    setTimeout(() => {
      let checkCount = 0;
      this.billService.getDatPhongByHoaDon(1, 15, this.currentRoom.idHoaDon).subscribe(res => {
            // this.roomByHD = res.content;
            for(let x = 0;x < res.content.length;x++){
              if(res.content[x].trangThai !== 0){
                checkCount++;
              }
            }
            console.log(checkCount);
            if(checkCount === 0){
              this.billService.updateStatus(this.currentRoom.idHoaDon, 4).subscribe(res => {
                console.log(res);
              })
            }
      })
    }, 200)
    setTimeout(() => {
      this.getListBillByCustomer();
      this.router.navigate(['/profile/me/list-room-order']);
    }, 400)
  }

  handleCancel1(): void {
    this.isVisible1 = false;
  }

  getListBillByCustomer() {
    this.customerService.getKhachHangByUser(this.user?.id).subscribe(res => {
      console.log(res)
      this.khachHang = res;
    })
    setTimeout(() => {
      this.billService.getBillsByCustomer(1, 500, this.khachHang.id).subscribe(res => {
        if (res && res.content) {
          this.listBill = res.content;
          for (let x = 0; x < res.content.length; x++) {
            console.log(res.content[x].id);
            this.listDP.push(res.content[x].id);
          }
        }
      })
    }, 200)
    setTimeout(() => {
        this.billService.getDatPhongByKH(1, 10000, this.khachHang.id).subscribe(res => {
          if (res && res.content) {
            this.room = res.content;
          }
        })
    }, 400)
  }

  huyHoaDon(id: any){

  }

  handleOkHuyHoaDon(): void {
    this.isOkLoadingHD = true;
    this.billService.updateStatus(this.bill.id, 4).subscribe(res => {
      console.log(res);
    })
    setTimeout(() => {
      this.isVisibleHD = false;
      this.isOkLoadingHD = false;
      this.message.success('Hủy đơn đặt phòng thành công!');
      this.getListBillByCustomer();
      this.router.navigate(['/profile/me/list-room-order']);
    }, 400)
  }

  handleCancelHD(): void {
    this.isVisibleHD = false;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
