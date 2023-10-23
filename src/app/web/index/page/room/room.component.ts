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
  currentPage = 1;
  itemsPerPage = 9;
  constructor(private roomService: RoomService, private router: Router) { }

  private getRooms(): void {
    this.roomService.getRoomList(this.currentPage, this.itemsPerPage).subscribe(res => {
      if (res && res.content) {
        this.room= res.content;
      }
    })
  }
  ngOnInit() {
    this.getRooms();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRooms();
    }
  }

  nextPage() {
    this.currentPage++;
    this.getRooms();
  }
}
