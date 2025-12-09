import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function valueMustChangeValidator(initialValue: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentValue = control.value;

    if (currentValue === initialValue) {
      return { 'valueNotChanged': true };
    }

    return null;
  };
}