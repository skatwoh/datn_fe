import { Component, OnInit } from '@angular/core';
import { RoomTypeModel } from '../../models/room-type.model';
import { RoomTypeService } from './services/room-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cons-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent implements OnInit{
  roomType: RoomTypeModel[] = [];
  constructor(private roomTypeService: RoomTypeService, private router: Router) { }

  private getRoomTypes(): void {
    this.roomTypeService.getRoomTypeList(1, 30).subscribe(res => {
      if (res && res.content) {
        this.roomType= res.content;
      }
    })
  }
  ngOnInit() {
    this.getRoomTypes();
  }
}
