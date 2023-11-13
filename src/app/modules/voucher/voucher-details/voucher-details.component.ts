import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {VoucherModel} from "../../../models/voucher.model";
import {VoucherService} from "../services/voucher.service";

@Component({
  selector: 'cons-voucher-details',
  templateUrl: './voucher-details.component.html',
  styleUrls: ['./voucher-details.component.scss']
})
export class VoucherDetailsComponent implements OnInit{
  id: number | undefined;
  voucherModel!: VoucherModel;
  message ='';
  constructor(public voucherService: VoucherService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient) {}



  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    this.voucherService.get(this.id).subscribe((data: VoucherModel) => {
      this.voucherModel = data;
      console.log(this.voucherModel);
    });
  }

  updateVoucher(): void {
    this.voucherService
      .update(this.voucherModel.id, this.voucherModel)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'Update thành công!'
        },
        error: (e) => console.error(e)
      });
    this.router.navigate(['/admin/voucher']);
  }
}
