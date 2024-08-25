import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../../../auth/services";
import {UpdatePasswordModel} from "../../../../models/update-password.model";
import {ServiceService} from "../service/service.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../../../shared/utils";
import {UserModel} from "../../../../auth/models/user.model";
import {ListRoomOrderService} from "../list-room-order/list-room-order.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {CustomerModel} from "../../../../modules/customer/models/customer.model";
import {CustomerService} from "../../../../modules/customer/services/customer.service";

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
  countRoom: number | undefined;
  khachHang !: CustomerModel ;

  constructor(private authService: AuthService, private service: ServiceService, private fb: FormBuilder,
              private roomOrderService: ListRoomOrderService, private mess : NzMessageService,
              private customerService : CustomerService) {
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
    this.customerService.getKhachHangByUser(this.user?.id).subscribe(res => {
      console.log(res)
      this.khachHang = res ;
    })
    setTimeout(() => {
      if(this.khachHang){
        this.roomOrderService.getListRoomOrder(1, 50, this.khachHang.id).subscribe(res => {
          if (res && res.content) {
            this.countRoom = res.content.length;
          }
        });
      }
    }, 1000)
  }

  handleOk(form: FormGroup): void {
    this.hasError = false;
    if(form.valid) {
      const data: UpdatePasswordModel = form.value;
      this.service.updatePassword(data).subscribe((res) => {
          this.mess.success('Bạn đã đổi mật khẩu thành công');
        this.isVisible = false;
      })
    }
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
