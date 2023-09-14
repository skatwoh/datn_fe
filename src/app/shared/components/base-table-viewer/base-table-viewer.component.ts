import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzTableModule} from "ng-zorro-antd/table";

@Component({
  selector: 'cons-base-table-viewer',
  standalone: true,
  imports: [CommonModule, NzTableModule],
  templateUrl: './base-table-viewer.component.html',
  styleUrls: ['./base-table-viewer.component.scss']
})
export class BaseTableViewerComponent {
  @Input() data: any[] = [];
  @Input() tableFields: string[] = [];
}
