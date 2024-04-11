import {Component, HostListener, OnInit} from '@angular/core';
import {RoomModel} from "../../../../models/room.model";
import {RoomService} from "../../../../modules/room/services/room.service";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {HomeService} from "../home/home.service";
import {HomeComponent} from "../home/home.component";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RoomTypeModel} from "../../../../models/room-type.model";
import {ServiceService} from "../service/service.service";
import {SaleModel} from "../../../../models/sale.model";
import {SaleService} from "../../../../modules/sale/sale.service";
import {ImageService} from "../../image/image.service";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {RoomTypeService} from "../../../../modules/room-category/services/room-type.service";

@Component({
  selector: 'cons-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  animations: [
    trigger('rotateAnimation', [
      state('initial', style({transform: 'rotate(0deg)'})),
      state('rotated', style({transform: 'rotate(360deg)'})),
      transition('initial => rotated', animate('5000ms ease-out')),
      transition('rotated => initial', animate('5000ms ease-in')),
    ]),
  ],
})
export class RoomComponent implements OnInit {
  room: RoomModel[] = [];
  roomType: RoomTypeModel[] = [];
  sale!: SaleModel;
  animationState: string = 'initial';
  soLuongNguoi: string = '';
  tenLoaiPhong: string = '';
  checkIn: any;
  checkOut: any;
  message: string = '';
  hasError: boolean = false;
  avatarUrls: any[] = [];
  data: any[] = [];

  checkInDate: string = '';
  checkOutDate: string = '';
  soNguoi: number = 1;
  soPhong: number = 1;
  roomTypeModel!: RoomTypeModel;
  idRoomType: any;

  constructor(private roomService: RoomService, private homeService: HomeService,
              private router: Router, private route: ActivatedRoute, private http: HttpClient,private roomTypeService: RoomTypeService,
              private service: ServiceService, private saleService: SaleService, private imageService: ImageService,) {
  }

  private image(): void {
    this.imageService.getAvatarUrls().subscribe(
      (res: any[]) => {
        if (res) {
          this.avatarUrls = res.map(item => item.userImageURL);
        }
      },
      error => {
        console.error('Error fetching avatar URLs', error);
      }
    );
  }

   updateUrlWithSearchParams(): void {
    const queryParams = {
      soLuongNguoi: this.soLuongNguoi,
      tenLoaiPhong: this.tenLoaiPhong,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
    };
    // Update URL without triggering a navigation
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const checkIn = params['checkIn'];
      const checkOut = params['checkOut'];
      const soPhong = params['soPhong'];
      const soNguoi = params['soNguoi'];
      if(checkIn === '' || checkOut === ''){
        this.checkIn = new Date().toISOString();
        this.checkOut = new Date((new Date()).setDate(new Date().getDate() + 1)).toISOString();
      }else{
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.soPhong = soPhong;
        this.soNguoi = soNguoi;
      }
    });
    // const currentUrl = this.route.snapshot.url.join('/');
    // console.log(currentUrl, "ok");
    // this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2) => {
    //   this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    // });
    // this.route.queryParams.subscribe((params) => {
    //   if (params['tenLoaiPhong'] || params['checkIn'] || params['checkOut'] || params['soLuongNguoi'] || params['minGia'] || params['maxGia']) {
    //     this.checkIn = params['checkIn'];
    //     this.checkOut = params['checkOut'];
    //     this.tenLoaiPhong = params['tenLoaiPhong'];
    //     this.soLuongNguoi = params['soLuongNguoi'];
    //     if (params['soLuongNguoi'] === '') {
    //       this.homeService.getRoomListSearch(1, 50, '', this.tenLoaiPhong, this.checkIn, this.checkOut).subscribe(res => {
    //         if (res && res.content) {
    //           this.room = res.content;
    //           // this.updateUrlWithSearchParams();
    //         }
    //       })
    //     } else {
    //       this.getRoomsSearch();
    //     }
    //   } else {
    //     this.router.navigate(['/']);
    //   }
    // });
    //
    // this.getSale();
    // this.image();
    this.getRoomType();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): any {
    // Kiểm tra xem người dùng đang rời khỏi trang để chuyển tới URL cố định hay không
    if (this.router.url === '/') {
      console.log(this.router.url, "url")
      // Thông báo bạn muốn hiển thị
      const confirmationMessage = 'Bạn có chắc chắn muốn rời khỏi trang này?';

      // Gán thông báo cho sự kiện
      $event.returnValue = confirmationMessage;

      // Trả về thông báo (chỉ cho trình duyệt cũ)
      console.log("ok")
      return confirmationMessage;
    }
  }

  navigateToRoomDetails(id: any) {
    this.router.navigate(['/room-detail', id], {
      queryParamsHandling: 'merge'
    });
  }

  getRoomType() {
    const id = this.route.snapshot.paramMap.get('id');
    this.roomTypeService.get(id).subscribe(res => {
      this.roomTypeModel = res;
    })
  }

  bookNow(id: any) {
    const queryParams = {
      soPhong: this.soPhong,
      soNguoi: this.soNguoi,
      checkIn: this.checkIn,
      checkOut: this.checkOut
    }
    this.router.navigate(['/room-order', id], {queryParams});
  }

  protected readonly Number = Number;

}
