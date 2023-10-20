import {Component, OnInit} from '@angular/core';
import {RoomModel} from "../../../../models/room.model";
import {RoomService} from "../../../../modules/room/services/room.service";
import {Router} from "@angular/router";

@Component({
  selector: 'cons-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit{
  room: RoomModel[] = [];
  constructor(private roomService: RoomService, private router: Router) { }

  private getRooms(): void {
    this.roomService.getRoomList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.room= res.content;
      }
    })
  }
  ngOnInit() {
    this.getRooms();
  }
}
