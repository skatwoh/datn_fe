import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {RoomService} from "../room/services/room.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {RoomTypeModel} from "../../models/room-type.model";
import {RoomManagerService} from "../room-manager/services/room-manager.service";
import {RoomOrderMappingModel} from "../../models/room-order-mapping.model";
import {formatDate} from "@angular/common";
import {NzModalService} from "ng-zorro-antd/modal";
import {RoomServiceService} from "../room-service/service/room-service.service";
import {RoomServiceModel} from "../../models/room-service.model";


@Component({
  selector: 'cons-room-order-manager',
  templateUrl: './room-order-manager.component.html',
  styleUrls: ['./room-order-manager.component.scss']
})
export class RoomOrderManagerComponent implements OnInit{
  room: RoomOrderMappingModel[] = [];
  roomOfBill: RoomOrderMappingModel[] = [];
  roomType: RoomTypeModel[] = [];
  isVisible = false;
  roomModel!: RoomOrderMappingModel;
  roomServiceModel: RoomServiceModel[] = [];

  constructor(private roomService: RoomService,
              private http: HttpClient,
              private roomManagerService: RoomManagerService,
              private modal: NzModalService,
              private viewContainerRef: ViewContainerRef,
              private roomSerivceService: RoomServiceService) {
  }

  getRoom(){
    this.roomManagerService.getAllDPMapping().subscribe(res => {
      this.room = res;
    })
  }

  resetSearch(){
    (document.getElementById('checkOut') as HTMLInputElement).value = '';
    (document.getElementById('tenLoaiPhong') as HTMLInputElement).value = '';
    (document.getElementById('trangThai') as HTMLInputElement).value = '0';
    (document.getElementById('khachHang') as HTMLInputElement).value = '';
  }

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/phong/single-list-room-type`).subscribe((data2) => {
      this.roomType = data2; // Gán dữ liệu lấy được vào biến roomType
    });
    this.getRoom();
  }

  showDetail(id: any, idDP: any, idHD: any){
    this.isVisible = true;
    this.roomManagerService.getDPById(id).subscribe(res => {
      this.roomModel = res;
    })
    this.roomManagerService.getAllDPMappingByHD(idDP, idHD).subscribe(res => {
      this.roomOfBill = res;
    })
    this.getRoomSerivces();
  }

  private getRoomSerivces(): void {
    this.roomSerivceService.getRoomSerivceList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.roomServiceModel= res.content;
      }
    })
  }

  handleCancel(){
    this.isVisible = false;
  }

  onOk(){
    this.isVisible = false;
  }

  viewRoom(){

  }

  protected readonly formatDate = formatDate;
}
