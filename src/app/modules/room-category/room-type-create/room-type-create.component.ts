import {Component} from '@angular/core';
import {RoomService} from "../../room/services/room.service";
import {RoomTypeModel} from "../../../models/room-type.model";
import {RoomTypeService} from "../services/room-type.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'cons-room-type-create',
  templateUrl: './room-type-create.component.html',
  styleUrls: ['./room-type-create.component.scss']
})
export class RoomTypeCreateComponent {
  roomTypeForm : FormGroup;
  submitted = false;

  constructor(private roomTypeService: RoomTypeService,
              private router: Router,
              private message: NzMessageService,
              private formBuilder: FormBuilder) {
    this.roomTypeForm = this.formBuilder.group({
      tenLoaiPhong: ['', Validators.required],
      soNguoi: new FormControl('', Validators.compose([Validators.min(1), Validators.max(10)])),
      tienIch: ['', Validators.required],
      giaTheoNgay: new FormControl('', Validators.compose([Validators.min(100000), Validators.max(100000000000)])),
      ghiChu: ['', Validators.required]
    });
  }

  successMessage(): void {
    this.message.success('Thêm thành công');
  }

  saveRoom(): void {
    if (this.roomTypeForm.valid) {
      const data = this.roomTypeForm.value;

      this.roomTypeService.create(data).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.successMessage();
          this.router.navigate(['/admin/room-type']);
        },
        error: (e) => console.error(e)
      });
    }
  }

  protected readonly RoomTypeModel = RoomTypeModel;
}
