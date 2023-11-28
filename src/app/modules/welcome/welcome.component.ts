import { Component, Input, OnInit } from '@angular/core';
import { RoomModel } from "../../models/room.model";
import { RoomService } from "../room/services/room.service";
import { Router } from "@angular/router";
import { RoomOrder } from "../../models/room-order";
import { RoomManagerService } from "../room-manager/services/room-manager.service";
import {count, forkJoin} from 'rxjs';
import {ServiceService} from "../../web/index/page/service/service.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @Input() roomOrder: RoomOrder[] = [];
  room: RoomModel[] = [];

  pages: string[] = ['room', 'room-detail', 'about'];

  constructor(private roomService: RoomService, private router: Router, private roomOrderService: RoomManagerService,
              private service: ServiceService ) { }

  getRooms() {
    return this.roomService.getRoomList(1, 50);
  }

  getRoomOrders() {
    return this.roomOrderService.getListRoomManager(1, 50);
  }

  ngOnInit() {
    forkJoin([
      this.getRooms(),
      this.getRoomOrders()
    ]).subscribe(([roomsResponse, roomOrdersResponse]) => {
      if (roomsResponse && roomsResponse.content) {
        this.room = roomsResponse.content;
      }

      if (roomOrdersResponse && roomOrdersResponse.content) {
        this.roomOrder = roomOrdersResponse.content;
      }
    });

    this.pages.forEach(page => {
      this.service.recordVisit(page, 'dummyIpAddress').subscribe(() => {
        // Có thể thực hiện các hành động khác sau khi ghi nhận
      });
    });

    this.getVisitCount();
  }

  getVisitCount() {
    const page = 'HomePage'; // Cần thay đổi tùy thuộc vào trang hiện tại

    this.service.getVisitCount(page).subscribe(count => {
      console.log(`Số lượt truy cập: ${count}`);
    });
  }


  getUniqueVisitorsCount(page: string) {
    // Gọi phương thức từ service để lấy số lượng người truy cập duy nhất cho từng trang
    let count = 0;
    this.service.getUniqueVisitorsCount(page).subscribe(response => {
      count = response;
    });
    return count;
  }

  protected readonly count = count;
}
