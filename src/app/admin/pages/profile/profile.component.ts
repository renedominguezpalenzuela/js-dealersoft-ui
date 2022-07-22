import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  public userID: any;

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
    first_name: [null, [Validators.required]],
    last_name: [null, [Validators.required]],
    company_name: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    email: [null, [Validators.required, Validators.email]],
    employees_number: [null, Validators.required],
    street: [null, [Validators.required]],
    house_number: [null, [Validators.required]],
    city: [null, [Validators.required]],
    postal_code: [null, [Validators.required]],

    phone: [null, [Validators.required]],
    website: [null],
    steuer_nr: [null, [Validators.required]],
    ust_Idnr: [null, [Validators.required]],
    geschaftsfuhrer: [null, [Validators.required]],
    iban: [null, [Validators.required]],
    bic_swift_code: [null, [Validators.required]],
    hrb_walsrode: [null, [Validators.required]],
    bank_name: [null, [Validators.required]],
    username: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.registerForm.patchValue({
      ...this.authUser,
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

  public register() {
    console.log(this.userID);

    if (this.isAuth) {
      console.log('User not authorized');
      return;
    }

    if (
      this.registerForm.valid &&
      this.logoImg instanceof File &&
      !this.isLoading
    ) {
      this.isLoading = true;
      const newUser = { ...this.registerForm.value };

      this.requestService
        .Put(`${this.apiHelperService.registerURL}/${this.userID}`, newUser)
        .subscribe((respuesta) => {
          const form = new FormData();
          form.append('files', <File>this.logoImg);
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
        });
    }
  }

  // ngOnChanges(changes: SimpleChanges): void {

  // }
}
