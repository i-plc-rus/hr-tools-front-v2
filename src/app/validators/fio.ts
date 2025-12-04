import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function fioValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value) {
      return null;
    }

    if (value.replace(/-/g, '').length === 0) {
        return { invalidFIO: { value: control.value } };
    }

    if (value.startsWith('-') || value.endsWith('-')) {
      return { invalidFIO: { value: control.value } };
    }

    if (value.includes('--')) {
      return { invalidFIO: { value: control.value } };
    }
    
    if (/[—–—―]/.test(value)) {
         return { invalidFIO: { value: control.value } };
    }

    return null;
  };
}