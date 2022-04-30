import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationsService } from '@core/services';
import { Customer } from '@core/interfaces';

@Component({
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  public customerForm = this.formBuilder.group({
    title: [null, [Validators.required]],
    first_name: [null, [Validators.required]],
    last_name: [null, [Validators.required]],
    birth_date: [null, []],
    phone: [null, [Validators.required]],
    fax: [null, []],
    tax_number: [null, [Validators.nullValidator]],
    email: [null, [Validators.email]],
    website: [null, []],
    street: [null, []],
    house_number: [null, []],
    postal_code: [null, []],
    city: [null, []],
    country: [null, []],
    aditional_address: [null, []],
  });

  constructor(
    private readonly dialogRef: MatDialogRef<CustomerFormComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly validationsService: ValidationsService,
    @Inject(MAT_DIALOG_DATA) public data: Customer
  ) {
    if (data) {
      this.customerForm.patchValue(this.data.attributes);
      this.customerForm.get('first_name')!.clearValidators();
      this.customerForm.get('last_name')!.clearValidators();
      this.customerForm.get('phone')!.clearValidators();
      this.customerForm.get('tax_number')!.clearValidators();
    }
  }

  ngOnInit(): void {
  }

  public close = () => this.dialogRef.close(false);

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.customerForm, input);
  };

  public hasEmailError = (input: string): boolean => {
    return this.validationsService.hasEmailError(this.customerForm, input);
  };

  public submit() {
    if (this.customerForm.valid) this.dialogRef.close({ body: this.customerForm.value });
  }

  public isRequired = (): boolean => !this.data;
}
