import {Component, OnInit} from '@angular/core';
import {RoomTypeModel} from "../../../../models/room-type.model";
import {RoomTypeService} from "../../../../modules/room-category/services/room-type.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'cons-room-order',
  templateUrl: './room-order.component.html',
  styleUrls: ['./room-order.component.scss']
})
export class RoomOrderComponent implements OnInit{
  roomType!: RoomTypeModel;
  checkIn: any;
  checkOut: any;
  soNguoi: number = 1;
  soPhong: number = 1;

  constructor(private roomTypeService: RoomTypeService,private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
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
    this.getRoomType();
  }

  getRoomType() {
    const id = this.route.snapshot.paramMap.get('id');
    this.roomTypeService.get(id).subscribe(res => {
      this.roomType = res;
    })
  }

}
