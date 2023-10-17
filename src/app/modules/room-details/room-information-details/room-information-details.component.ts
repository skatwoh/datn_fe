import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomInformationModel} from "../../../models/room-information.model";
import {RoomInformationService} from "../services/room-information.service";

@Component({
  selector: 'cons-room-information-details',
  templateUrl: './room-information-details.component.html',
  styleUrls: ['./room-information-details.component.scss']
})
export class RoomInformationDetailsComponent {

  id: number | undefined;
  room!: RoomInformationModel;

  message = '';

  constructor(public roomService: RoomInformationService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
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
