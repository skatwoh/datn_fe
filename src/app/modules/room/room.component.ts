import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomModel } from '../../models/room.model';
import { RoomService } from './services/room.service';

@Component({
  selector: 'cons-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit{
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
