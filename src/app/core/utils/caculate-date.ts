import { AbstractControl, ValidatorFn } from '@angular/forms';
export default class CalculateDate {
  static age(controlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const currentYear = new Date().getFullYear() - (new Date(control?.value)).getFullYear();
      if (control?.errors && !control.errors['matching']) {
        return null;
      }
      if (currentYear < 12 || currentYear > 100 ){
        controls.get(controlName)?.setErrors({ underage: true });
        return { underage: true }
      }else{
        return null
      }
    };
  }
}