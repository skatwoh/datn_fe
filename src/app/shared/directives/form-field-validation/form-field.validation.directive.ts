import { Directive, ElementRef, HostListener, Inject, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FORM_ERRORS } from './form-field-errors';

@Directive({
  selector: '[consFormFieldValidation]',
  standalone: true
})
export class FormFieldValidationDirective {

  @Input() formGroup!: FormGroup;

  constructor(
    @Inject(FORM_ERRORS) private defaultErrors: any,
    private el: ElementRef
  ) {
  }

  @HostListener('submit', ['$event'])
  onSubmitForm(event: Event): void {
    this.evenHandle(event);
  }

  @HostListener('change', ['$event'])
  onChangeForm(event: Event): void {
    this.evenHandle(event);
  }

  private evenHandle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.getFormErrors();
  }

  private getFormErrors(): void {
    this.validateAllFormFields(this.formGroup);

    // for (const key of Object.keys(this.formGroup.controls)) {
    //   if (this.formGroup.controls[key].invalid) {
    //     const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
    //     invalidControl.focus();
    //     break;
    //   }
    // }
  }

  private validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control: any = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }

      // Remove error tag
      const errorTagId = field + '-error';
      const existedErrorTag = this.el.nativeElement.querySelector('#' + errorTagId);
      if (existedErrorTag) {
        existedErrorTag.remove();
      }

      if (control.invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + field + '"]');
        const controlErrors: any = control.errors;
        const firstKey = Object.keys(controlErrors)[0];
        const getError = this.defaultErrors[firstKey];
        const text = getError(controlErrors[firstKey]);

        invalidControl.parentElement.insertAdjacentHTML(
          'beforeend',
          '<div id="' + errorTagId + '" class="text-sm text-red-600 block mt-1">' + text + '</div>'
        );
      }
    });
  }

}
