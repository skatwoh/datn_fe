import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {HomeService} from "./home.service";
import {RoomModel} from "../../../../models/room.model";

@Component({
  selector: 'cons-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  room: RoomModel[] = [];
  soNguoi :string = '';
  checkIn :string = '';
  checkOut :string = '';
  constructor(private homeService: HomeService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient) { }


  getRoomsSearch(): void {
    const soNguoiElement = document.getElementById('soNguoi') as HTMLInputElement;
    const checkInElement = document.getElementById('checkIn') as HTMLInputElement;
    const checkOutElement = document.getElementById('checkOut') as HTMLInputElement;
    this.soNguoi = soNguoiElement.value;
    this.checkIn = checkInElement.value;
    this.checkOut = checkOutElement.value;
    this.homeService.getRoomListSearch(1, 50, this.soNguoi, this.checkIn, this.checkOut).subscribe(res => {
      if (res && res.content) {
        this.room= res.content;
      }
    })
  }

  ngOnInit(): void {

  }

}
