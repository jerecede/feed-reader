import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//una funzione dentro una funzione per poter mttere parametri aggiuntivi
export function allUpperValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        console.log('sto validando baby', control.value);
        if(control.value === control.value.toUpperCase()){
            return null;
        }
        return {'orrore': true, 'correctValue': control.value.toUpperCase()};
    };
}

export function startsByA (control: AbstractControl): ValidationErrors | null {
    console.log('sto validando baby', control.value);
    if(control.value[0] === 'A'){
        return null;
    }
    return {'orrore': true};
};