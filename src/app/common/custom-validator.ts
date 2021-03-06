import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { UserService } from "../services/user.service";

export class CustomValidator {

    static forbiddenWords(regExp : RegExp): ValidatorFn {

        return(control: AbstractControl): {[key:string]: any} | null => {
            const forbidden = regExp.test(control.value);

            return forbidden ? { 'forbidden': {value: control.value}} : null;
        };

    }
    
    static lettersOnly(): ValidatorFn {
        let regExp: RegExp = /^[a-zA-Z\s]*$/;

        return(control: AbstractControl): {[key:string]: any} | null => {
            const lettersOnly = regExp.test(control.value);

            return !lettersOnly ? { 'lettersOnly': {value: control.value}} : null;
        };

    }

    static password1Upper1Lower1NumberMin8()
    {
        let regExp: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

        return(control: AbstractControl): {[key:string]: any} | null => {
            const password1Upper1Lower1NumberMin8 = regExp.test(control.value);
            console.log("Contra "+control.value);
            
            return !password1Upper1Lower1NumberMin8 ? { 'password1Upper1Lower1NumberMin8': {value: control.value}} : null;
        };
    }

    static positiveNumbersOnly(): ValidatorFn {
        let regExp: RegExp = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)*$/;

        return(control: AbstractControl): {[key:string]: any} | null => {
            const positiveNumbersOnly = regExp.test(control.value);
            /* let positiveNumbersOnly = false;
            if(Number.isInteger(control.value)) {
                if(control.value > 0) {
                    positiveNumbersOnly = true;
                }
            } */

            return !positiveNumbersOnly ? { 'positiveNumbersOnly': {value: control.value}} : null;
        };

    }

    static emailExists(userService: UserService): AsyncValidatorFn {       
        return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
          if (control.value == '') {
            return null;
          }
          else {
            return userService.getByEmail(control.value)
                .then(response => {
                    return response ? { 'emailExists': { value: control.value } } : null;
                }).catch(error=> {return null});
          }                  
        };
      }

      static mustMatch(controlName: string, matchingControlName: string):ValidatorFn {
        return (formGroup: AbstractControl):{ [key: string]: any } | null => {
          const control = formGroup.get(controlName);
          const matchingControl = formGroup.get(matchingControlName);
          
          if (!control || !matchingControl) {
            return null;
          }
    
          if (
            matchingControl.errors &&
            !matchingControl.errors.passwordMismatch
          ) {
            return null;
          }
    
          if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
            return { passwordMismatch: true }
          } else {
            matchingControl.setErrors(null);
            return null;
          }
        };


}
      


}


