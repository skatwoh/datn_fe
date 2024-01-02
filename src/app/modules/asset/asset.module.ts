import {NgModule} from '@angular/core';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzTableModule} from "ng-zorro-antd/table";
import { AssetComponent } from './asset.component';
import { AssetRoutingModule } from './asset-routing.module';
import { AssetCreateComponent } from './asset-create/asset-create.component';
import { AssetDetailComponent } from './asset-detail/asset-detail.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzWaveModule} from "ng-zorro-antd/core/wave";

@NgModule({
  imports: [AssetRoutingModule, NzBreadCrumbModule, DatePipe, NgForOf, NgIf, NzPageHeaderModule, NzSwitchModule, NzTableModule, NzIconModule, ReactiveFormsModule, FormsModule, NzButtonModule, NzFormModule, NzGridModule, NzInputModule, NzWaveModule],
  declarations: [AssetComponent, AssetCreateComponent, AssetDetailComponent],
  exports: [AssetComponent]
})
export class AssetModule { }
