import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {environment} from "../../../environments/environment";
import {MaintenanceModel} from "../../models/maintenance.model";
import {RoomInformationModel} from "../../models/room-information.model";
import {MaintenanceService} from "./service/maintenance.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'cons-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit{
  maintenance: MaintenanceModel[] = [];
  currentMaintenance!: MaintenanceModel;
  message ='';
  isVisible = false;
  isOkLoading = false;
  form: FormGroup;
  // detail
  id: number | undefined;
  // roomModel!: RoomModel;
  roomInfor : RoomInformationModel[] = [];
  ghiChu: string = '';
  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.maintenanceService.get(this.id).subscribe((data: MaintenanceModel) => {
      this.currentMaintenance = data;
      console.log(this.currentMaintenance);
    });
  }

  handleOk(): void {
    if (!this.form.valid) {
      return;
    }
    this.isOkLoading = true;
    this.updateRoom();
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  constructor(private maintenanceService: MaintenanceService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient, private messageNoti: NzMessageService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      ngayBatDau: [''],
      ngayKetThuc: [''],
      chiPhiBaoTri: [0],
      ghiChu: ['']
    })
  }

  private getMaintenance(): void {
    this.maintenanceService.getMaintenanceList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.maintenance= res.content;
      }
    })
  }

  searchInput :string = '';
  getMaintenanceSearch(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.maintenanceService.getMaintenanceListSearch(1, 50, this.searchInput).subscribe(res => {
      if (res && res.content) {
        this.maintenance= res.content;
      }
    })
  }

  updateMaintenanceStatus(id: any, status: number): void {
    this.maintenanceService.get(id).subscribe((data: MaintenanceModel) => {
      this.currentMaintenance = data;

    });
    this.maintenanceService.updateStatus(id, status)
      .subscribe({
        next: (res) => {
          this.message = res.message
          this.currentMaintenance.trangThai = status
          this.getMaintenance();
        },
      });
  }

  updateRoom(): void {
    this.maintenanceService
      .update(this.currentMaintenance.id, this.currentMaintenance)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : this.messageNoti.success('Update thành công', {
              nzDuration: 5000
            });
          this.getMaintenance();
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit() {

    this.getMaintenance();
    this.http.get<any>(`${environment.apiUrl}/bao-tri/list-room-infor`).subscribe((data2)  => {
      this.roomInfor = data2; // Gán dữ liệu lấy được vào biến roomType
      console.log(data2);
      console.log(this.roomInfor);
    });
  }

  changeTest() {
    this.id = Number((document.getElementById('ctphong') as HTMLInputElement).value);
    this.ghiChu = (document.getElementById('ghiChu1') as HTMLInputElement).value;
    this.maintenanceService.getMaintenanceListTest(1, 50, this.id, this.ghiChu).subscribe(res => {
      this.maintenance = res;
      console.log(res);
    })
  }

}
