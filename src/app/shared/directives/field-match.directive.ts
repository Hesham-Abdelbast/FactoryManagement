import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appFieldMatch]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: FieldMatchDirective,
      multi: true,
    }
  ]
})
export class FieldMatchDirective implements Validator {
  @Input('appFieldMatch') fieldNames: [string, string] = ['field1', 'field2'];

  validate(control: AbstractControl): ValidationErrors | null {
    const [firstKey, secondKey] = this.fieldNames;
    const firstControl = control.get(firstKey);
    const secondControl = control.get(secondKey);

    if (!firstControl || !secondControl) return null;

    return firstControl.value !== secondControl.value
      ? { fieldMismatch: true }
      : null;
  }
}
