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
import {ListRoomOrderService} from "../../web/index/page/list-room-order/list-room-order.service";
import {first} from "rxjs";
import {RoomOrderMappingModel} from "../../models/room-order-mapping.model";
import {CustomerModel} from "../customer/models/customer.model";

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
  roomOrder: RoomOrderMappingModel[] = [];
  roomType: RoomTypeModel[] = [];
  message = '';
  isVisible = false;
  isOkLoading = false;
  isVisible1 = false;
  isOkLoading1 = false;
  room: RoomModel[] = [];
  soLuongNguoi: string = '';
  tenLoaiPhong: string = '';
  checkIn: string = '';
  checkOut: string = '';
  giaPhongMax: string = '';
  currentRoom!: RoomOrder;
  // detail
  id: number | undefined;
  searchInput: string = '';
  hasError = false;

  pdfSrc: SafeResourceUrl | undefined;

  constructor(private roomManagerService: RoomManagerService, private router: Router, private sanitizer: DomSanitizer,
              private route: ActivatedRoute, private http: HttpClient, private messageNoti: NzMessageService,
              private homeService: HomeService, private message2: NzMessageService, private roomOrderService: ListRoomOrderService) {
  }

  listOfColumn = [
    {
      title: 'Mã',
      compare: (a: RoomOrderMappingModel, b: RoomOrderMappingModel) => String(a.ma).localeCompare(String(b.ma)),
      priority: false
    },
    {
      title: 'Mã phòng',
      compare: (a: RoomOrderMappingModel, b: RoomOrderMappingModel) => String(a.tenPhong).localeCompare(String(b.tenPhong)),
      priority: 6
    },
    {
      title: 'Ngày nhận phòng',
      compare: (a: RoomOrderMappingModel, b: RoomOrderMappingModel) => String(a.checkIn).localeCompare(String(b.checkIn)),
      priority: 4
    },
    {
      title: 'Ngày trả phòng',
      compare: (a: RoomOrderMappingModel, b: RoomOrderMappingModel) => String(a.checkOut).localeCompare(String(b.checkOut)),
      priority: 5
    },
    {
      title: 'Khách hàng',
      compare: (a: RoomOrderMappingModel, b: RoomOrderMappingModel) => String(a.hoTen).localeCompare(String(b.hoTen)),
      priority: 3
    },
    {
      title: 'Số điện thoại',
      compare: (a: RoomOrderMappingModel, b: RoomOrderMappingModel) => String(a.sdt).localeCompare(String(b.sdt)),
      priority: 2
    },
    {
      title: 'Trạng thái',
      compare: (a: RoomOrderMappingModel, b: RoomOrderMappingModel) => (a.trangThai??0) - (b.trangThai??0),
      priority: 7
    },
    {
      title: 'Tổng tiền',
      compare: (a: RoomOrderMappingModel, b: RoomOrderMappingModel) => (a.tongGia??0) - (b.tongGia??0),
      priority: 1
    }
  ]

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
    this.roomManagerService.getAllDPMapping(1, 50).subscribe(res => {
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
    this.homeService.getRoomListSearch(1, 50, this.soLuongNguoi, this.tenLoaiPhong, this.checkIn, this.checkOut).pipe(first()).subscribe(res => {
      if (res != null){
        const queryParams = {
          soLuongNguoi: this.soLuongNguoi,
          tenLoaiPhong: this.tenLoaiPhong,
          checkIn: this.checkIn,
          checkOut: this.checkOut,
        };
        if (res && res.content) {
          this.room= res.content;
        }
        console.log('abc');
        this.router.navigate(['/admin/room-manager/room-manager-create'], { queryParams });
      } else {
        this.message = 'Ngày nhận không hợp lệ';
        this.hasError = true;
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
    if(this.hasError === false){
      this.isVisible = true;
      this.isOkLoading = false;
    }
    else{
      setTimeout(() => {
        this.isVisible = false;
        this.isOkLoading = false;
        const queryParams = {
          soLuongNguoi: this.soLuongNguoi,
          tenLoaiPhong: this.tenLoaiPhong,
          checkIn: this.checkIn,
          checkOut: this.checkOut,
        };

        this.router.navigate(['/admin/room-manager/room-manager-create'], {queryParams});
      }, 500);
    }
  }


  generatePDF(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Charset': 'UTF-8'
    });
    const params = {id};
    this.http.get(`rpc/bds/dat-phong/generate-bill?id=${id}`, {headers: headers, responseType: 'blob'})
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

  handleOk1(): void {
    this.isOkLoading1 = true;
    this.deleteRoom();
    setTimeout(() => {
      this.isVisible1 = false;
      this.isOkLoading1 = false;
    }, 500);
  }

  handleCancel1(): void {
    this.isVisible1 = false;
  }

  showModal2(id: any): void {
    this.isVisible1 = true;
    this.id = id;
    this.roomOrderService.get(this.id).subscribe((data: RoomOrder) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
    });
  }

  successMessage(): void {
    this.message2.success('Hủy phòng thành công');
  }

  deleteRoom(): void {
    this.roomOrderService.updateStatus(this.currentRoom.id, 0)
      .subscribe({
        next: (res) => {
          console.log(res);
          if(res.body.code == "Failed") {
            this.message2.error(res.body.message);
          } else {
            this.currentRoom.trangThai = 0
            this.successMessage();
            this.getRoomOrders();
          }
        },
      });
  }


}
