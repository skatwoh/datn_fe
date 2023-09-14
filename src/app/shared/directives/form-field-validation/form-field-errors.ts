import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  min: (errors: any) => `Expect minimum ${errors.min} but got ${errors.actual}`,
  max: (errors: any) =>  `Expect maximum ${errors.max} but got ${errors.actual}`,
  required: () => `This field is required`,
  minlength: (errors: any) => `Expect minimum ${errors.requiredLength} but got ${errors.actualLength}`,
  maxlength: (errors: any) => `Expect maximum ${errors.requiredLength} but got ${errors.actualLength}`,
  email: () => `Require email`,
  unique: () => `Field is unique`,
  mustMatch: (errors: any) => `${errors.matchingControl.label} not match for ${errors.control.label}`,
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
