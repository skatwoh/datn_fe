import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomModel} from "../../../models/room.model";
import {RoomService} from "../services/room.service";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from 'ng-zorro-antd/message';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first, Observable, Subscription} from "rxjs";
import {AppConstants} from "../../../app-constants";
import {Router} from "@angular/router";
import {RoomTypeModel} from "../../../models/room-type.model";
import {da_DK} from "ng-zorro-antd/i18n";

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
    tenLoaiPhong: '',
    image: '',
  };
  roomType: RoomTypeModel[] = [];
  roomList: RoomModel[] = [];
  submitted = false;
  submitForm: FormGroup;
  hasError: boolean = false;
  errorMsg = '';
  private unsubscribe: Subscription[] = [];

  constructor(private roomService: RoomService,
              private http: HttpClient,
              private message: NzMessageService,
              private fb: FormBuilder,
              private router: Router) {
    this.submitForm = this.fb.group({
      giaPhong: 300000,
      idLoaiPhong: ['']
    })
  }

  getRooms(): void {
    this.roomService.getRoomList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.roomList = res.content;
      }
    })
  }

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((dataRoom) => {
      this.roomType = dataRoom; // Gán dữ liệu lấy được vào biến roomType
    });
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

      // Lấy file hình ảnh từ input type="file"
      const fileInput: HTMLInputElement = document.getElementById('image') as HTMLInputElement;
      const file: File | null = (fileInput.files && fileInput.files.length > 0) ? fileInput.files[0] : null;

      if (file) {
        // Đọc file thành chuỗi Base64
        const reader = new FileReader();
        reader.onloadend = () => {
          payload.image = reader.result as string; // Thêm trường base64Image vào payload
          this.createRoom(payload);
        };
        reader.readAsDataURL(file);
      } else {
        this.createRoom(payload);
      }
    }
  }

  createRoom(payload: RoomModel): void {
    // const registrationSubScr = this.roomService
    //   .create(payload)
    //   .pipe(first())
    //   .subscribe((res: any) => {
    //     if (res?.code === AppConstants.API_SUCCESS_CODE) {
    //       this.router.navigate(['admin/room/room-create']);
    //     } else {
    //       if (res?.code === AppConstants.API_BAD_REQUEST_CODE && res?.entityMessages.length > 0) {
    //         const msg: any = res.entityMessages[0];
    //         this.errorMsg = `[${msg.key}] ${msg.errorMessage}`;
    //       } else {
    //         this.errorMsg = `Vui lòng nhập thông tin hợp lệ`;
    //       }
    //
    //       this.hasError = true;
    //     }
    //   });
    // this.unsubscribe.push(registrationSubScr);
    // this.successMessage();

    if (this.submitForm.valid) {
      // const data = this.submitForm.value;

      this.roomService.create(payload).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.successMessage();
          this.router.navigate(['/admin/room']);
        },
        error: (e) => console.error(e)
      });
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
      tenLoaiPhong: '',
      image: ''
    };
  }

  protected readonly RoomModel = RoomModel;


}
