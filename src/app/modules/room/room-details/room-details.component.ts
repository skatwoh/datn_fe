import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {RoomService} from "../services/room.service";
import {RoomModel} from "../../../models/room.model";

@Component({
  selector: 'cons-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit{
 id : number | undefined;
 room! : RoomModel;
 constructor(public roomService : RoomService, private router : Router, private route : ActivatedRoute) {

 }
 ngOnInit() {
   this.id = this.route.snapshot.params['id'];
   this.roomService.get(this.id).subscribe((data: RoomModel) => {
     this.room = data;
   });
 }
}
