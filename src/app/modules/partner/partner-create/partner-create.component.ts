import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {FormBuilder} from "@angular/forms";
import {PartnerModel} from "../../../models/partner.model";
import {PartnerService} from "../services/partner.service";

@Component({
  selector: 'cons-partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.scss']
})
export class PartnerCreateComponent {
  partner : PartnerModel = {
    id: 0,
    ma: '',
    tenCongTy: '',
    ghiChu: '',
    trangThai: 0
  };

  submitted = false;
  hasError: boolean = false;

  constructor(private partnerService: PartnerService, private http : HttpClient, private message: NzMessageService,  private fb: FormBuilder) {}

  ngOnInit() {

    // this.http.get<any>(`${environment.apiUrl}/bao-tri/list-room-infor`).subscribe((dataRoom)  => {
    //   this.roomInfor = dataRoom; // Gán dữ liệu lấy được vào biến roomType
    // });
  }



  successMessage(): void {
    this.message.success('Thêm thành công');
  }

  savePartner(): void {
    const data = {
      ma: this.partner.ma,
      tenCongTy: this.partner.tenCongTy,
      ghiChu: this.partner.ghiChu,
      trangThai: 1,

    };

    this.partnerService.create(data).subscribe({
      next: (res) => {
        this.successMessage();
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newPartner(): void {
    this.submitted = false;
    this.partner = {
      id: 0,
      ma: '',
      tenCongTy: '',
      ghiChu: '',
      trangThai: 0
    };
  }

  protected readonly partnerModel = PartnerModel;
}
