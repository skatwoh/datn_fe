import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import { RoomCategoryComponent } from './room-category.component';
import { RoomCategoryRoutingModule } from './room-category-routing.module';


@NgModule({
    imports: [RoomCategoryRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule, NzTableModule],
  declarations: [RoomCategoryComponent],
  exports: [RoomCategoryComponent]
})
export class RoomCategoryModule { }
