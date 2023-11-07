import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RoomInformationModel} from '../../models/room-information.model';
import {RoomInformationService} from './services/room-information.service';
import {RoomTypeDtoModel} from "../../models/room-type-dto.model";
import {RoomModel} from "../../models/room.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'cons-room-details',
  templateUrl: './room-information.component.html',
  styleUrls: ['./room-information.component.scss']
})
export class RoomInformationComponent implements OnInit{
  roomDetails: RoomInformationModel[] = [];
  currentRoom!: RoomInformationModel;
  message ='';
  isVisible = false;
  isOkLoading = false;

  // detail
  id: number | undefined;
  // roomModel!: RoomModel;
  roomType : RoomTypeDtoModel[] = [];

  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.roomInformationService.get(this.id).subscribe((data: RoomInformationModel) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.updateRoomInformation();
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  constructor(private roomInformationService: RoomInformationService, private router: Router, private http: HttpClient, private messageNoti: NzMessageService) { }

  private getRoomInformation(): void {
    this.roomInformationService.getRoomInformationList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.roomDetails= res.content;
      }
    })
  }

  searchInput :string = '';
  getRoomInformationSearch(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.roomInformationService.getRoomInformationListSearch(1, 50, this.searchInput).subscribe(res => {
      if (res && res.content) {
        this.roomDetails= res.content;
      }
    })
  }

  updateStatus(id: any, status: number): void {
    this.roomInformationService.get(id).subscribe((data: RoomInformationModel) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
    });
    this.roomInformationService.updateStatus(id, status)
      .subscribe({
        next: (res) => {
          this.message = res.message
          this.currentRoom.trangThai = status
          this.getRoomInformationSearch();
        },
      });
  }

  updateRoomInformation(): void {
    this.roomInformationService
      .update(this.currentRoom.id, this.currentRoom)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : this.messageNoti.success('Update thành công', {
              nzDuration: 5000
            });
          this.getRoomInformation();
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit() {
    this.getRoomInformation();
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2)  => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
      console.log(data2);
      console.log(this.roomType);
    });
  }
}
