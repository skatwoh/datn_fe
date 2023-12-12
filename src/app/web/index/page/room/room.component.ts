import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'cons-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
  animations: [
    trigger('rotateAnimation', [
      state('initial', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('initial => rotated', animate('5000ms ease-out')),
      transition('rotated => initial', animate('5000ms ease-in')),
    ]),
  ],
})
export class RoomComponent implements OnInit{
  room: RoomModel[] = [];
  roomType: RoomTypeModel[] = [];
  sale!: SaleModel;
  currentPage = 1;
  itemsPerPage = 9;
  animationState: string = 'initial';
  soLuongNguoi: string = '';
  tenLoaiPhong :string = '';
  minGia : string = '';
  maxGia : string = '';
  checkIn :string = '';
  checkOut :string = '';
  message :string = '';
  hasError : boolean = false;
  avatarUrls: any[] = [];
  rotate() {
    this.animationState = this.animationState === 'initial' ? 'rotated' : 'initial';
  }

  selectedCount = 0;

  updateSelectedCount(event: any) {
    if (event.target.checked) {
      this.selectedCount++;
    } else {
      this.selectedCount--;
    }
  }

  resetSelection() {
    this.selectedCount = 0;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false;
    });
  }
  constructor(private roomService: RoomService, private homeService: HomeService,
              private router: Router, private route: ActivatedRoute, private http: HttpClient,
              private service: ServiceService, private saleService: SaleService, private imageService: ImageService) { }

  private getRooms(): void {
    this.roomService.getRoomListOrder(this.currentPage, this.itemsPerPage).subscribe(res => {
      if (res && res.content) {
        this.room= res.content;
      }
    })
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
    const soLuongNguoiElement = document.getElementById('soLuongNguoi') as HTMLInputElement;
    const loaiPhongElement = document.getElementById('tenLoaiPhong') as HTMLInputElement;
    const checkInElement = document.getElementById('checkIn') as HTMLInputElement;
    const checkOutElement = document.getElementById('checkOut') as HTMLInputElement;
    const minGiaElement = document.getElementById('minGia') as HTMLInputElement;
    const maxGiaElement = document.getElementById('maxGia') as HTMLInputElement;
    this.soLuongNguoi = soLuongNguoiElement.value;
    this.tenLoaiPhong = loaiPhongElement.value;
    this.checkIn = checkInElement.value;
    this.checkOut = checkOutElement.value;
    this.minGia = minGiaElement.value;
    this.maxGia = maxGiaElement.value;
    console.log(this.minGia);
    console.log(this.maxGia);
      this.homeService.getRoomListSearch(1, 50, this.soLuongNguoi, this.tenLoaiPhong, this.checkIn, this.checkOut, this.minGia, this.maxGia).subscribe(res => {
        if (res && res.content) {
          this.room = res.content;
          // this.updateUrlWithSearchParams();
        }
      })
  }
    private updateUrlWithSearchParams(): void {
        const queryParams = {
          soLuongNguoi: this.soLuongNguoi,
          tenLoaiPhong: this.tenLoaiPhong,
          checkIn: this.checkIn,
          checkOut: this.checkOut,
          minGia: this.minGia,
          maxGia: this.maxGia,
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

    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2)  => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    });
    this.route.queryParams.subscribe((params) => {
      if (params['tenLoaiPhong'] || params['checkIn'] || params['checkOut'] || params['soLuongNguoi'] || params['minGia'] || params['maxGia']) {
        this.checkIn = params['checkIn'];
        this.checkOut = params['checkOut'];
        this.tenLoaiPhong = params['tenLoaiPhong'];
        this.soLuongNguoi = params['soLuongNguoi'];
        this.minGia = params['minGia'];
        this.maxGia = params['maxGia'];
        this.getRoomsSearch();
      } else {
        this.getRooms();
      }
    });

    this.getSale();
    this.image();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRooms();
    }
  }

  nextPage() {
    this.currentPage++;
    this.getRooms();
  }

  protected readonly Number = Number;
}
