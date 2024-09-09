import { NgModule } from '@angular/core';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { NgForOf, NgIf, NgStyle } from "@angular/common";
import { NzGridModule } from "ng-zorro-antd/grid";
import { ChartComponent } from "../../shared/components/chart/chart.component";
import { NzBreadCrumbModule } from "ng-zorro-antd/breadcrumb";
import { NzPageHeaderModule } from "ng-zorro-antd/page-header";
import { CaseModule } from "../../web/index/case/case.module";
import { FormsModule } from "@angular/forms";
import { NgxGanttComponent, NgxGanttTableColumnComponent, NgxGanttTableComponent, GANTT_GLOBAL_CONFIG } from "@worktile/gantt"; // Import GANTT_GLOBAL_CONFIG

@NgModule({
  imports: [
    WelcomeRoutingModule,
    NgStyle,
    NzGridModule,
    ChartComponent,
    NzBreadCrumbModule,
    NzPageHeaderModule,
    CaseModule,
    NgIf,
    FormsModule,
    NgForOf,
    NgxGanttComponent,
    NgxGanttTableComponent,
    NgxGanttTableColumnComponent
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
  providers: [
    {
      provide: GANTT_GLOBAL_CONFIG,
      useValue: {
        dateFormat: 'yyyy-MM-dd', // Hoặc các cấu hình khác theo yêu cầu của bạn
        // Thêm các cấu hình khác nếu cần
      }
    }
  ]
})
export class WelcomeModule { }
