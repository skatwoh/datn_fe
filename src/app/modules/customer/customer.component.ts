import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from './models/customer.model';
import { CustomerService } from './services/customer.service';
import {RoomModel} from "../../models/room.model";
import {NzMessageService} from "ng-zorro-antd/message";

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

  // detail
  id: number | undefined;
  constructor(private customerService: CustomerService, private router: Router, private messageNoti: NzMessageService) { }

  private getCustomers(): void {
    this.customerService.getCustomerList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.customer= res.content;
      }
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
    this.isOkLoading = true;
    this.updateRoom();
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

  updateRoom(): void {
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

  ngOnInit() {
    this.getCustomers();
  }
}
