import {Component, Injectable, OnInit} from '@angular/core';
import {RoomModel} from "../../models/room.model";
import {RoomTypeDtoModel} from "../../models/room-type-dto.model";
import {RoomService} from "../room/services/room.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NzMessageService} from "ng-zorro-antd/message";
import {environment} from "../../../environments/environment";
import {RoomOrder} from "../../models/room-order";
import {RoomManagerService} from "./services/room-manager.service";
import {AppConstants} from "../../app-constants";
import {HomeService} from "../../web/index/page/home/home.service";

@Component({
  selector: 'cons-room-manager',
  templateUrl: './room-manager.component.html',
  styleUrls: ['./room-manager.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class RoomManagerComponent implements OnInit{
  readonly APP_DATE = AppConstants.APP_DATE;
  roomOrder: RoomOrder[] = [];
  message ='';
  isVisible = false;
  isOkLoading = false;
  room: RoomModel[] = [];
  soNguoi :string = '';
  checkIn :string = '';
  checkOut :string = '';
  giaPhongMax :string = '';
  // detail
  id: number | undefined;
  searchInput : string = '';

  // showModal(id: any): void {
  //   this.isVisible = true;
  //   this.id = id;
  //   this.roomService.get(this.id).subscribe((data: RoomModel) => {
  //     this.currentRoom = data;
  //     console.log(this.currentRoom);
  //   });
  // }


  constructor(private roomManagerService : RoomManagerService, private router: Router,
              private route: ActivatedRoute, private http : HttpClient, private messageNoti: NzMessageService,
              private homeService : HomeService) { }

  private getRoomOrders(): void {
    this.roomManagerService.getListRoomManager(1, 50).subscribe(res => {
      if (res && res.content) {
        this.roomOrder= res.content;
        console.log(this.roomOrder);
      }
    })
  }

  getRoomsSearch(): void {
    const soNguoiElement = document.getElementById('soNguoi') as HTMLInputElement;
    const checkInElement = document.getElementById('checkIn') as HTMLInputElement;
    const checkOutElement = document.getElementById('checkOut') as HTMLInputElement;
    const giaPhongElement = document.getElementById('giaPhongMax') as HTMLInputElement;
    this.soNguoi = soNguoiElement.value;
    this.checkIn = checkInElement.value;
    this.checkOut = checkOutElement.value;
    this.giaPhongMax = giaPhongElement.value;
    this.homeService.getRoomListSearch(1, 50, this.soNguoi, this.checkIn, this.checkOut, this.giaPhongMax).subscribe(res => {
      if (res && res.content) {
        this.room= res.content;
      }
    })
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.getRoomsSearch();
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
    const queryParams = {
      soNguoi: this.soNguoi,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      giaPhongMax: this.giaPhongMax
    };

    this.router.navigate(['/admin/room-manager/room-manager-create'], { queryParams });
  }

  // updateRoomStatus(id: any, status: number): void {
  //   this.roomService.get(id).subscribe((data: RoomModel) => {
  //     this.currentRoom = data;
  //     console.log(this.currentRoom);
  //   });
  //   this.roomService.updateStatus(id, status)
  //     .subscribe({
  //       next: (res) => {
  //         this.message = res.message
  //         this.currentRoom.trangThai = status
  //         this.getRooms();
  //       },
  //     });
  // }
  //
  // updateRoom(): void {
  //   this.roomService
  //     .update(this.currentRoom.id, this.currentRoom)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.message = res.message
  //           ? res.message
  //           : this.messageNoti.success('Update thành công', {
  //             nzDuration: 5000
  //           });
  //         this.getRooms();
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  ngOnInit() {
    this.getRoomOrders();
    // this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2)  => {
    //   this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    //   console.log(data2);
    //   console.log(this.roomType);
    // });
  }

  // generatePDF() {
  //   this.http.get('rpc/bds/dat-phong/pdf/generate', {
  //     responseType: 'blob'
  //   }).subscribe(response => {
  //     const pdfBlob = new Blob([response], { type: 'application/pdf' });
  //     const pdfUrl = URL.createObjectURL(pdfBlob);
  //
  //     // Display the PDF in a new window
  //     const pdfWindow = window.open(pdfUrl, '_blank');
  //     // @ts-ignore
  //     pdfWindow.focus();
  //
  //     // Optionally, you can download the PDF file
  //     // const downloadLink = document.createElement('a');
  //     // downloadLink.href = pdfUrl;
  //     // downloadLink.download = 'pdf_report.pdf';
  //     // downloadLink.click();
  //   });
  // }

  generatePDF(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Charset': 'UTF-8'
    });
    const params = {id};
    this.http.get(`rpc/bds/dat-phong/pdf/generate/`, { headers: headers, responseType: 'blob', params })
      .subscribe(response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'hoa_don_dat_phong.pdf';
        downloadLink.click();
      });
  }
}
