//validator custom per permettere step a numeri interi ma continuando a rifiutare lo 0
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function positiveAmountValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (value === null || value === '') {
    return null;
  }

  return value > 0 ? null : { positiveAmount: true };
}
