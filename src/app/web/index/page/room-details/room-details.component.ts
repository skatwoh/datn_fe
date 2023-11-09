import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomTypeDtoModel} from "../../../../models/room-type-dto.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomInformationModel} from "../../../../models/room-information.model";
import {RoomInformationService} from "../../../../modules/room-details/services/room-information.service";
import {first, Observable, Subscription} from "rxjs";
import {AuthService} from "../../../../auth/services";
import {RoomManagerService} from "../../../../modules/room-manager/services/room-manager.service";
import {UserModel} from "../../../../auth/models/user.model";
import {RoomService} from "../../../../modules/room/services/room.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {AppConstants} from "../../../../app-constants";

@Component({
  selector: 'cons-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit, OnDestroy {
  user$: Observable<any>;
  idPhong: number | undefined;
  room!: RoomInformationModel;
  roomType: RoomTypeDtoModel[] = [];
  message = '';
  user: UserModel | undefined;
  roomOrderForm: FormGroup;
  hasError = false;
  submitted = false;
  private unsubscribe: Subscription[] = [];

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
    if(this.user?.name == null){
      this.router.navigate(['/hotel/login']);
    }
    this.hasError = false;
    if (this.roomOrderForm.valid) {
      const data = this.roomOrderForm.value;

      const sub = this.roomManagerService.create(data)
        .pipe(first())
        .subscribe((res) => {
          if (res?.code === AppConstants.API_SUCCESS_CODE){
            this.submitted = true;
            this.messSuccess();
            this.router.navigate(['/']);
          } else {
            if (res?.code === AppConstants.API_BAD_REQUEST_CODE && res?.entityMessages.length > 0) {
              const msg: any = res.entityMessages[0];
              this.notification.warning(`${msg.errorMessage}`, "");
            } else {
              this.message = `Error`;
            }
            this.hasError = true;
          }
        },
      );
      this.unsubscribe.push(sub);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  protected readonly Number = Number;
}
