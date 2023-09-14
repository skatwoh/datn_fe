import { FormGroup } from '@angular/forms';

export interface ControlObj {
  name: string;
  label: string;
}

export function MustMatch(controlObj: ControlObj, matchingControl: ControlObj) {
  return (formGroup: FormGroup) => {
    const firstControl: any = formGroup.controls[controlObj.name];
    const secondControl: any = formGroup.controls[matchingControl.name];

    if (secondControl.errors && !secondControl.errors.mustMatch) {
      return;
    }

    if (firstControl.value !== secondControl.value) {
      secondControl.setErrors({
        mustMatch: {
          control: controlObj,
          matchingControl,
          msg: `${matchingControl.label ? matchingControl.label : matchingControl.name} not match for ${controlObj.label ? controlObj.label : controlObj.name}`
        }
      });
    } else {
      secondControl.setErrors(null);
    }
  }
}
