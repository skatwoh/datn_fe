import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { LayoutComponent } from './layout.component';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterModule } from '@angular/router';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {FirstCharPipe} from '../../shared/pipes/first-char.pipe';
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {FormsModule} from "@angular/forms";
import {NzBadgeModule} from "ng-zorro-antd/badge";


@NgModule({
  declarations: [
    LayoutComponent
  ],
    imports: [
        CommonModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        RouterModule,
        NzGridModule,
        NzDropDownModule,
        NzAvatarModule,
        FirstCharPipe,
        NzSwitchModule,
        FormsModule,
        NgOptimizedImage,
        NzBadgeModule
    ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
