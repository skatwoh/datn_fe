import { Component, OnInit } from '@angular/core';
import {RoomModel} from "../../models/room.model";
import {RoomService} from "../room/services/room.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  room: RoomModel[] = [];
  constructor(private roomService: RoomService, private router: Router) { }

  private getRooms(): void {
    this.roomService.getRoomList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.room= res.content;
      }
    })
  }
  ngOnInit() {
    this.getRooms();
  }

}
