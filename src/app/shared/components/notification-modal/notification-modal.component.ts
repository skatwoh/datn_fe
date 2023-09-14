import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzResultModule} from 'ng-zorro-antd/result';
import {NzButtonModule} from 'ng-zorro-antd/button';

@Component({
  selector: 'cons-notification-modal',
  standalone: true,
  imports: [CommonModule, NzResultModule, NzButtonModule],
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit, OnDestroy {
  @Input() data: any;
  constructor() {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }


}
