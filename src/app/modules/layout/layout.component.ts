import {Component} from '@angular/core';
import {AuthService} from '../../auth/services';
import {Observable} from 'rxjs';
import {BillService} from "../bill/bill.service";
import {BillModel} from "../../models/bill.model";

@Component({
  selector: 'cons-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isCollapsed = false;
  user$: Observable<any>;
  theme = true;
  bill: BillModel[] = [];
  countBill: number = 0;

  constructor(private authService: AuthService, private billService: BillService) {
    this.user$ = this.authService.currentUser$;
    this.getBills()
  }

  private getBills(): void {
    this.billService.getBillsXacNhan(1, 50).subscribe(res => {
      if (res && res.content) {
        this.bill = res.content;
        this.countBill = res.content.length;
      }
    })
  }

  onLogout(): void {
    this.authService.logout();
  }
}
