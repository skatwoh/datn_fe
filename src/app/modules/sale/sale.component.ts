import {Component, OnInit} from '@angular/core';
import {SaleModel} from "../../models/sale.model";
import {SaleService} from "./sale.service";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'cons-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit{
    sale: SaleModel[] = [];
  saleModel!: SaleModel;
  sales : SaleModel = {
    id: 0, ma: undefined, trangThai: undefined,
    ten: '',
    giaTri: 0,
    ngayBatDau: '',
    ngayKetThuc: ''
  };

  visible = false;

    constructor(private saleService: SaleService, private message: NzMessageService) {
    }

    ngOnInit() {
      this.listSale();
    }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

   listSale(): void {
    this.saleService.listSale(1, 50).subscribe(res => {
      if (res && res.content) {
        this.sale= res.content;
      }
    })
  }

  updateStatus(id: any, index: number,status: number): void {
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

  createSale(): void {
      const data = {
        ten: this.sales.ten,
        giaTri: this.sales.giaTri,
        ngayBatDau: this.sales.ngayBatDau,
        ngayKetThuc: this.sales.ngayKetThuc,
      }
    this.saleService.create(data).subscribe({
      next: (res) => {
        this.message.success("Sự kiện " + data.ten + " đã được tạo!");
        this.listSale();
        this.visible = false;
      },
      error: (error) => {
        this.message.error("Đã xảy ra lỗi khi tạo sự kiện.");
        console.error(error);
      },
    });
  }

}
