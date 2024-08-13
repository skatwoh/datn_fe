import {Component, OnInit} from '@angular/core';
import {RoomTypeModel} from '../../models/room-type.model';
import {RoomTypeService} from './services/room-type.service';
import {Router} from '@angular/router';
import {NzMessageService} from "ng-zorro-antd/message";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'cons-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss']
})
export class RoomTypeComponent implements OnInit{
  roomType: RoomTypeModel[] = [];
  message ='';
  isVisible = false;
  isOkLoading = false;
  currentRoomType!: RoomTypeModel;
  form: FormGroup;
  // detail
  id: number | undefined;
  constructor(private roomTypeService: RoomTypeService, private router: Router,
              private messageNoti: NzMessageService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      tenLoaiPhong: [''],
      soNguoi: [0],
      tienIch: [''],
      giaTheoNgay: [0],
      ghiChu: ['']
    })
  }

  showModal(id: any): void {
    this.isVisible = true;
    this.id = id;
    this.roomTypeService.get(this.id).subscribe((data: RoomTypeModel) => {
      this.currentRoomType = data;
      console.log(this.currentRoomType);
    });
  }

  handleOk(): void {
    if (!this.form.valid) {
      return;
    }
    this.isOkLoading = true;
    this.updateRoomType();
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
  }

  handleCancel(): void {
    this.isVisible = false;
  }


  private getRoomTypes(): void {
    this.roomTypeService.getRoomTypeList(1, 30).subscribe(res => {
      if (res && res.content) {
        this.roomType= res.content;
      }
    })
  }

  updateRoomType(): void {
    this.roomTypeService
      .updateRoomType(this.currentRoomType.id, this.currentRoomType)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : this.messageNoti.success('Update thành công', {
              nzDuration: 5000
            });
          this.getRoomTypes();
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit() {
    this.getRoomTypes();
  }
}
