import { Component, OnInit } from '@angular/core';
import { RoomInformationModel } from "../../../models/room-information.model";
import { RoomInformationService } from "../services/room-information.service";
import { RoomModel } from "../../../models/room.model";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cons-room-information-create',
  templateUrl: './room-information-create.component.html',
  styleUrls: ['./room-information-create.component.scss']
})
export class RoomInformationCreateComponent implements OnInit {
  roomInformationForm: FormGroup;
  room: RoomModel[] = [];
  submitted = false;

  constructor(
    private roomInformationService: RoomInformationService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.roomInformationForm = this.formBuilder.group({
      tang: ['', Validators.required],
      tienIch: ['', Validators.required],
      dichVu: ['', Validators.required],
      soLuongNguoi: [0, Validators.required],
      dienTich: [0, Validators.required],
      trangThai: 1,
      idPhong: ['', Validators.required]
    });
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
        },
        error: (e) => console.error(e)
      });
    }
  }

  newRoomInformation(): void {
    this.submitted = false;
    this.roomInformationForm.reset();
  }
}
