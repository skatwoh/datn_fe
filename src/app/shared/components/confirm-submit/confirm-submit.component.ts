import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import {NZ_MODAL_DATA, NzModalModule, NzModalRef} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {FormFieldValidationDirective} from "../../directives/form-field-validation";

@Component({
  selector: 'cons-confirm-submit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzSelectModule, NzModalModule, NzButtonModule, FormFieldValidationDirective],
  templateUrl: './confirm-submit.component.html',
  styleUrls: ['./confirm-submit.component.scss']
})
export class ConfirmSubmitComponent implements OnInit, OnDestroy {

  @ViewChild('form') form!: ElementRef;
  confirmationForm: FormGroup;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    @Inject(NZ_MODAL_DATA) public data: any) {
    this.confirmationForm = this.fb.group({
      env: ['dev', Validators.compose([Validators.required])],
      isTruncateTable: [false],
    });
  }

  ngOnInit(): void {
  }

  handleSubmit(): void {
    const event = new Event('submit', { bubbles: true, cancelable: true });
    if (this.form.nativeElement.dispatchEvent(event)) {
      this.form.nativeElement.submit();
    }
  }

  ngOnDestroy(): void {
  }
}
