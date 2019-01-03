import { Directive } from '@angular/core';
import { FormArray, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appRequiredValidator]'
})

export class RequiredValidatorDirective {
  constructor() { }
}

export function requiredCheckboxValidator(min = 1): ValidatorFn {
  return (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next === null ? prev : prev + 1, 0);

    return totalSelected >= min ? null : { required: true };
  };
}
