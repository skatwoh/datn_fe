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

  // @ViewChild('checkboxes') checkboxes: NzCheckboxComponent[] = [];
  // selectedValues: string[] = [];
  room: RoomModel[] = [];
  roomType: RoomTypeModel[] = [];
  sale!: SaleModel;
  currentPage = 1;
  itemsPerPage = 9;
  animationState: string = 'initial';
  soLuongNguoi: string = '';
  tenLoaiPhong: string = '';
  minGia: string = '';
  maxGia: string = '';
  checkIn: string = '';
  checkOut: string = '';
  message: string = '';
  hasError: boolean = false;
  avatarUrls: any[] = [];
  data: any[] = [];

  rotate() {
    this.animationState = this.animationState === 'initial' ? 'rotated' : 'initial';
  }

  selectedCount = 0;
  isVisible = false;

  constructor(private roomService: RoomService, private homeService: HomeService,
              private router: Router, private route: ActivatedRoute, private http: HttpClient,
              private service: ServiceService, private saleService: SaleService, private imageService: ImageService,) {
  }

  private getRooms(): void {
    this.roomService.getRoomListOrder(this.currentPage, this.itemsPerPage).subscribe(res => {
      if (res && res.content) {
        this.room = res.content;
      }
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
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

  private getSale(): void {
    this.saleService.getSale().subscribe(res => {
      if (res) {
        this.sale = res;
      }
    })
  }

  getRoomsSearch(): void {
    this.homeService.getRoomListSearch(1, 50, this.soLuongNguoi, this.tenLoaiPhong, this.checkIn, this.checkOut).subscribe(res => {
      if (res && res.content) {
        this.room = res.content;
        this.updateUrlWithSearchParams();
      }
    })
  }

  searchByPrice(): void {
    const minGiaElement = document.getElementById('minGia') as HTMLInputElement;
    const maxGiaElement = document.getElementById('maxGia') as HTMLInputElement;
    this.minGia = minGiaElement.value;
    this.maxGia = maxGiaElement.value;
    console.log(this.minGia);
    console.log(this.maxGia);

    this.homeService.getListByPrice(1, 50, this.minGia, this.maxGia).subscribe(res => {
      if (res && res.content) {
        this.room = res.content;
        // this.updateUrlWithSearchParams();
      }
    })
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
    const currentUrl = this.route.snapshot.url.join('/');
    console.log(currentUrl, "ok");
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2) => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    });
    this.route.queryParams.subscribe((params) => {
      if (params['tenLoaiPhong'] || params['checkIn'] || params['checkOut'] || params['soLuongNguoi'] || params['minGia'] || params['maxGia']) {
        this.checkIn = params['checkIn'];
        this.checkOut = params['checkOut'];
        this.tenLoaiPhong = params['tenLoaiPhong'];
        this.soLuongNguoi = params['soLuongNguoi'];
        if (params['soLuongNguoi'] === '') {
          this.homeService.getRoomListSearch(1, 50, '', this.tenLoaiPhong, this.checkIn, this.checkOut).subscribe(res => {
            if (res && res.content) {
              this.room = res.content;
              // this.updateUrlWithSearchParams();
            }
          })
        } else {
          this.getRoomsSearch();
        }
      } else {
        this.router.navigate(['/']);
      }
    });

    this.getSale();
    this.image();
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

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRooms();
    }
  }

  searchInput: string = '';

  getRoomByString(): void {
    const inputElement = document.getElementById('searchInput') as HTMLInputElement;
    this.searchInput = inputElement.value;
    this.roomService.getRoomBySearch(1, 50, this.searchInput).subscribe(res => {
      const queryParams = {
        searchInput: this.searchInput
      };
      if (res && res.content) {
        this.room = res.content;
      }
      // this.router.navigate(['/room'], { queryParams });
    })
  }

  nextPage() {
    this.currentPage++;
    this.getRooms();
  }

  // navigateToRoomDetails(id: any): void {
  //   if (this.tenLoaiPhong || this.checkIn || this.checkOut) {
  //     const newQueryParams = {
  //       soLuongNguoi: this.soLuongNguoi,
  //       tenLoaiPhong: this.tenLoaiPhong,
  //       checkIn: this.checkIn,
  //       checkOut: this.checkOut
  //     };
  //
  //     this.router.navigate(['/room-detail', id], { queryParams: newQueryParams });
  //   } else {
  //     this.router.navigate(['/room-detail', id]);
  //   }
  // }

  navigateToRoomDetails(id: any) {
    this.router.navigate(['/room-detail', id], {
      queryParamsHandling: 'merge'
    });
  }


  protected readonly Number = Number;

  getRoomByTienIch(value: any, even: Event): void {
    const checkbox = even.target as HTMLInputElement;
    // this.selectedValues = this.checkboxes.filter(checkbox => checkbox.nzChecked).map(checkbox => checkbox.nzValue);
    if (checkbox.checked) {
      this.data.push(value)
    }
    if (!checkbox.checked) {
      this.data.splice(this.data.indexOf(value), 1);
    }
    this.getByAll();
  }

  getByAll() {
    // if (this.data.length == 0 && this.tenLoaiPhong != '') {
    //   this.service.getListByTienIch(1, 50, [], '', this.tenLoaiPhong, '', '').subscribe(res => {
    //     if (res && res.content) {
    //       this.room = res.content;
    //     }
    //   })
    // } else if (this.data.length > 0 && this.tenLoaiPhong == '') {
    //   this.service.getListByTienIch(1, 50, this.data, '', '', '', '').subscribe(res => {
    //     if (res && res.content) {
    //       this.room = res.content;
    //     }
    //   })
    // } else if (this.data.length > 0 && this.tenLoaiPhong != '') {
    //   this.service.getListByTienIch(1, 50, this.data, '', this.tenLoaiPhong, '', '').subscribe(res => {
    //     if (res && res.content) {
    //       this.room = res.content;
    //     }
    //   })
    // } else if (this.data.length > 0 && this.tenLoaiPhong != '') {
    //   this.service.getListByTienIch(1, 50, this.data, '', this.tenLoaiPhong, '', '').subscribe(res => {
    //     if (res && res.content) {
    //       this.room = res.content;
    //     }
    //   })
    // }
    if (this.data.length > 0 || (this.tenLoaiPhong != '' && this.checkIn != '') || this.checkOut != '') {
      this.service.getListByTienIch(1, 50, this.data, '', this.tenLoaiPhong, this.checkIn, this.checkOut).subscribe(res => {
        if (res && res.content) {
          this.room = res.content;
        }
      })
    } else {
      this.getRooms()
    }
  }

  changeLoaiPhong() {
    const tenLoaiPhong = document.getElementById('tenLoaiPhong') as HTMLInputElement;
    this.tenLoaiPhong = tenLoaiPhong.value;
    this.getByAll();
  }

  changeDate() {
    const checkIn = document.getElementById('checkIn') as HTMLInputElement;
    const checkOut = document.getElementById('checkOut') as HTMLInputElement;
    this.checkIn = checkIn.value;
    this.checkOut = checkOut.value;
    this.getByAll();
  }

  changeSoLuongNguoi() {
    const soLuongNguoi = document.getElementById('soLuongNguoi') as HTMLInputElement;
    this.soLuongNguoi = soLuongNguoi.value;
    this.getByAll();
  }

  searchByAlls() {
    const soLuongNguoi = document.getElementById('soLuongNguoi') as HTMLInputElement;
    const tenLoaiPhong = document.getElementById('tenLoaiPhong') as HTMLInputElement;
    const checkInElement = document.getElementById('checkIn') as HTMLInputElement;
    const checkOutElement = document.getElementById('checkOut') as HTMLInputElement;
    this.soLuongNguoi = soLuongNguoi.value;
    this.tenLoaiPhong = tenLoaiPhong.value;
    this.checkIn = checkInElement.value;
    this.checkOut = checkOutElement.value;
    this.service.getListByTienIch(1, 50, this.data, this.soLuongNguoi, this.tenLoaiPhong, this.checkIn, this.checkOut).subscribe(res => {
      if (res && res.content) {
        this.room = res.content;
      }
    })
  }

  removecheckbox(even: Event): void {
    const checkbox = even.target as HTMLInputElement;
    if (!checkbox.checked) {
      this.data.splice(this.data.indexOf(checkbox.value), 1);
    }
    console.log(this.data)
  }

  panels = [
    {
      active: false,
      disabled: false,
      name: 'This is panel header 1',
      customStyle: {
        background: '#d3c3b9',
        'border-radius': '4px',
        'margin-bottom': '24px',
        border: '0px',
        fontFamily: 'Lora, serif',
        fontSize: '16px',
      }
    }
  ]

  handleClose(value: any): void {
    this.data.splice(this.data.indexOf(value), 1);

    const checkboxId = this.getCheckboxId(value);
    const checkbox = document.getElementById(checkboxId) as HTMLInputElement;

    if (checkbox) {
      checkbox.checked = false;
    }
    this.getRoomsSearch();
  }

  getCheckboxId(value: any): string {
    return value.replace(/\s+/g, '-').toLowerCase();
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  handleClearAll(): void {
    this.data.forEach((value: any) => {
      const checkboxId = this.getCheckboxId(value);
      const checkbox = document.getElementById(checkboxId) as HTMLInputElement;

      if (checkbox) {
        checkbox.checked = false;
      }
    });

    this.data = [];
    this.getRoomsSearch()
  }
}
