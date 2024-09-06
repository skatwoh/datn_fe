import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RoomInformationModel} from '../../models/room-information.model';
import {RoomInformationService} from './services/room-information.service';
import {RoomModel} from "../../models/room.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";

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
  form: FormGroup;

  // detail
  id: number | undefined;
  // roomModel!: RoomModel;
  room: RoomModel[] = [];

  listOfColumn = [
    {
      title: 'Tầng',
      compare: (a: RoomInformationModel, b: RoomInformationModel) => Number.parseInt(a.tang??'') - Number.parseInt(b.tang??''),
      priority: 4
    },
    {
      title: 'Dịch vụ',
      compare: (a: RoomInformationModel, b: RoomInformationModel) => String(a.dichVu).localeCompare(String(b.dichVu)),
      priority: 3
    },
    {
      title: 'Diện tích',
      compare: (a: RoomInformationModel, b: RoomInformationModel) => a.dienTich??0 - (b.dienTich??0),
      priority: 2
    },
    {
      title: 'Mã phòng',
      compare: (a: RoomInformationModel, b: RoomInformationModel) => String(a.maPhong).localeCompare(String(b.maPhong)),
      priority: 1
    },
    {
      title: 'Trạng thái',
      compare: (a: RoomInformationModel, b: RoomInformationModel) => a.trangThai??0 - (b.trangThai??0),
      priority: 5
    }
  ]

  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.roomInformationService.get(this.id).subscribe((data: RoomInformationModel) => {
      this.currentRoom = data;
      console.log(this.currentRoom);
    });
  }

  handleOk(): void {
    if (!this.form.valid) {
      return;
    }
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
  constructor(private roomInformationService: RoomInformationService,
              private router: Router,
              private http: HttpClient,
              private messageNoti: NzMessageService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      tang: [''],
      dichVu: [''],
      dienTich: [0]
    })
  }

  private getRoomInformation(): void {
    this.roomInformationService.getRoomInformationList(1, 50).subscribe(res => {
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
    this.http.get<any>(`${environment.apiUrl}/chi-tiet-phong/single-list-room`).subscribe((dataRoom) => {
      this.room = dataRoom; // Assign the retrieved data to the room array
    });
  }
}
