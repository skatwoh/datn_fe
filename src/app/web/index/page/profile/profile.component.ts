import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../../../auth/services";
import {NzMessageService} from "ng-zorro-antd/message";
import {AccountService} from "../../../../modules/account/services/account.service";
import {AccountModel} from "../../../../modules/account/models/account.model";
import {PasswordUpdateModel} from "../../../../auth/models/password-update.model";

@Component({
  selector: 'cons-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<any>;
  isVisible = false;
  isOkLoading = false;
  email: string | undefined;
  currentAcount!: AccountModel;
  passUpdateModel!: PasswordUpdateModel;

  constructor(private authService: AuthService, private acountService: AccountService, private messageNoti: NzMessageService) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {

  }

  showModal(email: string): void {
    this.isVisible = true;
    this.email = email;
    this.acountService.getUsersDetail(this.email).subscribe((data: AccountModel) => {
      this.currentAcount = data;
      console.log(this.currentAcount);
    });
  }

  updatePassWord(): void {
    const newPass = document.getElementById('newpass') as HTMLInputElement;
    this.acountService.updatePass(this.currentAcount.email, newPass.value)
      .subscribe({
        next: (res) => {
          this.passUpdateModel.newPassword = newPass.value;
        },
      });
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.updatePassWord();
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
