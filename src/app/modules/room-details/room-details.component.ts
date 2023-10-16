import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomDetailsModel } from '../../models/room-details.model';
import { RoomDetailsService } from './services/room-details.service';

@Component({
  selector: 'cons-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit{
  roomDetails: RoomDetailsModel[] = [];
  constructor(private roomDetailsService: RoomDetailsService, private router: Router) { }

  private getRoomDetails(): void {
    this.roomDetailsService.getRoomDetailsList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.roomDetails= res.content;
      }
    })
  }
  ngOnInit() {
    this.getRoomDetails();
  }
}
