import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NzMessageService} from "ng-zorro-antd/message";
import {RoomServiceModel} from "../../models/room-service.model";
import {RoomServiceService} from "./service/room-service.service";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'cons-room-service',
  templateUrl: './room-service.component.html',
  styleUrls: ['./room-service.component.scss']
})
export class RoomServiceComponent implements OnInit {
  roomservice: RoomServiceModel[] = [];
  currentRoomSerivce!: RoomServiceModel;
  message = '';
  isVisible = false;
  isOkLoading = false;
  id: number | undefined;
  currentDichVu!: RoomServiceModel;

  constructor(private roomSerivceService: RoomServiceService,
              private router: Router,
              private messageNoti: NzMessageService,
              private http: HttpClient
  ) {
  }

  private getRoomSerivces(): void {
    this.roomSerivceService.getRoomSerivceList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.roomservice = res.content;
      }
    })
  }

  searchInput: string = '';

  getRoomServiceListSearch(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.roomSerivceService.getRoomServiceListSearch(1, 50, this.searchInput).subscribe(res => {
      if (res && res.content) {
        this.roomservice = res.content;
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
    const fileInput: HTMLInputElement = document.getElementById('image') as HTMLInputElement;
    const file: File | null = (fileInput.files && fileInput.files.length > 0) ? fileInput.files[0] : null;
    if (file) {
      // Đọc file thành chuỗi Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        this.currentDichVu.image = reader.result as string; // Thêm trường base64Image vào payload
        this.roomSerivceService.update(this.currentDichVu.id, this.currentDichVu).subscribe({
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
      };
      reader.readAsDataURL(file);
    } else {
      this.roomSerivceService
        .update(this.currentDichVu.id, this.currentDichVu)
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
  }

  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.roomSerivceService.get(this.id).subscribe((data: RoomServiceModel) => {
      this.currentDichVu = data;
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
    setTimeout(() => {
      this.getRoomSerivces();
    }, 10);
  }

  generatePDF(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Charset': 'UTF-8'
    });
    this.http.get(`rpc/bds/dich-vu/generate-hoa-don-dv?id=${id}`, {headers: headers, responseType: 'blob'})
      .subscribe(response => {
        const blob = new Blob([response], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'hoa_don_dich_vu.pdf';
        downloadLink.click();
      });
  }
}
