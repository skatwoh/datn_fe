import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {environment} from "../../../../environments/environment";
import {MaintenanceModel} from "../../../models/maintenance.model";
import {RoomInformationModel} from "../../../models/room-information.model";
import {MaintenanceService} from "../service/maintenance.service";
import {Router} from "@angular/router";
import {first, Subscription} from "rxjs";
import {AppConstants} from "../../../app-constants";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'cons-maintenance-create',
  templateUrl: './maintenance-create.component.html',
  styleUrls: ['./maintenance-create.component.scss']
})
export class MaintenanceCreateComponent implements OnInit{
  maintenanceForm: FormGroup;
message1: string = '';
  roomInfor : RoomInformationModel[] = [];
  submitted = false;
  hasError: boolean = false;

  private unsubscribe: Subscription[] = [];

  constructor(private maintenanceService: MaintenanceService, private http : HttpClient, private message: NzMessageService,  private fb: FormBuilder,private router: Router,private notification:NzNotificationService) {
    this.maintenanceForm = this.fb.group({
    ngayBatDau: ['', Validators.required],
    ngayKetThuc: ['', Validators.required],
    ghiChu: [0, Validators.required],
    chiPhiBaoTri: new FormControl(null, Validators.compose([Validators.nullValidator, Validators.min(1000), Validators.max(100000000000)])),
    trangThai: 1,
    idChiTietPhong: ['', Validators.required]
  });}

  ngOnInit() {

    this.http.get<any>(`${environment.apiUrl}/bao-tri/list-room-infor`).subscribe((dataRoom)  => {
      this.roomInfor = dataRoom; // Gán dữ liệu lấy được vào biến roomType
    });
  }



  successMessage(): void {
    this.message.success('Thêm thành công');
  }

  saveMaintenance(): void {
    if (this.maintenanceForm.valid) {
      const data = this.maintenanceForm.value;

      const sub = this.maintenanceService.create(data)
        .pipe(first())
        .subscribe((res) => {
            if (res?.code === AppConstants.API_SUCCESS_CODE){
              this.submitted = true;
              this.successMessage();
              this.router.navigate(['/admin/maintenance']);
              // this.showModal();
            } else {
              if (res?.code === AppConstants.API_BAD_REQUEST_CODE && res?.entityMessages.length > 0) {
                const msg: any = res.entityMessages[0];
                this.notification.warning(`${msg.errorMessage}`, "");
              } else {
                this.message1 = `Error`;
              }
              this.hasError = true;
            }
          },
        );
      this.unsubscribe.push(sub);
    }
  }



  protected readonly maintenanceModel = MaintenanceModel;
}
