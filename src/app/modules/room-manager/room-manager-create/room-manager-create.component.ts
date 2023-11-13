import {Component, OnInit} from '@angular/core';
import {RoomModel} from "../../../models/room.model";
import {RoomService} from "../../room/services/room.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {RoomManagerComponent} from "../room-manager.component";
import {HomeService} from "../../../web/index/page/home/home.service";

@Component({
  selector: 'cons-room-manager-create',
  templateUrl: './room-manager-create.component.html',
  styleUrls: ['./room-manager-create.component.scss']
})
export class RoomManagerCreateComponent implements OnInit{

  room: RoomModel[] = [];
  message ='';
  isVisible = false;
  isOkLoading = false;

  // detail
  id: number | undefined;

  constructor(private roomService: RoomService, private router: Router, private homeService : HomeService,
              private route: ActivatedRoute, private http : HttpClient, private messageNoti: NzMessageService) { }

  getRooms(soNguoi: string, checkIn: string, checkOut: string, giaPhongMax: string): void {
    this.homeService.getRoomListSearch(1, 50, soNguoi, checkIn, checkOut, giaPhongMax).subscribe(res => {
      if (res && res.content) {
        this.room = res.content;
      }
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const soNguoi = params['soNguoi'];
      const checkIn = params['checkIn'];
      const checkOut = params['checkOut'];
      const giaPhongMax = params['giaPhongMax'];

      this.getRooms(soNguoi, checkIn, checkOut, giaPhongMax);
    });
  }

}
