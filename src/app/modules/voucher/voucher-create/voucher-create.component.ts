import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {environment} from "../../../../environments/environment";
import {VoucherModel} from "../../../models/voucher.model";
import {VoucherService} from "../services/voucher.service";

@Component({
  selector: 'cons-voucher-create',
  templateUrl: './voucher-create.component.html',
  styleUrls: ['./voucher-create.component.scss']
})
export class VoucherCreateComponent implements  OnInit{


  voucher : VoucherModel = {
    id:  0  ,
    ma: '' ,
    moTa: '' ,
    giamGia: 0,
    ngayBatDau: '',
    ngayKetThuc: '',
    soLuong: 0,
    trangThai: 0
  };

  submitted = false;
  hasError: boolean = false;

  constructor(private voucherService: VoucherService, private http : HttpClient, private message: NzMessageService,  private fb: FormBuilder) {}

  ngOnInit() {


  }



  successMessage(): void {
    this.message.success('Thêm thành công');
  }

  saveVoucher(): void {
    const data = {
      ma: this.voucher.ma,
      moTa: this.voucher.moTa,
      giamGia : this.voucher.giamGia,
      ngayBatDau: this.voucher.ngayBatDau,
      ngayKetThuc: this.voucher.ngayKetThuc,
      soLuong : this.voucher.soLuong,
      trangThai: 1,

    };

    this.voucherService.create(data).subscribe({
      next: (res) => {
        this.successMessage();
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newVoucher(): void {
    this.submitted = false;
    this.voucher = {
      id:  0  ,
      ma: '' ,
      moTa: '' ,
      giamGia: 0,
      ngayBatDau: '',
      ngayKetThuc: '',
      soLuong: 0,
      trangThai: 0
    };
  }

  protected readonly VoucherModel = VoucherModel;


}
