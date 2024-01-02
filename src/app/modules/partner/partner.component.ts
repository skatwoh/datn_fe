import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {PartnerModel} from "../../models/partner.model";
import {PartnerService} from "./services/partner.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'cons-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit{
    partner: PartnerModel[] = [];
    currentPartner!: PartnerModel;
    message ='';
    isVisible = false;
    isOkLoading = false;

    // detail
    id: number | undefined;
    // roomModel!: RoomModel;
  form: FormGroup;

    showModal(id: any): void {
        this.isVisible = true;
        this.id = id;
        this.partnerService.get(this.id).subscribe((data: PartnerModel) => {
            this.currentPartner = data;
            console.log(this.currentPartner);
        });
    }

    handleOk(): void {
      if (!this.form.valid) {
        return;
      }
        this.isOkLoading = true;
        this.updatePartner();
        setTimeout(() => {
            this.isVisible = false;
            this.isOkLoading = false;
        }, 500);
    }

    handleCancel(): void {
        this.isVisible = false;
    }
    constructor(private partnerService: PartnerService, private router: Router,
                private route: ActivatedRoute, private http : HttpClient, private messageNoti: NzMessageService,
                private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        tenCongTy: [''],
        ghiChu: ['']
      })
    }

    private getPartners(): void {
        this.partnerService.getPartnerList(1, 50).subscribe(res => {
            if (res && res.content) {
                this.partner= res.content;
            }
        })
    }

    searchInput :string = '';
    getPartnerSearch(): void {
        const inputElement = document.getElementById('searchInput') as HTMLInputElement;
        this.searchInput = inputElement.value;
        this.partnerService.getPartnerListSearch(1, 50, this.searchInput).subscribe(res => {
            if (res && res.content) {
                this.partner= res.content;
            }
        })
    }

    updatePartnerStatus(id: any, status: number): void {
        this.partnerService.get(id).subscribe((data: PartnerModel) => {
            this.currentPartner = data;
            console.log(this.currentPartner);
        });
        this.partnerService.updateStatus(id, status)
            .subscribe({
                next: (res) => {
                    this.message = res.message
                    this.currentPartner.trangThai = status
                    this.getPartners();
                },
            });
    }

    updatePartner(): void {
        this.partnerService
            .update(this.currentPartner.id, this.currentPartner)
            .subscribe({
                next: (res) => {
                    console.log(res);
                    this.message = res.message
                        ? res.message
                        : this.messageNoti.success('Update thành công', {
                            nzDuration: 5000
                        });
                    this.getPartners();
                },
                error: (e) => console.error(e)
            });
    }

    ngOnInit() {
        this.getPartners();
        // this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2)  => {
        //     this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
        //     console.log(data2);
        //     console.log(this.roomType);
        // });
    }
}
