import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AppConstants} from "../../app-constants";
import {AccountModel} from "../account/models/account.model";
import {AccountService} from "../account/services/account.service";
import {Router} from "@angular/router";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NzCustomColumn } from 'ng-zorro-antd/table';

interface CustomColumn extends NzCustomColumn{
  name: string;
  required?: boolean;
  position?: 'left' | 'right';
}
@Component({
  selector: 'cons-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})

export class LogsComponent implements OnInit {
  readonly APP_DATE_TIME = AppConstants.APP_DATE_TIME;
  accounts: AccountModel[] = [];

  customColumn: CustomColumn[] = [
    {
      name: 'Tên',
      value: 'name',
      default: true,
      required: true,
      position: 'left',
      width: 200,
      fixWidth: true
    },
    {
      name: 'Email',
      value: 'email',
      default: true,
      width: 200
    },
    {
      name: 'Ngày tạo',
      value: 'createdAt',
      default: true,
      width: 200
    },
    {
      name: 'Ngày cập nhật',
      value: 'updatedAt',
      default: true,
      width: 200
    },
    {
      name: 'Quyền',
      value: 'role',
      default: true,
      width: 200
    },
    {
      name: 'Trạng thái',
      value: 'emailVerified',
      default: true,
      width: 200
    },
    {
      name: 'Action',
      value: 'action',
      default: true,
      required: true,
      position: 'right',
      width: 200
    }
  ];

  isLoading = false;
  isVisible: boolean = false;
  title: CustomColumn[] = [];
  footer: CustomColumn[] = [];
  fix: CustomColumn[] = [];
  notFix: CustomColumn[] = [];
  constructor(private accountService: AccountService, private router: Router, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getAccounts();
    this.title = this.customColumn.filter(item => item.position === 'left' && item.required);
    this.footer = this.customColumn.filter(item => item.position === 'right' && item.required);
    this.fix = this.customColumn.filter(item => item.default && !item.required);
    this.notFix = this.customColumn.filter(item => !item.default && !item.required);
  }

  private getAccounts(): void {
    this.accountService.getUserList(1, 15).subscribe(res => {
      if (res && res.content) {
        this.accounts = res.content;
      }
    })
  }

  manualUpdateUserStatus(email: any, index: number, status: boolean): void {
    this.isLoading = true;
    this.accountService.manualActiveUser(email).subscribe(res => {
      if (res?.code === AppConstants.API_SUCCESS_CODE) {
        this.accounts[index].emailVerified = !status;
      }
      this.isLoading = false;
    })
  }

  setUser(email: any, index: number, role: any): void {
    this.isLoading = true;
    this.accountService.setUser(email).subscribe(res => {
      if (res?.code === AppConstants.API_SUCCESS_CODE) {
        this.accounts[index].role = "user";
      }
      this.isLoading = false;
    })
  }

  setAdmin(email: any, index: number, role: any): void {
    this.isLoading = true;
    this.accountService.setAdmin(email).subscribe(res => {
      if (res?.code === AppConstants.API_SUCCESS_CODE) {
        this.accounts[index].role = "admin";
      }
      this.isLoading = false;
    })
  }

  setGuest(email: any, index: number, role: any): void {
    this.isLoading = true;
    this.accountService.setGuest(email).subscribe(res => {
      if (res?.code === AppConstants.API_SUCCESS_CODE) {
        this.accounts[index].role = "";
      }
      this.isLoading = false;
    })
  }

  drop(event: CdkDragDrop<CustomColumn[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.fix = this.fix.map(item => {
      item.default = true;
      return item;
    });
    this.notFix = this.notFix.map(item => {
      item.default = false;
      return item;
    });
    this.cdr.markForCheck();
  }

  deleteCustom(value: CustomColumn, index: number): void {
    value.default = false;
    this.notFix = [...this.notFix, value];
    this.fix.splice(index, 1);
    this.cdr.markForCheck();
  }

  addCustom(value: CustomColumn, index: number): void {
    value.default = true;
    this.fix = [...this.fix, value];
    this.notFix.splice(index, 1);
    this.cdr.markForCheck();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.customColumn = [...this.title, ...this.fix, ...this.notFix, ...this.footer];
    this.isVisible = false;
    this.cdr.markForCheck();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

}
