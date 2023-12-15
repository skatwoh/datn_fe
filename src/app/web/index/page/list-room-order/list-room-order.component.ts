import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListRoomOrderService} from "./list-room-order.service";
import {RoomOrder} from "../../../../models/room-order";
import {Observable} from "rxjs";
import {UserModel} from "../../../../auth/models/user.model";
import {AuthService} from "../../../../auth/services";
import {formatNumber} from "@angular/common";
import {RoomModel} from "../../../../models/room.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {AppConstants} from "../../../../app-constants";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";
import {BillService} from "../../../../modules/bill/bill.service";
import {BillModel} from "../../../../models/bill.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'cons-list-room-order',
  templateUrl: './list-room-order.component.html',
  styleUrls: ['./list-room-order.component.scss']
})
export class ListRoomOrderComponent implements OnInit, OnDestroy {
  room: RoomOrder[] = [];
  room1: RoomModel[] = [];
  bill!: BillModel;
  currentRoom!: RoomOrder;
  currentRoom2!: RoomOrder;
  user: UserModel | undefined;
  isVisible = false;
  isOkLoading = false;
  isVisible1 = false;
  isVisibleTT = false;
  isOkLoading1 = false;
  id: number | undefined;
  id2: number | undefined;
  message2: string = '';
  hasError = false;
  form: FormGroup;
  imageUrl: string | undefined;

  constructor(private roomOrderService: ListRoomOrderService,
              private message: NzMessageService,
              private authService: AuthService,
              private notification: NzNotificationService,
              private billService: BillService,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private router: Router) {
    this.user = authService.currentUserValue;
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

  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.roomOrderService.get(this.id).subscribe((data: RoomOrder) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
    });
  }

  showRoomUpperPrice(giaPhong: number | undefined, id: any): void {
    this.isVisible1 = true;
    this.id = id;
    this.roomOrderService.get(this.id).subscribe((data: RoomOrder) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
      this.roomOrderService.getListRoomByUpperPrice(1, 50, giaPhong, data.idPhong).subscribe(res => {
        if (res && res.content) {
          this.room1 = res.content;
        }
      })
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
            this.getRoomsOfBill();
          }
        },
      });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  // private getRooms(): void {
  //   const id = this.user?.id;
  //     this.roomOrderService.getListRoomOrder(1, 50, id, 1).subscribe(res => {
  //       if (res && res.content) {
  //         this.room = res.content;
  //       }
  //     })
  // }

  private getRoomsOfBill(): void {
    const id = this.user?.id;
    this.roomOrderService.getRoomOfBill(1, 50, id).subscribe(res => {
      if (res && res.content) {
        this.billService.get(res.content[0].idHoaDon).subscribe(data => {
          this.bill = data;
        })
        this.room = res.content;
      }
    })
  }

  // getRoom2(id: any) {
  //   this.router.navigate([`/room-order-change/${id}`]);
  // }

  handleCancel1(): void {
    this.isVisible1 = false;
  }

  ngOnInit(): void {
    this.getRoomsOfBill();
  }

  showModalThanhToan(): void {
    this.isVisibleTT = true;
  }

  handleOkThanhToan(): void {
    this.billService.updateStatus(this.bill.id, 2).subscribe({
      next: (res) => {
        console.log(res);
        this.bill.trangThai = 2;
      },
    })
    this.message.success('Bạn đã thanh toán hóa đơn thành công, vui lòng chờ xác nhận!');
    this.sendDataToApi();
    this.isVisibleTT = false;
  }

  handleCancelThanhToan(): void {
    console.log('Button cancel clicked!');
    this.isVisibleTT = false;
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

  generateImageUrl(amount: number, addInfo: string, accountName: string): string {
    const baseUrl = 'https://img.vietqr.io/image/vpb-62624112003-compact.jpg';
    const urlWithParams = `${baseUrl}?amount=${amount}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;
    return urlWithParams;
  }

  updateImageUrl(): void {
    const {amount, addInfo, accountName} = this.form.value;
    console.log(amount);
    console.log(addInfo);
    this.imageUrl = this.generateImageUrl(amount, addInfo, accountName);
  }

  protected readonly formatNumber = formatNumber;
  protected readonly Number = Number;
}
