import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationsService } from '@core/services';
import { Customer } from '@core/interfaces';

import { User } from '@core/interfaces';
import { AuthService } from '@core/services';


import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/de';


@Component({
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    { provide: DateAdapter,  useClass: MomentDateAdapter,   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS], },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],

})
export class CustomerFormComponent implements OnInit {
  public authUser: User | null = null;
  public isAuth: boolean = false;

  public customerForm = this.formBuilder.group({
    title: [null, [Validators.required]],
    first_name: [null, [Validators.required]],
    last_name: [null, [Validators.required]],
    birth_date: [null, []],
    phone: [null, ],
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
    company_name: ['', []]
  });

  constructor(
    private readonly dialogRef: MatDialogRef<CustomerFormComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly validationsService: ValidationsService,
    private readonly authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
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

    this._locale = 'de';
    this._adapter.setLocale(this._locale);
  
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
 
      this.dialogRef.close({ body: this.customerForm.value });
  }

  public isRequired = (): boolean => !this.data;
}
