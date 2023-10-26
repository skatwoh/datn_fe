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
  currentRoom!: RoomModel;
  isLoading = false;
  message ='';
  constructor(private roomService: RoomService, private router: Router) { }

  private getRooms(): void {
    this.roomService.getRoomList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.room= res.content;
      }
    })
  }

  searchInput :string = '';
  getRoomsSearch(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.roomService.getRoomListSearch(1, 50, this.searchInput).subscribe(res => {
      if (res && res.content) {
        this.room= res.content;
      }
    })
  }

  updateRoomStatus(id: any, status: number): void {
    this.roomService.get(id).subscribe((data: RoomModel) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
    });
    this.roomService.updateStatus(id, status)
      .subscribe({
        next: (res) => {
          this.message = res.message
          this.currentRoom.trangThai = status
          this.getRooms();
        },
      });
  }

  ngOnInit() {
    this.getRooms();
  }
}
