import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../services/room.service";
import {RoomModel} from "../../../models/room.model";
import {RoomTypeService} from "../../room-category/services/room-type.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {RoomTypeDtoModel} from "../../../models/room-type-dto.model";

@Component({
  selector: 'cons-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent implements OnInit {
  id: number | undefined;
  roomModel!: RoomModel;
  roomType : RoomTypeDtoModel[] = [];
  message ='';
  constructor(public roomService: RoomService, public roomTypeService: RoomTypeService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient) {}



  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2)  => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
      console.log(data2);
      console.log(this.roomType);
    });
    this.id = this.route.snapshot.params['id'];
    this.roomService.get(this.id).subscribe((data: RoomModel) => {
      this.roomModel = data;
      console.log(this.roomModel);
    });
  }

  updateRoom(): void {
    this.roomService
      .update(this.roomModel.id, this.roomModel)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'Update thành công!'
        },
        error: (e) => console.error(e)
      });
    this.router.navigate(['/admin/room']);
  }
}
