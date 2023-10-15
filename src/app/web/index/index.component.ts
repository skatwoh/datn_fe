import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../auth/services";

@Component({
  selector: 'cons-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  isCollapsed = false;
  user$: Observable<any>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser$;
  }

  onLogout(): void {
    this.authService.logout();
  }

  onLogout1(): void {
    this.authService.logout1();
  }
}
