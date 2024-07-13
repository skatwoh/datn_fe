import { Component, OnInit } from '@angular/core';
import { RoomInformationModel } from "../../../models/room-information.model";
import { RoomInformationService } from "../services/room-information.service";
import { RoomModel } from "../../../models/room.model";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";

@Component({
  selector: 'cons-room-information-create',
  templateUrl: './room-information-create.component.html',
  styleUrls: ['./room-information-create.component.scss']
})
export class RoomInformationCreateComponent implements OnInit {
  roomInformationForm: FormGroup;
  room: RoomModel[] = [];
  roomInforList: RoomInformationModel[] = [];
  submitted = false;

  constructor(
    private roomInformationService: RoomInformationService,
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.roomInformationForm = this.formBuilder.group({
      dichVu: ['', Validators.required],
      dienTich: new FormControl(null, Validators.compose([Validators.nullValidator, Validators.min(10), Validators.max(1000000000000)])),
      trangThai: 1,
      idPhong: ['', Validators.required]
    });
  }

  private getRooms(): void {
    this.roomInformationService.getRoomInformationList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.roomInforList= res.content;
      }
    })
  }

  successMessage(): void {
    this.message.success('Thêm thành công');
  }

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/chi-tiet-phong/single-list-room`).subscribe((dataRoom) => {
      this.room = dataRoom; // Assign the retrieved data to the room array
    });
  }

  saveRoomInformation(): void {
    if (this.roomInformationForm.valid) {
      const data = this.roomInformationForm.value;

      this.roomInformationService.create(data).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.successMessage();
          this.router.navigate(['/admin/room-information']);
        },
        error: (e) => console.error(e)
      });
    }
  }
}
