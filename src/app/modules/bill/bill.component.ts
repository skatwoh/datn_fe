import {Component, OnInit} from '@angular/core';
import {BillModel} from "../../models/bill.model";
import {BillService} from "./bill.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RoomModel} from "../../models/room.model";
import {RoomOrder} from "../../models/room-order";
import {ListRoomOrderService} from "../../web/index/page/list-room-order/list-room-order.service";
import * as moment from "moment";
import {NzMessageService} from "ng-zorro-antd/message";
import {RoomServiceModel} from "../../models/room-service.model";
import {RoomServiceService} from "../room-service/service/room-service.service";
import {DetailsServiceModel} from "../../models/details-service.model";

@Component({
    selector: 'cons-bill',
    templateUrl: './bill.component.html',
    styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
    bill: BillModel[] = [];
    currentBill!: BillModel;
    roomOrder: RoomOrder[] = [];
    roomOrderModel!: RoomOrder;
    billModel!: BillModel;
    isVisible = false;
    date: Date = new Date();
    check = false;
    tongTienKhachHang: number = 0;
    isVisibleDichVu = false;
    isVisibleChiTietDichVu = false;
    roomservice: RoomServiceModel[] = [];
    detailsService: DetailsServiceModel[] = [];
    dataList: any[] = [];
    listSoLuong: any[] = [];
    idDP: any;
    idHD: any;
    tongTienDichVu: number = 0;
    tienDichVu: number = 0;
    inputSoLuong: any[] = [];
    soLuongCu: any = 1;
  state: Map<number, boolean> = new Map();
  tienPhongHD: number = 0;
  tienDichVuHD: number = 0;
  tienHoanLaiHD: number = 0;
  tienPhatHD: number = 0;
  tienGiamGiaHD: number = 0;
  thanhToanTruoc: number = 0;

    constructor(private billService: BillService, private http: HttpClient, private roomOrderService: ListRoomOrderService, private message: NzMessageService,
                private roomSerivceService: RoomServiceService) {
    }

    private getBills(): void {
        this.billService.getBillList(1, 50).subscribe(res => {
            if (res && res.content) {
                this.bill = res.content;
            }
        })
    }

    ngOnInit(): void {
        this.getBills();
    }

    updateStatus(id: any, idKhachHang: any) {
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
        setTimeout(() => {
            this.billService.getTongTienByKhachHang(idKhachHang).subscribe(res => {
                console.log(res);
                this.tongTienKhachHang = res.body;
            })
        }, 300)

        setTimeout(() => {
            console.log(this.tongTienKhachHang);
            if (this.tongTienKhachHang >= 100000000) {
                this.billService.updateRankKhachHang(idKhachHang, 4).subscribe({
                    next: (res) => {
                        console.log(res);
                    }
                })
            } else if (this.tongTienKhachHang >= 60000000) {
                this.billService.updateRankKhachHang(idKhachHang, 3).subscribe({
                    next: (res) => {
                        console.log(res);
                    }
                })
            } else if (this.tongTienKhachHang >= 20000000) {
                this.billService.updateRankKhachHang(idKhachHang, 2).subscribe({
                    next: (res) => {
                        console.log(res);
                    }
                })
            }
        }, 600)
    }

    xacNhanTienCoc(id: any, idKhachHang: any) {
        this.billService.get(id).subscribe((data: any) => {
            this.currentBill = data;
          this.billService.updateTienCoc(id, data.tongTien*0.5).subscribe({
            next: (res) => {
              this.currentBill.tienCoc = data.tongTien*0.5;
            },
          })
        });
        this.billService.updateStatus(id, 7).subscribe({
            next: (res) => {
                this.currentBill.trangThai = 7;
                this.getBills();
                console.log(res);
            },
        })
        this.billService.getDatPhongByHoaDon(1, 50, id).subscribe(res => {
            if (res && res.content) {
                this.roomOrder = res.content;
            }
        })
        // setTimeout(() =>{
        //   for (let x = 0;x < this.roomOrder.length;x++){
        //     this.billService.updateStatusRoomOrder(this.roomOrder[x].id, 1).subscribe( res => {
        //       console.log(res);
        //     })
        //   }
        // }, 300)
    }

    updateStatusRoomOrder(id: any, trangThai: any) {
        this.roomOrderService.get(id).subscribe((data: RoomOrder) => {
            this.roomOrderModel = data;
            if ((data.checkIn?.split('T')[0] ?? 0) > this.date.toISOString().split('T')[0] && data.trangThai == 1) {
                this.message.warning('Chưa đến ngày check-in!');
                return;
            }
            // this.checkDate();
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

    checkDate() {
        if ((this.roomOrderModel.checkIn ?? '') > this.date.toISOString()) {
            this.check = true;
        } else {
            this.check = false;
        }
    }

    huyHoaDon(id: any) {
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

    thanhToanSau(id: any) {
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
              this.billService.get(id).subscribe(res => {
                const blob = new Blob([response], {type: 'application/pdf'});
                const url = window.URL.createObjectURL(blob);
                window.open(url);
                const downloadLink = document.createElement('a');
                downloadLink.href = url;
                downloadLink.download = 'hoa_don_dat_phong_' + res.ma + '.pdf';
                downloadLink.click();
                })
            });
    }

    showChiTiet(id: any, tienPhong: any, tienDichVu: any, tienPhat: any, tienHoanLai: any, tienGiamGia: any, thanhToanTruoc: any) {
        this.isVisible = true;
        this.idHD = id;
        this.tienPhongHD = tienPhong;
        this.tienDichVuHD = tienDichVu;
        this.tienPhatHD = tienPhat;
        this.tienHoanLaiHD = tienHoanLai;
        this.tienGiamGiaHD = tienGiamGia;
        this.thanhToanTruoc = thanhToanTruoc;
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
        this.tongTienDichVu = 0;
        setTimeout(() => {
            this.getBills();
        }, 500)
    }

    searchInput: string = '';

    getBillByString(): void {
        const inputElement = document.getElementById('searchInput') as HTMLInputElement;
        this.searchInput = inputElement.value;
          this.billService.getBillsBySearch(1, 50, this.searchInput, (document.getElementById('trangThaiHoaDon') as HTMLInputElement).value,
            (document.getElementById('startDate') as HTMLInputElement).value, (document.getElementById('endDate') as HTMLInputElement).value).subscribe(res => {
            const queryParams = {
              searchInput: this.searchInput
            };
            if (res && res.content) {
              this.bill = res.content;
            }
            // this.router.navigate(['/room'], { queryParams });
          })
    }

    showModalChiTietDichVu(id: any) {
        this.isVisibleChiTietDichVu = true;
        this.idDP = id;
        this.billService.getAllChiTietDichVuByDatPhong(1, 15, id).subscribe(res => {
            if (res && res.content) {
                this.detailsService = res.content;
            }
        })
    }

    showModalDichVu(id: any) {
      this.roomOrderService.get(id).subscribe(res => {
        if(res.trangThai === 3){
          this.message.warning('Phòng đã trả không thể thêm dịch vụ')
          return;
        }else if(res.trangThai !== 3){
          this.isVisibleDichVu = true;
          this.idDP = id;
          this.roomSerivceService.getRoomSerivceList(1, 15).subscribe(res2 => {
            if (res2 && res2.content) {
              this.roomservice = res2.content;
            }
          })
        }
      })

        // setTimeout(() =>{
        //   for(let x = 0;x<=this.roomservice.length;x++){
        //     this.inputSoLuong.push(this.roomservice[x].id);
        //   }
        // }, 300)
    }

    handleCancelDichVu(): void {
        this.tongTienDichVu = 0;
        this.tienDichVu = 0;
        this.dataList = [];
        this.listSoLuong = [];
        this.isVisibleDichVu = false;
    }

    handleCancelChiTietDichVu(): void {
        this.tongTienDichVu = 0;
        this.isVisibleChiTietDichVu = false;
    }


    addListDichVu(value: any, event: Event, gia: any): void {
        const checkbox = event.target as HTMLInputElement;
        // this.selectedValues = this.checkboxes.filter(checkbox => checkbox.nzChecked).map(checkbox => checkbox.nzValue);
        const soLuongDV = document.getElementById(value) as HTMLInputElement;
        if (checkbox.checked) {
            this.soLuongCu = 1;
            this.dataList.push(value);
            this.tongTienDichVu += (gia * Number.parseInt(soLuongDV.value));
            console.log(this.dataList)
        }
        if (!checkbox.checked) {
            this.dataList.splice(this.dataList.indexOf(value), 1);
            this.tongTienDichVu -= (gia * Number.parseInt(soLuongDV.value));
          this.state.set(value, !checkbox.checked);
            console.log(this.dataList)
        }
    }

    thayDoiTongTien(value: any, gia: any) {
        const soLuong1DV = document.getElementById(value) as HTMLInputElement;
        if ((document.getElementById(value) as HTMLInputElement).value === '' || (document.getElementById(value) as HTMLInputElement).value === null) {
            this.tienDichVu = 0;
            this.tongTienDichVu = this.tongTienDichVu - (gia * this.soLuongCu) + this.tienDichVu;
            console.log(this.tienDichVu);
            this.soLuongCu = 0;
        } else {
            this.tienDichVu = 0;
            this.tienDichVu += (gia * Number.parseInt(soLuong1DV.value));
            this.tongTienDichVu = this.tongTienDichVu - (gia * this.soLuongCu) + this.tienDichVu;
            console.log(this.tienDichVu);
            this.soLuongCu = Number.parseInt(soLuong1DV.value);
        }

    }

    addDichVu(id: any) {
        for (let x = 0; x < this.dataList.length; x++) {
            const soLuong = document.getElementById(this.dataList[x]) as HTMLInputElement;
            const data1 = {
                idDichVu: this.dataList[x],
                idDatPhong: id,
                ghiChu: '',
                trangThai: soLuong.value
            }
            this.billService.addDichVu(data1).subscribe((res: any) => {
                console.log(res)
            })
        }
        // this.billService.tinhTienDichVu(this.idHD, this.tongTienDichVu).subscribe((res: any) => {
        //     console.log(res)
        // })
        this.dataList = [];
        this.successMessage();
        this.isVisibleDichVu = false;
        this.isVisibleChiTietDichVu = false;
        setTimeout(() => {
            this.isVisibleChiTietDichVu = true;
            this.idDP = id;
            this.billService.getAllChiTietDichVuByDatPhong(1, 15, this.idDP).subscribe(res => {
                if (res && res.content) {
                    this.detailsService = res.content;
                }
            })
        }, 500)
    }

    successMessage(): void {
        this.message.success('Thêm thành công');
    }

    generatePDFDichVu(id: any) {
        this.roomOrderService.get(id).subscribe(res => {
          this.roomOrderModel = res;
        })
      setTimeout(() =>{
        if(this.roomOrderModel.trangThai !== 3){
          this.message.warning('Chỉ được xuất hóa đơn sau khi đã trả phòng!');
          return;
        }
        const headers = new HttpHeaders({
          'Content-Type': 'application/pdf',
          'Charset': 'UTF-8'
        });
        this.http.get(`rpc/bds/chi-tiet-dich-vu/generate-hoa-don-dich-vu?id=${id}`, {headers: headers, responseType: 'blob'})
          .subscribe(response => {
            const blob = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'hoa_don_dich_vu.pdf';
            downloadLink.click();
          });
      }, 300)

    }

    huyDichVu(id: any){
      this.billService.huyDichVu(id).subscribe({
        next: (res) => {
          this.message.success("Xóa dịch vụ thành công");
          this.isVisibleChiTietDichVu = false;
        },
      })
      setTimeout(() => {
        this.billService.getAllChiTietDichVuByDatPhong(1, 15, this.idDP).subscribe(res => {
          if (res && res.content) {
            this.detailsService = res.content;
          }
        })
        this.isVisibleChiTietDichVu = true;
      }, 1000)
    }

  protected readonly Number = Number;
}
