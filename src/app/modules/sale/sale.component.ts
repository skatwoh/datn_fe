import {Component, OnInit} from '@angular/core';
import {SaleModel} from "../../models/sale.model";
import {SaleService} from "./sale.service";
import {RoomModel} from "../../models/room.model";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'cons-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit{
    sale: SaleModel[] = [];
  saleModel!: SaleModel;

    constructor(private saleService: SaleService, private message: NzMessageService) {
    }

    ngOnInit() {
      this.listSale();
    }

   listSale(): void {
    this.saleService.listSale(1, 50).subscribe(res => {
      if (res && res.content) {
        this.sale= res.content;
      }
    })
  }

  updateStatus(id: any, status: number): void {
    this.saleService.get(id).subscribe((data: SaleModel) => {
      this.saleModel = data;
    });
    this.saleService.updateStatus(id, status)
      .subscribe({
        next: (res) => {
          if (this.saleModel.trangThai === 0) {
            this.message.success("Sự kiện "+ this.saleModel.ten +" đã triển khai!");
            this.saleModel.trangThai = status;
            this.listSale();
          } else if (this.saleModel.trangThai === 1) {
            this.message.success("Sự kiện "+ this.saleModel.ten +" đã kết thúc!");
            this.saleModel.trangThai = status;
            this.listSale();
          }
        },
      });
  }
}
