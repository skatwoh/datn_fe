import {Component, OnInit} from '@angular/core';
import {BillModel} from "../../models/bill.model";
import {BillService} from "./bill.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RoomModel} from "../../models/room.model";
import {RoomOrder} from "../../models/room-order";
import {ListRoomOrderService} from "../../web/index/page/list-room-order/list-room-order.service";
import * as moment from "moment";

@Component({
  selector: 'cons-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit{
  bill: BillModel[] = [];
  currentBill!: BillModel;
  roomOrder: RoomOrder[] = [];
  roomOrderModel!: RoomOrder;
  billModel!: BillModel;
  isVisible = false;
  date : Date = new Date();
  check = false;
  constructor(private billService: BillService, private http: HttpClient, private roomOrderService: ListRoomOrderService) {
  }

  private getBills(): void {
    this.billService.getBillList(1, 50).subscribe(res => {
      if (res && res.content) {
        this.bill= res.content;
      }
    })
  }

  ngOnInit(): void {
    this.getBills();
  }

  updateStatus(id: any){
    this.billService.get(id).subscribe((data: BillModel) => {
      this.currentBill = data;
      console.log(this.currentBill);
    });
    this.billService.updateStatus(id, 0).subscribe({
      next: (res) => {
        this.currentBill.trangThai = 0;
        this.getBills();
        console.log(res);
      },
    })
  }

  updateStatusRoomOrder(id: any, trangThai: any){
    this.roomOrderService.get(id).subscribe((data: RoomOrder) => {
      this.roomOrderModel = data;
      this.checkDate();
      this.billService.updateStatusRoomOrder(id, trangThai).subscribe({
        next: (res) => {
          this.roomOrderModel.trangThai = trangThai;
          this.billService.getDatPhongByHoaDon(1, 50, this.roomOrderModel.idHoaDon).subscribe(res => {
            if (res && res.content) {
              this.roomOrder = res.content;
            }
          })
          console.log(res);
        },
      })
    });

  }

  checkDate(){
    if ((this.roomOrderModel.checkIn ?? '') > this.date.toISOString()){
      this.check = true;
    }else{
      this.check = false;
    }
  }

  huyHoaDon(id: any){
    this.billService.get(id).subscribe((data: BillModel) => {
      this.currentBill = data;
      console.log(this.currentBill);
    });
    this.billService.updateStatus(id, 4).subscribe({
      next: (res) => {
        this.currentBill.trangThai = 4;
        this.getBills();
        console.log(res);
      },
    })
  }

  thanhToanSau(id: any){
    this.billService.get(id).subscribe((data: BillModel) => {
      this.currentBill = data;
      console.log(this.currentBill);
    });
    this.billService.updateStatus(id, 3).subscribe({
      next: (res) => {
        this.currentBill.trangThai = 3;
        this.getBills();
        console.log(res);
      },
    })
  }

  generatePDF(id: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/pdf',
      'Charset': 'UTF-8'
    });
    this.http.get(`rpc/bds/hoa-don/generate-hoa-don?id=${id}`, {headers: headers, responseType: 'blob'})
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

  showChiTiet(id: any){
    this.isVisible = true;
    this.billService.getDatPhongByHoaDon(1, 50, id).subscribe(res => {
      if (res && res.content) {
        // this.billService.get(res.content[0].idHoaDon).subscribe(data => {
        //   this.billModel = data;
        // })
        this.roomOrder = res.content;
      }
    })
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
