import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccountService} from "../../../../modules/account/services/account.service";
import {AuthService} from "../../../../auth/services";
import {UserModel} from "../../../../auth/models/user.model";

@Component({
  selector: 'cons-step',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {
  user: UserModel | undefined;
  isMarketingAccepted: boolean = false;
  isVisible = false;
  constructor(private router: Router, private accountService: AccountService, private authService: AuthService) {
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
      }
    })
  }

  handleSave() {
    this.router.navigate(['/me/step/2']);
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
