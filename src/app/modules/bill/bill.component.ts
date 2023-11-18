import {Component, OnInit} from '@angular/core';
import {BillModel} from "../../models/bill.model";
import {BillService} from "./bill.service";

@Component({
  selector: 'cons-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit{
  bill: BillModel[] = [];


  constructor(private billService: BillService) {
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

}
