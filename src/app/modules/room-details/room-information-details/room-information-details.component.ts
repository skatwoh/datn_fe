import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomInformationModel} from "../../../models/room-information.model";
import {RoomInformationService} from "../services/room-information.service";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RoomTypeDtoModel} from "../../../models/room-type-dto.model";

@Component({
  selector: 'cons-room-information-details',
  templateUrl: './room-information-details.component.html',
  styleUrls: ['./room-information-details.component.scss']
})
export class RoomInformationDetailsComponent implements OnInit {

  id: number | undefined;
  room!: RoomInformationModel;
  roomType : RoomTypeDtoModel[] = [];
  message = '';

  constructor(public roomService: RoomInformationService, private router: Router, private route: ActivatedRoute, private http : HttpClient) {}

  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2)  => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
      console.log(data2);
      console.log(this.roomType);
    });
    this.id = this.route.snapshot.params['id'];
    this.roomService.get(this.id).subscribe((data: RoomInformationModel) => {
      this.room = data;
      console.log(this.room);
    });
  }

  updateRoom(): void {
    this.message = '';

    this.roomService
      .update(this.room.id, this.room)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This room was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
}
