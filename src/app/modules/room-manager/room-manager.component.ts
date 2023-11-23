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
import {RoomTypeModel} from "../../models/room-type.model";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'cons-room-manager',
  templateUrl: './room-manager.component.html',
  styleUrls: ['./room-manager.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class RoomManagerComponent implements OnInit {
  readonly APP_DATE = AppConstants.APP_DATE;
  roomOrder: RoomOrder[] = [];
  roomType: RoomTypeModel[] = [];
  message = '';
  isVisible = false;
  isOkLoading = false;
  room: RoomModel[] = [];
  soLuongNguoi: string = '';
  tenLoaiPhong: string = '';
  checkIn: string = '';
  checkOut: string = '';
  giaPhongMax: string = '';
  // detail
  id: number | undefined;
  searchInput: string = '';


  pdfSrc: SafeResourceUrl | undefined;

  constructor(private roomManagerService: RoomManagerService, private router: Router, private sanitizer: DomSanitizer,
              private route: ActivatedRoute, private http: HttpClient, private messageNoti: NzMessageService,
              private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2) => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    });
    this.getRoomOrders();
  }

  pdfBill(id : any): void {
    this.http.get(`${environment.apiUrl}/dat-phong/generate-bill?id=${id}`, {responseType: 'arraybuffer'})
      .subscribe(data => {
        const pdfBlob = new Blob([data], {type: 'application/pdf'});
        const pdfUrl = URL.createObjectURL(pdfBlob);
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
        if(this.pdfSrc){
          window.open(pdfUrl,'_blank');
        }
      });
  }

  private getRoomOrders(): void {
    this.roomManagerService.getListRoomManager(1, 50).subscribe(res => {
      if (res && res.content) {
        this.roomOrder = res.content;
        console.log(this.roomOrder);
      }
    })
  }

  getRoomsSearch(): void {
    const soNguoiElement = document.getElementById('soLuongNguoi') as HTMLInputElement;
    const tenLoaiPhongElement = document.getElementById('tenLoaiPhong') as HTMLInputElement;
    const checkInElement = document.getElementById('checkIn') as HTMLInputElement;
    const checkOutElement = document.getElementById('checkOut') as HTMLInputElement;
    this.soLuongNguoi = soNguoiElement.value;
    this.tenLoaiPhong = tenLoaiPhongElement.value;
    this.checkIn = checkInElement.value;
    this.checkOut = checkOutElement.value;
    this.homeService.getRoomListSearch(1, 50, this.soLuongNguoi, this.tenLoaiPhong, this.checkIn, this.checkOut).subscribe(res => {
      if (res && res.content) {
        this.room = res.content;
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
      soLuongNguoi: this.soLuongNguoi,
      tenLoaiPhong: this.tenLoaiPhong,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
    };

    this.router.navigate(['/admin/room-manager/room-manager-create'], {queryParams});
  }


  generatePDF(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Charset': 'UTF-8'
    });
    const params = {id};
    this.http.get(`rpc/bds/dat-phong/pdf/generate/`, {headers: headers, responseType: 'blob', params})
      .subscribe(response => {
        const blob = new Blob([response], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'hoa_don_dat_phong.pdf';
        downloadLink.click();
      });
  }
}
