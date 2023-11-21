import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomModel} from "../../../models/room.model";
import {RoomService} from "../services/room.service";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RoomTypeDtoModel} from "../../../models/room-type-dto.model";
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first, Observable, Subscription} from "rxjs";
import {AppConstants} from "../../../app-constants";
import {Router} from "@angular/router";
import {RoomTypeModel} from "../../../models/room-type.model";

@Component({
  selector: 'cons-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss']
})
export class RoomCreateComponent implements OnInit, OnDestroy {


  room: RoomModel = {
    id: 0,
    ma: '',
    giaPhong: 0,
    trangThai: 0,
    idLoaiPhong: 0,
    tenLoaiPhong: ''
  };
  roomType: RoomTypeModel[] = [];
  roomList: RoomModel[] = [];
  submitted = false;
  // @ts-ignore
  submitForm: FormGroup;
  hasError: boolean = false;
  errorMsg = '';
  private unsubscribe: Subscription[] = [];

  constructor(private roomService: RoomService,
              private http: HttpClient,
              private message: NzMessageService,
              private fb: FormBuilder,
              private router: Router) {
  }

  private getRooms(): void {
    this.roomService.getRoomList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.roomList= res.content;
      }
    })
  }

  ngOnInit() {
    this.initForm();
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((dataRoom) => {
      this.roomType = dataRoom; // Gán dữ liệu lấy được vào biến roomType
    });
  }

  private initForm(): void {
    this.submitForm = this.fb.group({
      giaPhong: new FormControl(null, Validators.compose([Validators.nullValidator, Validators.min(1000), Validators.max(100000000000)])),
      idLoaiPhong: new FormControl(null, Validators.compose([Validators.nullValidator])),

    })
  }

  successMessage(): void {
    this.message.success('Thêm thành công');
  }

  saveRoom(): void {
    const data = {
      ma: this.room.ma,
      giaPhong: this.room.giaPhong,
      trangThai: 1,
      idLoaiPhong: this.room.idLoaiPhong
    };
    this.roomService.create(data).subscribe({
      next: (res) => {
        this.successMessage();
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  onSubmit(form: FormGroup): void {
    const {valid, value} = form;
    this.hasError = false;
    this.errorMsg = '';

    if (valid) {
      const payload: RoomModel = value;
      const registrationSubScr = this.roomService
        .create(payload)
        .pipe(first())
        .subscribe((res: any) => {
          if (res?.code === AppConstants.API_SUCCESS_CODE) {
            this.router.navigate(['admin/room/room-create']);
          } else {
            if (res?.code === AppConstants.API_BAD_REQUEST_CODE && res?.entityMessages.length > 0) {
              const msg: any = res.entityMessages[0];
              this.errorMsg = `[${msg.key}] ${msg.errorMessage}`;
            } else {
              this.errorMsg = `Vui long nhap thong tin hop le`;
            }

            this.hasError = true;
          }
        });
      this.unsubscribe.push(registrationSubScr);
      this.successMessage();
      this.getRooms();
      this.router.navigate(['/admin/room']);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  newRoom(): void {
    this.submitted = false;
    this.room = {
      id: 0,
      ma: '',
      giaPhong: 0,
      trangThai: 0,
      idLoaiPhong: 0,
      tenLoaiPhong: ''
    };
  }

  protected readonly RoomModel = RoomModel;


}
