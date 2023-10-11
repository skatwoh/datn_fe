import {Component, Input, OnInit} from '@angular/core';
import {AccountUserModel} from "../../../models/account-user.model";
import {AccountUserService} from "../services/account-user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'cons-account-user-detail',
  templateUrl: './account-user-detail.component.html',
  styleUrls: ['./account-user-detail.component.scss'],
  standalone: true,
  imports: [
    NgIf, NgFor
  ]
})
export class AccountUserDetailComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentAccountUser: AccountUserModel = {
    id: 0,
    ten: '',
    email: '',
    matKhau: '',
    trangThai: 0,
    maKhachHang: ''
  };

  accountUser: AccountUserModel[] = [];

  message = '';

  constructor(
    private accountUserService: AccountUserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params['id']);
    }
  }

  getTutorial(id: number): void {
    this.accountUserService.get(id).subscribe({
      next: (data) => {
        this.currentAccountUser = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

}
