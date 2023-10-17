import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../services/room.service";
import {RoomModel} from "../../../models/room.model";
import {RoomDTOModel} from "../../../models/roomDTO.model";

@Component({
  selector: 'cons-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent implements OnInit {
  id: number | undefined;
  room!: RoomDTOModel;

  constructor(public roomService: RoomService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.roomService.get(this.id).subscribe((data: RoomDTOModel) => {
      this.room = data;
      console.log(this.room);
    });
  }
}
