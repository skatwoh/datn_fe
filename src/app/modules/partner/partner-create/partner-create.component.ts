import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PartnerModel} from "../../../models/partner.model";
import {PartnerService} from "../services/partner.service";
import {Router} from "@angular/router";
import {first, Subscription} from "rxjs";
import {AppConstants} from "../../../app-constants";

@Component({
  selector: 'cons-partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.scss']
})
export class PartnerCreateComponent implements OnInit{


  partnerList: PartnerModel[] = [];
  submitted = false;
  hasError: boolean = false;


  submitForm: FormGroup ;
  constructor(private partnerService: PartnerService,
              private http : HttpClient,
              private message: NzMessageService,
              private fb: FormBuilder,
              private router: Router) {
    this.submitForm = this.fb.group({
      // ma: ['', Validators.required],
      tenCongTy: ['', Validators.required],
      ghiChu: ['', Validators.required],
      trangThai:1
    })
  }

  ngOnInit() {

  }



  successMessage(): void {
    this.message.success('Thêm thành công');
  }
   getPartners(): void {
    this.partnerService.getPartnerList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.partnerList= res.content;
      }
    })
  }
  savePartner(form:FormGroup): void {

    if (this.submitForm.valid) {
      const data = this.submitForm.value;

      this.partnerService.create(data).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.successMessage();
          this.router.navigate(['/admin/partner']);
        },
        error: (e) => console.error(e)
      });
    }
    };


}
