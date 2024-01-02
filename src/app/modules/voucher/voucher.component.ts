import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {environment} from "../../../environments/environment";
import {VoucherModel} from "../../models/voucher.model";
import {VoucherService} from "./services/voucher.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'cons-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit{
  voucher: VoucherModel[] = [];
  currentVoucher!: VoucherModel;
  message ='';
  isVisible = false;
  isOkLoading = false;
  id: number | undefined;
  form: FormGroup;

  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.voucherService.get(this.id).subscribe((data: VoucherModel) => {
      this.currentVoucher = data;
      console.log(this.currentVoucher);
    });
  }

  handleOk(): void {
    if (!this.form.valid) {
      return;
    }
    this.isOkLoading = true;
    this.updateVoucher();
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  constructor(private voucherService: VoucherService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient, private messageNoti: NzMessageService,
              private formBuilder: FormBuilder
              ) {
    this.form = this.formBuilder.group({
      moTa: [''],
      giamGia: [0],
      ngayBatDau: [''],
      ngayKetThuc: [''],
      soLuong: [0]
    })
  }

  private getVouchers(): void {
    this.voucherService.getVoucherList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.voucher= res.content;
      }
    })
  }

  searchInput :string = '';
  getVouchersSearch(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.voucherService.getVoucherListSearch(1, 50, this.searchInput).subscribe(res => {
      if (res && res.content) {
        this.voucher= res.content;
      }
    })
  }

  updateVoucherStatus(id: any, status: number): void {
    this.voucherService.get(id).subscribe((data: VoucherModel) => {
      this.currentVoucher = data;
      console.log(this.currentVoucher);
    });
    this.voucherService.updateStatus(id, status)
      .subscribe({
        next: (res) => {
          this.message = res.message
          this.currentVoucher.trangThai = status
          this.getVouchers();
        },
      });
  }

  updateVoucher(): void {
    this.voucherService
      .update(this.currentVoucher.id, this.currentVoucher)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : this.messageNoti.success('Update thành công', {
              nzDuration: 5000
            });
          this.getVouchers();
        },
        error: (e) => console.error(e)
      });
  }


  ngOnInit() {
    this.getVouchers();
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-voucher-type`).subscribe((data2)  => {

    });
  }

}
