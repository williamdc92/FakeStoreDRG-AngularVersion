import {AbstractControl, ValidationErrors } from "@angular/forms";

export const MustMatch = (controlName: string, matchingControlName: string) => {
    return (controls: AbstractControl | ValidationErrors |null ) =>  {
        const control = controls?.get(controlName);
        const matchingControl = controls?.get(matchingControlName);

        if (matchingControl?.errors && !matchingControl.errors["mustMatch"]) {
            return;
        }

        // set error on matchingControl if validation fails
        if (control?.value !== matchingControl?.value) {
            matchingControl?.setErrors({ mustMatch: true });
        } else {
            matchingControl?.setErrors(null);
        }
    }
}