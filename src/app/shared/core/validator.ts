import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidationError } from './validation-error';

export class Validator {
  constructor(private formGroup: FormGroup) { }

  private getGroupErrors(formGroup: FormGroup): ValidationError[] {
    let errors: ValidationError[] = [];
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      if (control instanceof FormGroup)
        errors = errors.concat(this.getGroupErrors(control));
      errors = errors.concat(this.getControlErrors(control, key));
    });
    return errors;
  }

  getErrors(control: AbstractControl): string {
    return ''.concat(...this.getControlErrors(control).map(error => error.description));
  }


  getControlErrors(control: AbstractControl, key?: string): ValidationError[] {
    if (!key)
      key = this.getName(control);
    if (control.errors !== null)
      return Object.keys(control.errors).map(keyError =>
        new ValidationError(key, keyError, control.errors[keyError]));
    return [];
  }

  private getName(control: AbstractControl): string | null {
    const group = control.parent as FormGroup;
    if (!group) return null;

    let name: string;
    Object.keys(group.controls).find(key => {
      if (group.get(key) === control) {
        name = key;
        return true;
      }
    });

    return name;
  }
}

