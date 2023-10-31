import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import { AssetComponent } from './asset.component';
import { AssetRoutingModule } from './asset-routing.module';

@NgModule({
    imports: [AssetRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule, NzTableModule],
  declarations: [AssetComponent],
  exports: [AssetComponent]
})
export class AssetModule { }
