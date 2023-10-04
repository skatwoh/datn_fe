import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from './models/customer.model';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'cons-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{
  customer: CustomerModel[] = [];
  constructor(private customerService: CustomerService, private router: Router) { }

  private getCustomers(): void {
    this.customerService.getCustomerList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.customer= res.content;
      }
    })
  }
  ngOnInit() {
    this.getCustomers();
  }
}
