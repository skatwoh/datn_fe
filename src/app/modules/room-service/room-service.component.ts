import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService} from "ng-zorro-antd/message";
import {RoomServiceModel} from "../../models/room-service.model";
import {RoomServiceService} from "./service/room-service.service";


@Component({
  selector: 'cons-room-service',
  templateUrl: './room-service.component.html',
  styleUrls: ['./room-service.component.scss']
})
export class RoomServiceComponent implements OnInit{
  roomservice: RoomServiceModel[] = [];
  currentRoomSerivce!: RoomServiceModel;
  message ='';
  isVisible = false;
  isOkLoading = false;
  id : number | undefined;
  constructor(private roomSerivceService: RoomServiceService, private router: Router,private messageNoti: NzMessageService) { }

  private getRoomSerivces(): void {
    this.roomSerivceService.getRoomSerivceList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.roomservice= res.content;
      }
    })
  }
  searchInput :string = '';
  getRoomServiceListSearch(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.roomSerivceService.getRoomServiceListSearch(1, 50, this.searchInput).subscribe(res => {
      if (res && res.content) {
        this.roomservice= res.content;
      }
    })
  }

  updateStatus(id: any, status: number): void {
    this.roomSerivceService.get(id).subscribe((data: RoomServiceModel) => {
      this.currentRoomSerivce = data;
      console.log(this.currentRoomSerivce);
    });
    this.roomSerivceService.updateStatus(id, status)
      .subscribe({
        next: (res) => {
          this.message = res.message
          this.currentRoomSerivce.trangThai = status
          this.getRoomSerivces();
        },
      });
  }

  updateRoomService(): void {
    this.roomSerivceService
      .update(this.currentRoomSerivce.id, this.currentRoomSerivce)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : this.messageNoti.success('Update thành công', {
              nzDuration: 5000
            });
          this.getRoomSerivces();
        },
        error: (e) => console.error(e)
      });
  }
  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.roomSerivceService.get(this.id).subscribe((data: RoomServiceModel) => {
      this.currentRoomSerivce = data;
      console.log(this.currentRoomSerivce);
    });
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.updateRoomService();
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  ngOnInit() {
    this.getRoomSerivces();
  }

}
