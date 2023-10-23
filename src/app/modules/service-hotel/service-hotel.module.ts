import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import { ServiceHotelComponent } from './hotel-service.component';
import { ServiceHotelRoutingModule } from './service-hotel-routing.module';

@NgModule({
    imports: [ServiceHotelRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule, NzTableModule],
  declarations: [ServiceHotelComponent],
  exports: [ServiceHotelComponent]
})
export class ServiceHotelModule { }

