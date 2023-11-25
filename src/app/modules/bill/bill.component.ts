import {Component, OnInit} from '@angular/core';
import {BillModel} from "../../models/bill.model";
import {BillService} from "./bill.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'cons-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit{
  bill: BillModel[] = [];


  constructor(private billService: BillService, private http: HttpClient) {
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

}
