import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {RoomTypeDtoModel} from "../../../../models/room-type-dto.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomInformationModel} from "../../../../models/room-information.model";
import {RoomInformationService} from "../../../../modules/room-details/services/room-information.service";
import {Observable} from "rxjs";
import {AuthService} from "../../../../auth/services";
import {RoomManagerService} from "../../../../modules/room-manager/services/room-manager.service";
import {UserModel} from "../../../../auth/models/user.model";
import {RoomService} from "../../../../modules/room/services/room.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoomModel} from "../../../../models/room.model";
import {formatCurrency, getCurrencySymbol, getLocaleCurrencyName} from "@angular/common";
import {vi_VN} from "ng-zorro-antd/i18n";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'cons-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  user$: Observable<any>;
  idPhong: number | undefined;
  room!: RoomInformationModel;
  roomType: RoomTypeDtoModel[] = [];
  message = '';
  user: UserModel | undefined;
  roomOrderForm: FormGroup;
  submitted = false;

  constructor(public roomService: RoomInformationService, private router: Router, private route: ActivatedRoute,
              private roomService1: RoomService, private authService: AuthService, private roomManagerService: RoomManagerService,
              private formBuilder: FormBuilder, private notification: NzNotificationService) {
    this.user$ = this.authService.currentUser$;
    this.user = this.authService.currentUserValue;
    this.roomOrderForm = this.formBuilder.group({
      userId: this.user?.id,
      idPhong: this.idPhong = this.route.snapshot.params['id'],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      soNguoi: [0, Validators.required],
      tongGia: [0, Validators.required],
      trangThai: 1
    })
  }

  ngOnInit() {
    this.idPhong = this.route.snapshot.params['id'];
    this.roomService.getRoom(this.idPhong).subscribe((data: RoomInformationModel) => {
      this.room = data;
    });
  }

  messSuccess(): void {
    this.notification.blank('Bạn đã đặt phòng '+ this.room.maPhong , 'Thành công.', {
      nzKey: 'key'
    });

    setTimeout(() => {
      this.notification.blank('Chúc bạn ngày mới', 'tốt lành.', {
        nzKey: 'key'
      });
    }, 1000);
  }

  saveRoomOrder(): void {
    if (this.roomOrderForm.valid) {
      const data = this.roomOrderForm.value;

      this.roomManagerService.create(data).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.messSuccess();
          this.router.navigate(['/'])
        },
        error: (e) => console.error(e)
      })
    }
  }

  protected readonly Number = Number;
}
