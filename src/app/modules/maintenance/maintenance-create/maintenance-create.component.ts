import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {environment} from "../../../../environments/environment";
import {MaintenanceModel} from "../../../models/maintenance.model";
import {RoomInformationModel} from "../../../models/room-information.model";
import {MaintenanceService} from "../service/maintenance.service";

@Component({
  selector: 'cons-maintenance-create',
  templateUrl: './maintenance-create.component.html',
  styleUrls: ['./maintenance-create.component.scss']
})
export class MaintenanceCreateComponent implements OnInit{

  maintenance : MaintenanceModel = {
    id: 0,
    idChiTietPhong: 0,
    ngayBatDau: '',
    ngayKetThuc: '',
    chiPhiBaoTri:0,
    ghiChu: '',
    trangThai: 0
  };
  roomInfor : RoomInformationModel[] = [];
  submitted = false;
  hasError: boolean = false;

  constructor(private maintenanceService: MaintenanceService, private http : HttpClient, private message: NzMessageService,  private fb: FormBuilder) {}

  ngOnInit() {

    this.http.get<any>(`${environment.apiUrl}/bao-tri/list-room-infor`).subscribe((dataRoom)  => {
      this.roomInfor = dataRoom; // Gán dữ liệu lấy được vào biến roomType
    });
  }



  successMessage(): void {
    this.message.success('Thêm thành công');
  }

  saveMaintenance(): void {
    const data = {
      ngayBatDau: this.maintenance.ngayBatDau,
      ngayKetThuc: this.maintenance.ngayKetThuc,
      chiPhiBaoTri: this.maintenance.chiPhiBaoTri,
      ghiChu: this.maintenance.ghiChu,
      trangThai: 1,
      idChiTietPhong: this.maintenance.idChiTietPhong
    };

    this.maintenanceService.create(data).subscribe({
      next: (res) => {
        this.successMessage();
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newMaintenance(): void {
    this.submitted = false;
    this.maintenance = {
      id: 0,
      idChiTietPhong: 0,
      ngayBatDau: '',
      ngayKetThuc: '',
      chiPhiBaoTri:0,
      ghiChu: '',
      trangThai: 0
    };
  }

  protected readonly maintenanceModel = MaintenanceModel;
}
