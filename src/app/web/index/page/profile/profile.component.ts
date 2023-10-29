import {Component, TemplateRef} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../../../../auth/services";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'cons-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user$: Observable<any>;
  isVisible = false;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.currentUser$;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
