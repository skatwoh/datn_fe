import {Component, OnInit, TemplateRef} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../../../auth/services";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {UpdatePasswordModel} from "../../../../models/update-password.model";
import {ServiceService} from "../service/service.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../../../shared/utils";
import {UserModel} from "../../../../auth/models/user.model";

@Component({
  selector: 'cons-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user$: Observable<any>;
  isVisible = false;
  // @ts-ignore
  form: FormGroup;
  hasError: boolean = false;
  message: string | undefined = '';
  update: UpdatePasswordModel | undefined;
  user: UserModel | undefined;

  constructor(private authService: AuthService, private service: ServiceService, private fb: FormBuilder) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
        this.initForm();
    }

  showModal(): void {
    this.isVisible = true;
  }

  private initForm(): void {
    this.user = this.authService.currentUserValue;
    this.form = this.fb.group({
      password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(24)])),
      newPassword: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(24)])),
      passwordAgain: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(24)])),
      email: this.user?.email
    },
      {
        validator: MustMatch(
          {name: 'newPassword', label: 'Mật khẩu mới'},
          {name: 'passwordAgain', label: 'Xác nhận mật khẩu'}
        ),}
      );
  }

  handleOk(form: FormGroup): void {
    this.hasError = false;
    if(form.valid) {
      const data: UpdatePasswordModel = form.value;
      this.service.updatePassword(data).subscribe((res) => {
          this.isVisible = false;
      })
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
