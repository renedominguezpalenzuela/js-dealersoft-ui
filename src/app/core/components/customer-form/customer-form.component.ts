import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationsService } from '@core/services';
import { Customer } from '@core/interfaces';

import { User } from '@core/interfaces';
import { AuthService } from '@core/services';

@Component({
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {
  public authUser: User | null = null;
  public isAuth: boolean = false;

  public customerForm = this.formBuilder.group({
    title: [null, [Validators.required]],
    first_name: [null, [Validators.required]],
    last_name: [null, [Validators.required]],
    birth_date: [null, []],
    phone: [null, [Validators.required]],
    fax: ['', []],
    tax_number: ['', []],
    email: [null, [Validators.email]],
    website: ['', []],
    street: ['', []],
    house_number: ['', []],
    postal_code: ['', []],
    city: ['', []],
    country: ['', []],
    aditional_address: ['', []],
    user: [null, [Validators.required]],
  });

  constructor(
    private readonly dialogRef: MatDialogRef<CustomerFormComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly validationsService: ValidationsService,
    private readonly authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {
    this.authService.currentUser.subscribe((user) => {
      this.isAuth = this.authService.isAuth;
      this.authUser = user;
    });

    if (data) {
      this.customerForm.patchValue(this.data.attributes);
      this.customerForm.get('first_name')!.clearValidators();
      this.customerForm.get('last_name')!.clearValidators();
      this.customerForm.get('phone')!.clearValidators();
      this.customerForm.get('tax_number')!.clearValidators();
    }
  }

  ngOnInit(): void {
    console.log("Numero de usuario "+ this.authUser?.id);
    //  this.customerForm.patchValue({ user: this.authUser?.id });
    this.customerForm.patchValue({ user: this.authUser });
  }

  public close = () => this.dialogRef.close(false);

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.customerForm, input);
  };

  public hasEmailError = (input: string): boolean => {
    return this.validationsService.hasEmailError(this.customerForm, input);
  };

  public submit() {
    if (this.customerForm.valid)
    console.log("Datos Formulario")
    console.log(this.customerForm.value )
      this.dialogRef.close({ body: this.customerForm.value });
  }

  public isRequired = (): boolean => !this.data;
}
