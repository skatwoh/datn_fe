import {Component, OnInit} from '@angular/core';
import {TestService} from "./test.service";
import {RoomService} from "../../../modules/room/services/room.service";
import {RoomListModel} from "../../../models/room-list.model";
import {AuthService} from "../../../auth/services";
import {UserModel} from "../../../auth/models/user.model";

@Component({
  selector: 'cons-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit{
  bookings: RoomListModel[] = [];
  availableRooms: any[] = [];
  user: UserModel | undefined;

  constructor(private datPhongService: TestService, private roomService: RoomService, private authService: AuthService) {
    this.user = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    this.roomService.getRoomList(1, 50)
      .subscribe(rooms => {
        this.availableRooms = rooms.content;
      });
  }

  addToBookingList(room: any): void {
    const booking: RoomListModel = {
      userId: this.user?.id,
      idPhong: room.id,
      checkIn: (document.getElementById('checkIn') as HTMLInputElement).value,
      checkOut: (document.getElementById('checkOut') as HTMLInputElement).value,
      soNguoi: 0,
      tongGia: room.giaPhong,
      trangThai: 1
    };

    this.bookings.push(booking);
  }
  onSubmit(): void {
    console.log(this.bookings);
  }
}
