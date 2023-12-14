import {Component, OnInit} from '@angular/core';
import {RoomServiceModel} from "../../../models/room-service.model";
import {RoomServiceService} from "../service/room-service.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'cons-room-service-create',
  templateUrl: './room-service-create.component.html',
  styleUrls: ['./room-service-create.component.scss']
})
export class RoomServiceCreateComponent implements OnInit{
  roomservice : RoomServiceModel ={
    id: 0,
    ma: '',
    tenDichVu: '',
    ghiChu: '',
    giaDichVu: 0,
    trangThai: 0
  };
  submitted = false;
  // @ts-ignore
  submitForm: FormGroup;

  constructor(private roomSerivceSerivce: RoomServiceService, private fb: FormBuilder) {
    this.submitForm = this.fb.group({
      tenDichVu: ['',Validators.required],
      ghiChu: ['', Validators.required],
      giaDichVu: new FormControl(null, Validators.compose([ Validators.nullValidator, Validators.min(1000), Validators.max(100000000000)])),
    });
  }

  ngOnInit() {
    console.log(this.roomservice);
  }


  saveRoomService(): void {
    if (this.submitForm.valid) {
      const data = this.submitForm.value;

      this.roomSerivceSerivce.create(data).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
    }
  }

  newRoomService(): void {
    this.submitted = false;
    this.roomservice = {
      id: 0,
      ma: '',
      tenDichVu: '',
      ghiChu: '',
      giaDichVu: 0,
      trangThai: 0
    };
  }

  protected readonly RoomServiceModel = RoomServiceModel;

}
