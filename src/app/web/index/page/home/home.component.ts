import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {HomeService} from "./home.service";
import {RoomModel} from "../../../../models/room.model";
import {environment} from "../../../../../environments/environment";
import {RoomTypeModel} from "../../../../models/room-type.model";

@Component({
  selector: 'cons-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  room: RoomModel[] = [];
  tenLoaiPhong :string = '';
  checkIn :string = '';
  checkOut :string = '';
  roomType : RoomTypeModel[] = [];
  constructor(private homeService: HomeService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient) { }


  getRoomsSearch(): void {
    const soNguoiElement = (document.getElementById('tenLoaiPhong') as HTMLInputElement).value;
    const checkInElement = (document.getElementById('checkIn') as HTMLInputElement).value;
    const checkOutElement = (document.getElementById('checkOut') as HTMLInputElement).value;
    this.router.navigate(['/room'], {
      queryParams: {
        checkIn: checkInElement,
        checkOut: checkOutElement,
        tenLoaiPhong: soNguoiElement,
      },
    });
  }

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2)  => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    });
  }

}
