import { AbstractControl, ValidationErrors } from '@angular/forms';

export function strictEmailValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null; // Do not validate if the field is empty
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(control.value) ? null : { strictEmail: true };
}
