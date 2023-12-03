import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentComponent} from "../comment.component";
import {FormsModule} from "@angular/forms";
import {NzRateModule} from "ng-zorro-antd/rate";



@NgModule({
  declarations: [CommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzRateModule
  ],
  exports: [
    CommentComponent
  ]
})
export class CommentModule { }
