import {Component, Input, OnInit} from '@angular/core';
import {RoomModel} from "../../models/room.model";
import {RoomService} from "../room/services/room.service";
import {Router} from "@angular/router";
import {RoomOrder} from "../../models/room-order";
import {RoomManagerService} from "../room-manager/services/room-manager.service";
import {count, forkJoin} from 'rxjs';
import {ServiceService} from "../../web/index/page/service/service.service";
import {AccountModel} from "../account/models/account.model";
import {AccountService} from "../account/services/account.service";
import {CommentService} from "../../web/index/comment/comment.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  @Input() roomOrder: RoomOrder[] = [];
  room: RoomModel[] = [];
  accounts: AccountModel[] = [];
  count: number | undefined;

  pages: string[] = ['room', 'room-detail', 'about'];

  constructor(private roomService: RoomService, private router: Router, private roomOrderService: RoomManagerService,
              private service: ServiceService, private accountService: AccountService, private commentService: CommentService ) { }

  getRooms() {
    return this.roomService.getRoomList(1, 50);
  }

  getRoomOrders() {
    return this.roomOrderService.getListRoomManager(1, 50);
  }

  getAccounts() {
    return this.accountService.getUserList(1, 50);
  }

  loadComments(): void {
    this.commentService.count().subscribe(res => {
      this.count = res;
    });
  }

  ngOnInit() {
    forkJoin([
      this.getRooms(),
      this.getRoomOrders(),
      this.getAccounts(),
    ]).subscribe(([roomsResponse, roomOrdersResponse, accountsResponse]) => {
      if (roomsResponse && roomsResponse.content) {
        this.room = roomsResponse.content;
      }

      if (roomOrdersResponse && roomOrdersResponse.content) {
        this.roomOrder = roomOrdersResponse.content;
      }

      if (accountsResponse && accountsResponse.content) {
        this.accounts = accountsResponse.content;
      }
    });

    this.loadComments();
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

}
