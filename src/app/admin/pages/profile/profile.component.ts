import { Component, OnInit, OnChanges, SimpleChanges, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ApiHelperService,
  RequestService,
  ValidationsService,
  AuthService,
  NotificationService,
} from '@core/services';

import { Logo } from '@core/interfaces/logo';

import { User } from '@core/interfaces';
import { HttpEventType } from '@angular/common/http';
import { FilterDeepOption } from '@core/interfaces';
import { FilterOperator } from '@core/interfaces/query-params';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public showPassword = false;
  public logoImg: File | undefined;
  public showLogo: boolean = false;
  public logoImgSrc: string = '';
  public isLoading: boolean = false;

  public ImageError: boolean = false;

  public authUser: User | null = null;
  public isAuth: boolean = false;
  public userID!: number | undefined;

  public logo: Logo | undefined;


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private apiHelperService: ApiHelperService,
    private router: Router,
    private validationsService: ValidationsService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService
  ) {
    this.authService.currentUser.subscribe((user) => {
      this.isAuth = this.authService.isAuth;
      this.authUser = user;
      this.userID = this.authUser?.id;
    });

    //hace que se muestre la ventana de recuperar accunt mediante email
    //mucho mas segura, tiene que funcionar el correo correctamente
    // if (this.activatedRoute.snapshot.paramMap.has('code'))
    //   this.changePasswordForm.patchValue({ code: <string>this.activatedRoute.snapshot.paramMap.get('code') });
    // else this.router.navigate(['/auth/recovery-account']);
  }

  public changePasswordScreen() {
    console.log('llamando a recovery-accoun');
    this.router.navigate(['auth/recovery-account']);
  }

  public checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirm')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  public changePasswordForm = this.formBuilder.group(
    {
      code: ['', [Validators.nullValidator]], ///Token JWT
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]],
    },
    { validators: this.checkPasswords }
  );

  public registerForm = this.formBuilder.group({
    first_name: [null],
    last_name: [null],
    company_name: [null],
    // password: [null, [Validators.minLength(8)]],
    email: [null, [ Validators.email]],
    employees_number: [null],
    street: [null],
    house_number: [null],
    city: [null],
    postal_code: [null],

    phone: [null],
    website: [null],
    steuer_nr: [null],
    ust_Idnr: [null],
    geschaftsfuhrer: [null],
    iban: [null],
    bic_swift_code: [null],
    hrb_walsrode: [null],
    bank_name: [null],
    username: [null],
  });

  
  private queryLogo = (id: any) =>
    this.requestService.generateQuery({
      populate: ['logo'],
      filters: [
        {
          field: '[user][id]',
          value: id,
          operator: FilterOperator.$eq,
          option: FilterDeepOption.$and,
        },
      ],
    });

  get imgPath(): string {


    if (isDevMode()) {

      let inicio_url = this.logo?.attributes.logo.data.attributes.url?.substring(0, 4);     
      if (inicio_url==="http") {
        return `${this.logo?.attributes.logo.data.attributes.url}`;
      } else {
        return `${this.apiHelperService.hostUrl}${this.logo?.attributes.logo.data.attributes.url}`;
      }       
    } else {      

     return `${this.logo?.attributes.logo.data.attributes.url}`;
    }
  }


  ngOnInit(): void {


    this.registerForm.patchValue({
      ...this.authUser,
    });

    
    let aquery = this.queryLogo(this.authUser?.id);
     
    this.requestService
      .Get(this.apiHelperService.logosURL, aquery)
      .subscribe((logos) => {
        
        this.logo = logos.data[0];
       
      
       
        if (this.logo?.attributes.logo.data.attributes.url) {
          this.logoImgSrc = this.imgPath;
          this.showLogo = true;
        }
          
      });



    this.registerForm.updateValueAndValidity();
  }

  public hasError = (input: string): boolean => {
    return this.validationsService.hasError(this.changePasswordForm, input);
  };

  public hasError2 = (input: string): boolean => {
    return this.validationsService.hasError(this.registerForm, input);
  };

  public hasRequiredError2 = (input: string): boolean => {
    const errror_input = this.validationsService.hasRequiredError(
      this.registerForm,
      input
    );

    return errror_input;
  };


  
  public previewLogo($event: any) {
    const file: File = $event.target.files[0];
    this.logoImg = file;
    this.logoImgSrc = window.URL.createObjectURL(file);
    this.showLogo = true;
    this.ImageError = false;
    // if (this.logoImg instanceof File) {
    //   this.ImageError = false;
    // } else {
    //   this.ImageError = true;
    // }
  }

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(
      this.changePasswordForm,
      input
    );
  };

  public hasMinLengthError = (input: string): boolean => {
    return this.validationsService.hasMinLengthError(
      this.changePasswordForm,
      input
    );
  };

  public notSamePwd = () => this.changePasswordForm.hasError('notSame');

  public togglePwd = () => (this.showPassword = !this.showPassword);

  public changePassword() {
    console.log('Change password');
    console.log(this.changePasswordForm.value);

    if (this.changePasswordForm.valid)
      this.requestService
        .Post(
          this.apiHelperService.resetPasswordURL,
          this.changePasswordForm.value,
          false
        )
        .subscribe(() => this.router.navigate(['/auth/login']));
  }


  
  public findInvalidControls() {
    const invalid = [];
    const controls = this.registerForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name + ', ' + controls[name].value);
      }
    }
    return invalid;
  }


  public register() {
    console.log(this.userID);

    if (!this.isAuth) {
      console.log('User not authorized');
      return;
    }

    const newUser = { ...this.registerForm.value };

      console.log(newUser)

    if (
      this.registerForm.valid &&
      
      !this.isLoading
    ) {
      this.isLoading = true;
      
      this.requestService
        .Put(`${this.apiHelperService.usersURL}/${this.userID}`, newUser)
        .subscribe((respuesta) => {
          const form = new FormData();
          form.append('files', <File>this.logoImg);

          if (this.logoImg instanceof File) {
          this.requestService
            .POSTUpload(this.apiHelperService.uploadFilesURL, form)
            .subscribe((events) => {
              if (events.type === HttpEventType.Response) {
                const data = { logo: events.body[0].id, user: this.userID };
                this.requestService
                  .Post(this.apiHelperService.logosURL, data)
                  .subscribe(() => {
                    this.isLoading = false;
                    this.notificationService.riseNotification({
                      color: 'success',
                      data: 'gespeichert',
                    });
                  });
              }
            });
          } else {
            this.isLoading = false;
            this.notificationService.riseNotification({
              color: 'success',
              data: 'gespeichert',
            });
          }
        });
    } else {
      const errores = this.findInvalidControls();
      console.log(errores)

      this.notificationService.riseNotification({
        color: 'warning',
        data: 'fehlende Angaben',
      });

    }
  }

  // ngOnChanges(changes: SimpleChanges): void {

  // }
}
