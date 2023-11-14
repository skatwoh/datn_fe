import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, Observable, Subscription} from "rxjs";
import {RoomInformationModel} from "../../../models/room-information.model";
import {RoomTypeDtoModel} from "../../../models/room-type-dto.model";
import {UserModel} from "../../../auth/models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoomInformationService} from "../../room-details/services/room-information.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../room/services/room.service";
import {AuthService} from "../../../auth/services";
import {RoomManagerService} from "../services/room-manager.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {AppConstants} from "../../../app-constants";
import {HttpClient} from "@angular/common/http";
import {AccountService} from "../../account/services/account.service";
import {AccountModel} from "../../account/models/account.model";

@Component({
  selector: 'cons-room-manager-details',
  templateUrl: './room-manager-details.component.html',
  styleUrls: ['./room-manager-details.component.scss']
})
export class RoomManagerDetailsComponent implements OnInit, OnDestroy {
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
  accounts: AccountModel[] = [];

  constructor(public roomService: RoomInformationService, private router: Router, private route: ActivatedRoute,
              private roomService1: RoomService, private authService: AuthService, private roomManagerService: RoomManagerService,
              private formBuilder: FormBuilder, private notification: NzNotificationService, private accountService: AccountService,
              private http : HttpClient) {
    this.user$ = this.authService.currentUser$;
    this.user = this.authService.currentUserValue;
    this.roomOrderForm = this.formBuilder.group({
      userId: [0, Validators.required],
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
    this.accountService.getUserList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.accounts = res.content;
      }
    })
    this.roomService.getRoom(this.idPhong).subscribe((data: RoomInformationModel) => {
      this.room = data;
    });
  }

  messSuccess(): void {
    this.notification.blank('Bạn đã đặt phòng '+ this.room.maPhong , 'Thành công.', {
      nzKey: 'key'
    });
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
              this.router.navigate(['/admin/room-manager']);
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
