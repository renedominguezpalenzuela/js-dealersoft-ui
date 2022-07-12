import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationsService } from '@core/services';
import { Customer } from '@core/interfaces';

import { User } from '@core/interfaces';
import { AuthService } from '@core/services';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import 'moment/locale/de';

@Component({
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    //{provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'L',
        },
        display: {
          dateInput: 'L',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class CustomerFormComponent implements OnInit {
  public authUser: User | null = null;
  public isAuth: boolean = false;
  // public mostrarCompanyName: boolean = true;

  public actualizando_radio_buttons: boolean = false;

  public required_empresa: boolean = true;
  public required_privado: boolean = false;

  public customerForm = this.formBuilder.group({
    title: [null],
    first_name: [null],
    last_name: [null],
    birth_date: [null],
    company_name: [null ],
    phone: [null],
    fax: [null],
    tax_number: [null],
    email: [null, [Validators.email]],
    website: [null],
    street: [null],
    house_number: [null],
    postal_code: [null],
    city: [null],
    country: [null],
    aditional_address: [null],
    user: [null],    
    company: [true ], //Check Box
    private: [false] //Check Box
  });

  constructor(
    private readonly dialogRef: MatDialogRef<CustomerFormComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly validationsService: ValidationsService,
    private readonly authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string
  ) {
    this.authService.currentUser.subscribe((user) => {
      this.isAuth = this.authService.isAuth;
      this.authUser = user;
    });

    if (data) {
      this.customerForm.patchValue(this.data.attributes);
    //  this.customerForm.get('first_name')!.clearValidators();
    //  this.customerForm.get('last_name')!.clearValidators();
    //  this.customerForm.get('phone')!.clearValidators();
    //  this.customerForm.get('tax_number')!.clearValidators();
    }
  }

  mostrarEmpresa() {

     this.required_empresa=true;
    this.required_privado=false;
    // this.mostrarCompanyName=true;

  
    
    this.customerForm.get('company_name')!.markAsUntouched();
    this.customerForm.get('company_name')!.markAsPristine();
    this.customerForm.get('company_name')!.addValidators(Validators.required);
    this.customerForm.get('company_name')!.enable();


    // this.customerForm.get('company_name')!.markAsUntouched();
    // this.customerForm.get('company_name')!.markAsPristine();  


     this.customerForm.get('first_name')!.removeValidators(Validators.required);
    //  this.customerForm.get('first_name')!.markAsUntouched();
    //  this.customerForm.get('first_name')!.markAsPristine();

    
     this.customerForm.get('last_name')!.removeValidators(Validators.required);
    //  this.customerForm.get('last_name')!.markAsUntouched();
    //  this.customerForm.get('last_name')!.markAsPristine();
   


    //  this.carSellForm.get('iva_sell')!.setValue(null);
    //  this.carSellForm.get('iva_sell')!.markAsUntouched();
    //  this.carSellForm.get('iva_sell')!.markAsPristine();
    //  this.carSellForm.get('iva_sell')!.removeValidators(Validators.required);
    //  this.carSellForm.get('iva_sell')!.disable();
    //  this.carSellForm.patchValue({ net_sell: null, iva_sell: null });
    //  this.carSellForm.updateValueAndValidity()

    // this.mostrarCompanyName = true;
  }


  
 mostrarPrivado() {



    this.required_empresa=false;
    this.required_privado=true;
    // this.mostrarCompanyName=false;
    

    this.customerForm.get('company_name')!.setValue(null);
    this.customerForm.get('company_name')!.markAsUntouched();
    this.customerForm.get('company_name')!.markAsPristine();
    this.customerForm.get('company_name')!.removeValidators(Validators.required);
    this.customerForm.get('company_name')!.disable();
    


     
     this.customerForm.get('first_name')!.addValidators(Validators.required);
    //  this.customerForm.get('first_name')!.markAsUntouched();
    //  this.customerForm.get('first_name')!.markAsPristine();

     
     this.customerForm.get('last_name')!.addValidators(Validators.required);
    //  this.customerForm.get('last_name')!.markAsUntouched();
    //  this.customerForm.get('last_name')!.markAsPristine();

     //this.mostrarCompanyName = false;
  }

  ngOnInit(): void {
    this._locale = 'de';
    this._adapter.setLocale(this._locale);

    //  this.customerForm.patchValue({ user: this.authUser?.id });
    this.customerForm.patchValue({ user: this.authUser?.id });

    this.customerForm
      .get('company')!
      .valueChanges.subscribe((change: boolean) => {
        if (this.actualizando_radio_buttons) return;

        this.actualizando_radio_buttons = true;
        if (change) {
          this.customerForm.patchValue({ private: false });

          this.mostrarEmpresa();
        } else {
          this.customerForm.patchValue({ private: true });
          this.mostrarPrivado();
        }

      

        this.actualizando_radio_buttons = false;
      });

    this.customerForm
      .get('private')!
      .valueChanges.subscribe((change: boolean) => {
        if (this.actualizando_radio_buttons) return;

        this.actualizando_radio_buttons = true;

        if (change) {
          this.customerForm.patchValue({ company: false });
          
          this.mostrarPrivado();
        } else {
          this.customerForm.patchValue({ company: true });
          this.mostrarEmpresa();
          
        }

     
        this.actualizando_radio_buttons = false;
      });
  }

  public close = () => this.dialogRef.close(false);

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.customerForm, input);
  };

  public hasEmailError = (input: string): boolean => {
    return this.validationsService.hasEmailError(this.customerForm, input);
  };


  public markAsTouchedAllControls() {
    const invalid = [];
    const controls = this.customerForm.controls;
    for (const name in controls) {
      controls[name].markAsTouched();
      controls[name].markAsDirty();
    }
  }


  

  public submit() {
    // this.customerForm.updateValueAndValidity()
    if (this.customerForm.valid) { 
      console.log( this.customerForm.value)     
      this.dialogRef.close({ body: this.customerForm.value });
    } else {    
      this.markAsTouchedAllControls();   
      console.log(this.findInvalidControls())   
    
    }
  }

  // validateAllFormControl(formGroup: FormGroup) {         
  //   Object.keys(formGroup.controls).forEach(field => {  
  //     const control = formGroup.get(field);             
  //     if (control instanceof FormControl) {             
  //       control.markAsTouched({ onlySelf: true });
  //     } else if (control instanceof FormGroup) {        
  //       this.validateAllFormControl(control);            
  //     }
  //   });
  // }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.customerForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name + ', ' + controls[name].value);
      }
    }
    return invalid;
  }


  public isRequired = (): boolean => !this.data;
}
