import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import { ProjectComponent } from './project.component';
import { ProjectRoutingModule } from './project-routing.module';


@NgModule({
    imports: [ProjectRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule, NzTableModule],
  declarations: [ProjectComponent],
  exports: [ProjectComponent]
})
export class ProjectModule { }

