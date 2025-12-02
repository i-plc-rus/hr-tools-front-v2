import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenPhoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const numericValue = value.replace(/\D/g, '');

    if (/^0+$/.test(numericValue) && numericValue.length > 5) {
      return { forbiddenPhoneNumber: { value: control.value } };
    }
    
    if (/^([1-9])\1+$/.test(numericValue) && numericValue.length >= 7) { 
       return { forbiddenPhoneNumber: { value: control.value } };
    }

    return null;
  };
}