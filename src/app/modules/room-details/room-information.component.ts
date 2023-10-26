import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomInformationModel } from '../../models/room-information.model';
import { RoomInformationService } from './services/room-information.service';

@Component({
  selector: 'cons-room-details',
  templateUrl: './room-information.component.html',
  styleUrls: ['./room-information.component.scss']
})
export class RoomInformationComponent implements OnInit{
  roomDetails: RoomInformationModel[] = [];
  constructor(private roomInformationService: RoomInformationService, private router: Router) { }

  private getRoomInformation(): void {
    this.roomInformationService.getRoomInformationList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.roomDetails= res.content;
      }
    })
  }
  ngOnInit() {
    this.getRoomInformation();
  }
}
