import {Component, OnInit} from '@angular/core';
import {RoomService} from "../../room/services/room.service";
import {RoomModel} from "../../../models/room.model";
import {CaseService} from "../../../web/index/case/case.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'cons-room-list-order',
  templateUrl: './room-list-order.component.html',
  styleUrls: ['./room-list-order.component.scss']
})
export class RoomListOrderComponent implements OnInit{

  room: RoomModel[] = [];
  searchInput: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  constructor(private roomService: RoomService, private caseService: CaseService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
        this.getRooms();
    }

  private getRooms(): void {
    this.roomService.getRoomListOrder(1, 50).subscribe(res => {
      if (res && res.content) {
        this.room= res.content;
      }
    })
  }

  getRoomByString(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.roomService.getRoomBySearch(1, 50, this.searchInput).subscribe(res => {
      const queryParams = {
        searchInput: this.searchInput
      };
      if (res && res.content) {
        this.room= res.content;
      }
      // this.router.navigate(['/room'], { queryParams });
    })
  }

  getRoomByDate() {
    if (this.checkOutDate !== '' && this.checkInDate !== '') {
      this.caseService.getRoomActive(1, 50, this.checkInDate, this.checkOutDate).subscribe(res => {
        if (res && res.content) {
          this.room = res.content;
        }
      })
      this.route.queryParams.subscribe(params => {
        const checkIn = params['checkIn'];
        const checkOut = params['checkOut'];
        this.caseService.getRoomActive(1, 50, this.checkInDate, this.checkOutDate).subscribe(res => {
          if (res && res.content) {
            this.room = res.content;
          }
        })
      });
    }
  }

  test(id: any){
    const checkIn = document.getElementById('checkIn') as HTMLInputElement;
    const checkOut = document.getElementById('checkOut') as HTMLInputElement;
    this.checkInDate = checkIn.value;
    this.checkOutDate = checkOut.value;
    const queryParams = {
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
    };
    this.router.navigate(['/admin/room-manager/room-manager-details/', id], { queryParams });
  }
}
