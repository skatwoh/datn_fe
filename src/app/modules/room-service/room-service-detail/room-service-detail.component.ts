import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {RoomServiceModel} from "../../../models/room-service.model";
import {RoomServiceService} from "../service/room-service.service";

@Component({
  selector: 'cons-room-service-detail',
  templateUrl: './room-service-detail.component.html',
  styleUrls: ['./room-service-detail.component.scss']
})
export class RoomServiceDetailComponent implements OnInit{
  id: number | undefined;
  roomServiceModel!: RoomServiceModel;
  message ='';

  constructor(public roomServiceService: RoomServiceService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient) {}



  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.roomServiceService.get(this.id).subscribe((data: RoomServiceModel) => {
      this.roomServiceModel = data;
      console.log(this.roomServiceModel);
    });
  }

  updateRoomService(): void {

    this.roomServiceService
      .update(this.roomServiceModel.id, this.roomServiceModel)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'Update thành công!'
        },
        error: (e) => console.error(e)
      });
    this.router.navigate(['/admin/room-service']);
  }

}
