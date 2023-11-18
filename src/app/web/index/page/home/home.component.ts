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
    const soNguoiElement = (document.getElementById('soNguoi') as HTMLInputElement).value;
    const checkInElement = (document.getElementById('checkIn') as HTMLInputElement).value;
    const checkOutElement = (document.getElementById('checkOut') as HTMLInputElement).value;
    this.router.navigate(['/room'], {
      queryParams: {
        checkIn: checkInElement,
        checkOut: checkOutElement,
        soNguoi: soNguoiElement,
      },
    });
  }

  ngOnInit(): void {

  }

}
