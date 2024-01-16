import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../../../../modules/account/services/account.service";
import {AuthService} from "../../../../auth/services";
import {UserModel} from "../../../../auth/models/user.model";
import {CustomerService} from "../../../../modules/customer/services/customer.service";

@Component({
  selector: 'cons-step',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  user: UserModel | undefined;
  isMarketingAccepted: boolean = false;
  isVisible = false;
  constructor(private router: Router, private accountService: AccountService, private authService: AuthService,
              private customerService: CustomerService) {
  }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
    this.getDetailAccount(this.user?.email);
  }

  getDetailAccount(email: any) {
    this.accountService.getUsersDetail(email).subscribe(res => {
      if(res) {
        (document.getElementById('name') as HTMLInputElement).value = res.body.name;
        (document.getElementById('email') as HTMLInputElement).value = res.body.email;
        (document.getElementById('phone') as HTMLInputElement).value = res.body.sdt;
        (document.getElementById('birth') as HTMLInputElement).value = res.body.ngaySinh;
        (document.getElementById('address') as HTMLInputElement).value = res.body.diaChi;
        (document.getElementById('cccd') as HTMLInputElement).value = res.body.cccd;
        const genderInputElement = document.querySelector('input[name="gender"]:checked') as HTMLInputElement;
        if (genderInputElement) {
          genderInputElement.value = res.body.gioiTinh;
        }
      }
    })
  }

  handleSave() {
    const noteElement = document.getElementById('note') as HTMLInputElement;

    const data = {
      hoTen: (document.getElementById('name') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      sdt: (document.getElementById('phone') as HTMLInputElement).value,
      ngaySinh: (document.getElementById('birth') as HTMLInputElement).value,
      diaChi: (document.getElementById('address') as HTMLInputElement).value,
      gioiTinh: (document.querySelector('input[name="gender"]:checked') as HTMLInputElement)?.value === 'true',
      ghiChu: noteElement ? noteElement.value : "",
      cccd: (document.getElementById('cccd') as HTMLInputElement).value,
    }
    this.customerService.updateCustomer(this.user?.id, data).subscribe(res => {
      this.router.navigate(['/me/step/2']);
    })
  }

  onMarketingAcceptChange(event: any) {
    this.isMarketingAccepted = event.target.checked;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
