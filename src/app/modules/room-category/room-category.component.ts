import { Component, OnInit } from '@angular/core';
import { RoomCategoryModel } from '../../models/room-category.model';
import { RoomCategoryService } from './services/room-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'cons-room-category',
  templateUrl: './room-category.component.html',
  styleUrls: ['./room-category.component.scss']
})
export class RoomCategoryComponent implements OnInit{
  roomCategory: RoomCategoryModel[] = [];
  constructor(private roomCategoryService: RoomCategoryService, private router: Router) { }

  private getRoomCategories(): void {
    this.roomCategoryService.getRoomCategoryList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.roomCategory= res.content;
      }
    })
  }
  ngOnInit() {
    this.getRoomCategories();
  }
}
