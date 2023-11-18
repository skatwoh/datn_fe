import {Component, OnInit} from '@angular/core';
import {RoomModel} from "../../../../models/room.model";
import {RoomService} from "../../../../modules/room/services/room.service";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HomeService} from "../home/home.service";
import {HomeComponent} from "../home/home.component";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RoomTypeModel} from "../../../../models/room-type.model";

@Component({
  selector: 'cons-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  animations: [
    trigger('rotateAnimation', [
      state('initial', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('initial => rotated', animate('500ms ease-out')),
      transition('rotated => initial', animate('500ms ease-in')),
    ]),
  ],
})
export class RoomComponent implements OnInit{
  room: RoomModel[] = [];
  roomType: RoomTypeModel[] = [];
  currentPage = 1;
  itemsPerPage = 9;
  animationState: string = 'initial';
  tenLoaiPhong :string = '';
  checkIn :string = '';
  checkOut :string = '';
  rotate() {
    this.animationState = this.animationState === 'initial' ? 'rotated' : 'initial';
  }
  constructor(private roomService: RoomService, private homeService: HomeService,
              private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  private getRooms(): void {
    this.roomService.getRoomListOrder(this.currentPage, this.itemsPerPage).subscribe(res => {
      if (res && res.content) {
        this.room= res.content;
      }
    })
  }

  getRoomsSearch(): void {
    const soNguoiElement = document.getElementById('tenLoaiPhong') as HTMLInputElement;
    const checkInElement = document.getElementById('checkIn') as HTMLInputElement;
    const checkOutElement = document.getElementById('checkOut') as HTMLInputElement;
    this.tenLoaiPhong = soNguoiElement.value;
    this.checkIn = checkInElement.value;
    this.checkOut = checkOutElement.value;
    this.homeService.getRoomListSearch(1, 50, this.tenLoaiPhong, this.checkIn, this.checkOut).subscribe(res => {
      if (res && res.content) {
        this.room= res.content;
      }
    })
  }
  ngOnInit() {
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2)  => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    });
    this.route.queryParams.subscribe((params) => {
      if (params['tenLoaiPhong'] || params['checkIn'] || params['checkOut']) {
        this.checkIn = params['checkIn'];
        this.checkOut = params['checkOut'];
        this.tenLoaiPhong = params['tenLoaiPhong'];

        this.getRoomsSearch();
      }
      this.getRooms();
    });
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
