import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common'
import * as fromPages from './page';
import {HttpClientModule} from '@angular/common/http';
import {IndexComponent} from "./index.component";
import {IndexRoutingModule} from "./index-routing.module";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {FirstCharPipe} from "../../shared/pipes/first-char.pipe";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCarouselModule} from "ng-zorro-antd/carousel";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzRateModule} from "ng-zorro-antd/rate";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzQRCodeModule} from "ng-zorro-antd/qr-code";
import {NzSegmentedModule} from "ng-zorro-antd/segmented";
import {CurrencyFormatPipe} from "../../shared/pipes/CurrencyFormatPipe";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {PaymentModuleModule} from "../../modules/payment/payment.module.module";
import {CommentModule} from "./comment/comment/comment.module";
import {CaseModule} from "./case/case.module";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import { CartComponent } from './cart/cart.component';
import {StepModule} from "./step/step.module";
import {ListRoomOrderComponent} from "./page/list-room-order/list-room-order.component";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {CustomDate} from "../../shared/pipes/custom-date";
import {NzTagModule} from "ng-zorro-antd/tag";
import { ListOrderNowComponent } from './page/list-order-now/list-order-now.component';
import {RecaptchaModule} from "./recaptcha/recaptcha.module";
import {NzSpinModule} from "ng-zorro-antd/spin";

@NgModule({
  declarations: [
    IndexComponent,
    ...fromPages.pages,
    CurrencyFormatPipe,
    CartComponent,
    CustomDate,
    ListOrderNowComponent,
  ],
  exports: [
    CurrencyFormatPipe,
    ListRoomOrderComponent,
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        IndexRoutingModule,
        NzDropDownModule,
        NzAvatarModule,
        FirstCharPipe,
        NzImageModule,
        NgOptimizedImage,
        NzTypographyModule,
        NzButtonModule,
        NzCarouselModule,
        NzBadgeModule,
        NzIconModule,
        NzModalModule,
        NzFormModule,
        NzInputModule,
        NzRateModule,
        ReactiveFormsModule,
        NzDatePickerModule,
        NzInputNumberModule,
        FormsModule,
        NzTableModule,
        NzSelectModule,
        NzQRCodeModule,
        NzSegmentedModule,
        NzTabsModule,
        PaymentModuleModule,
        CommentModule,
        CaseModule,
        NzCheckboxModule,
        NzCollapseModule,
        NzTagModule,
        RecaptchaModule,
        NzSpinModule,
    ]
})
export class IndexModule {
}
