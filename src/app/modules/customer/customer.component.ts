import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from './models/customer.model';
import { CustomerService } from './services/customer.service';
import {RoomModel} from "../../models/room.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {BillService} from "../bill/bill.service";
import {RoomOrder} from "../../models/room-order";

interface DataItem {
  name: string;
  chinese: number;
  math: number;
  english: number;
}

@Component({
  selector: 'cons-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{
  customer: CustomerModel[] = [];
  currentCustomer!: CustomerModel;
  message ='';
  isVisible = false;
  isOkLoading = false;
  roomOrders: RoomOrder[] = [];
  isVisibleLichSu = false;
  searchInput: string = "";

  // detail
  id: number | undefined;


  listOfColumn2 = [
    {
      title: 'Mã',
      compare: (a: CustomerModel, b: CustomerModel) => a.ma.localeCompare(b.ma),
      priority: 6
    },
    {
      title: 'Tên',
      compare: (a: CustomerModel, b: CustomerModel) => a.hoTen.localeCompare(b.hoTen),
      priority: 5
    },
    {
      title: 'Số CCCD',
      compare: (a: CustomerModel, b: CustomerModel) => a.cccd.localeCompare(b.cccd),
      priority: 4
    },
    {
      title: 'Ngày sinh',
      compare: (a: CustomerModel, b: CustomerModel) => String(a.ngaySinh).localeCompare(String(b.ngaySinh)),
      priority: 3
    },
    {
      title: 'Số điện thoại',
      compare: (a: CustomerModel, b: CustomerModel) => a.sdt.localeCompare(b.sdt),
      priority: 2
    },
    {
      title: 'Email',
      compare: (a: CustomerModel, b: CustomerModel) => a.diaChi.localeCompare(b.diaChi),
      priority: 7
    },
    {
      title: 'Tích điểm',
      compare: (a: CustomerModel, b: CustomerModel) => Number.parseInt(a.ghiChu) - Number.parseInt(b.ghiChu),
      priority: 1
    }
  ]


  constructor(private customerService: CustomerService,
              private router: Router,
              private messageNoti: NzMessageService,
              private billService: BillService) { }

  private getCustomers(): void {
    this.customerService.getCustomerList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.customer= res.content;
      }
    })
  }

  getListKHByString(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.customerService.getListKHBySearch(1, 50, this.searchInput).subscribe(res => {
      const queryParams = {
        searchInput: this.searchInput
      };
      if (res && res.content) {
        this.customer = res.content;
      }
      // this.router.navigate(['/room'], { queryParams });
    })
  }

  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.customerService.get(this.id).subscribe((data: CustomerModel) => {
      this.currentCustomer = data;
      console.log(this.currentCustomer);
    });
  }

  handleOk(): void {
    if((document.getElementById('sdt') as HTMLInputElement).value.length !== 10){
      this.messageNoti.warning('Số điện thoại không hợp lệ!');
      return;
    }
    if((document.getElementById('hoTen') as HTMLInputElement).value == ''){
      this.messageNoti.warning('Họ tên không được để trống!');
      return;
    }
    this.isOkLoading = true;
    this.updateCustomer();
    setTimeout(() => {
      this.messageNoti.success('Cập nhật thành công', {
        nzDuration: 5000
      });
      this.isVisible = false;
      this.isOkLoading = false;
      this.getCustomers();
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  updateCustomer(): void {
    this.customerService
      .update(this.currentCustomer.id, this.currentCustomer)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : this.messageNoti.success('Update thành công', {
              nzDuration: 5000
            });
          this.getCustomers();
        },
        error: (e) => console.error(e)
      });
  }

  showLichSuDatPhong(id: any){
    this.isVisibleLichSu = true;
    this.billService.getDatPhongByKH(1, 10000, id).subscribe(res => {
      if (res && res.content) {
        this.roomOrders = res.content;
      }
    })
  }

  cancelLichSu(){
    this.isVisibleLichSu = false;
  }

  sendPointToCustomer(id: any, email: string){
    if(email == '' || email == null){
      this.messageNoti.warning('Khách hàng này chưa có email!');
      return;
    }
    this.customerService.sendPointsToCustommer(id).subscribe({});
    this.messageNoti.success('Gửi thành công!');
  }

  ngOnInit() {
    this.getCustomers();
  }
}
