import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { allUpperValidator, startsByA } from '../../validators/alluppervalidators';

@Component({
  selector: 'app-form',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  //myForm è un formGroup, corrisponde al form
  myForm = new FormGroup({
    //ognuno è un formNameControl, corrisponde all'input
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthdate: new FormControl(''),
    birthplace: new FormControl(''),
    taxCode: new FormControl('', [Validators.required, allUpperValidator(), startsByA]),
    addresses: new FormArray([]),
  });

  submitForm() {
    if (this.myForm.valid) {
      console.log(this.myForm);
    } else {
      for (const key in this.myForm.controls) {
        if (Object.prototype.hasOwnProperty.call(this.myForm.controls, key)) {
          const element = this.myForm.get(key);
          console.log(key, element?.errors)
        }
      }
    }
  }

  get addresses() {
    return this.myForm.get('addresses') as FormArray; // sempre fare cast
  }

  addAddress() {
    // const addressesArray = this.myForm.get('addresses') as FormArray;

    const addressGroup = new FormGroup({
      street: new FormControl(''),//[Validators.pattern()]
      city: new FormControl(''),
      code: new FormControl(''),
    });

    // addressesArray.controls.push(addressGroup);
    this.addresses.controls.push(addressGroup);
  }

  removeAddress(index: number) {
    // const addressesArray = this.myForm.get('addresses') as FormArray;
    this.addresses.removeAt(index);
  }
}
