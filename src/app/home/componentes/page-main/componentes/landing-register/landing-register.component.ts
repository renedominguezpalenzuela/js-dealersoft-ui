import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ApiHelperService,
  NotificationService,
  RequestService,
  ValidationsService,
  AuthService,
} from '@core/services';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-landing-register',
  templateUrl: './landing-register.component.html',
  styleUrls: ['./landing-register.component.scss'],
})
export class LandingRegisterComponent implements OnInit {
  public showPassword = false;
  public agb = false;

  @Output() mensaje = new EventEmitter<string>();
  public naviagateToTab(tab_name: any) {
    let x = document.getElementById('login-register-div');

    if (tab_name === 'register') {
      if (x) {
        x.scrollIntoView({ behavior: 'smooth' });
      }

      const timeoutId = setTimeout(() => {
        this.mensaje.emit('0');
      }, 700);

      //clearTimeout(timeoutId);
    }

    if (tab_name === 'login-reg') {
      if (x) {
        x.scrollIntoView({ behavior: 'smooth' });
      }
      const timeoutId = setTimeout(() => {
        this.mensaje.emit('1');
      }, 700);
    }
  }

  public registerForm = this.formBuilder.group({
    first_name: [null, [Validators.required]],
    last_name: [null, [Validators.required]],
    company_name: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    passwordConfirmation: [
      null,
      [Validators.required, Validators.minLength(8)],
    ],
    username: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
  });

  // public logoImg: File | undefined;
  // public showLogo: boolean = false;
  // public logoImgSrc: string = '';
  public isLoading: boolean = false;

  // public ImageError: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly requestService: RequestService,
    private readonly apiHelperService: ApiHelperService,
    private readonly router: Router,
    private readonly validationsService: ValidationsService,
    private readonly notificationService: NotificationService,
    private httpClient: HttpClient,
    private readonly authService: AuthService,
    private cookies: CookieService
  ) {}

  ngOnInit(): void {}

  public hasError = (input: string): boolean => {
    return this.validationsService.hasError(this.registerForm, input);
  };

  public hasRequiredError = (input: string): boolean => {
    const errror_input = this.validationsService.hasRequiredError(
      this.registerForm,
      input
    );
    return errror_input;
  };

  // public logoImageError() {
  //   if (this.logoImg instanceof File) {
  //     return false;
  //   } else {
  //     return true;
  //   }

  //   if (this.logoImg === undefined) return true;
  //   else return false;
  // }

  public hasMinLengthError = (input: string): boolean => {
    return this.validationsService.hasMinLengthError(this.registerForm, input);
  };

  public hasEmailError = (input: string): boolean => {
    return this.validationsService.hasEmailError(this.registerForm, input);
  };

  togglePwd = () => (this.showPassword = !this.showPassword);
  toggleagb = () => (this.agb = !this.agb);

  // public POSTUpload2 = (url: string, files: FormData): Observable<any> => {
  //   let cabcera = new HttpHeaders({ Accept: 'application/json' });

  //   return this.httpClient.post(url, files, {
  //     headers: cabcera,
  //     reportProgress: true,
  //     observe: 'events',
  //   });
  // };

  public register() {
    // if (this.logoImg instanceof File) {
    //   this.ImageError = false;
    // } else {
    //   this.ImageError = true;
    //   this.notificationService.riseNotification({
    //     color: 'warning',
    //     data: 'Bitte Firmenlogo Hochladen',
    //   });
    //   // return;
    // }

    sessionStorage.clear();
    localStorage.clear();
    this.cookies.deleteAll();

    //   if (localStorage.getItem('rememberMe'))  {localStorage.removeItem('rememberMe')}
    //  if (localStorage.getItem('Auth-User'))  {localStorage.removeItem('Auth-User')}
    //  if (localStorage.getItem('Auth-JWT'))  {localStorage.removeItem('Auth-JWT')}
    //  if (sessionStorage.getItem('Auth-User'))  {sessionStorage.removeItem('Auth-User')}
    //  if (sessionStorage.getItem('Auth-JWT'))  {sessionStorage.removeItem('Auth-JWT')}

    //   console.log("SSSS")
    //   console.log(this.apiHelperService.registerURL)

    if (
      this.registerForm.valid &&
      //this.logoImg instanceof File &&
      !this.isLoading
    ) {
      if (!this.agb) {
        this.isLoading = false;

        this.notificationService.riseNotification({
          color: 'warning',
          data: 'You must accept the AGB',
        });

        return;
      }

      this.isLoading = true;
      const newUser = {
        ...this.registerForm.value,
        active_until: moment().add(30, 'days').format('YYYY-MM-DD'),
      };

      this.requestService
        .Post(this.apiHelperService.registerURL, newUser, false)
        .subscribe(
          (res) => {
            this.isLoading = false;
            this.notificationService.riseNotification({
              color: 'success',
              data: 'Registrierung & Anmeldung erfolgreich',
            });

            sessionStorage.clear();
            localStorage.clear();
            this.cookies.deleteAll();
            this.authService.updateUser = null;
            this.authService.updateJWT = null;

            //this.router.navigate(['']);
            // window.location.reload()
          },
          (error) => {
            console.log('ERROR REGISTERING');
            this.authService.updateUser = null;
            this.authService.updateJWT = null;

            this.isLoading = false;
            sessionStorage.clear();
            localStorage.clear();
            this.cookies.deleteAll();
          }
        );
    } else {
      this.registerForm.updateValueAndValidity();

      this.markAsTouchedAllControls();
      //    let errores = this.findInvalidControls();

      this.notificationService.riseNotification({
        color: 'warning',
        data: 'fehlende Angaben',
      });
    }
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

  public markAsTouchedAllControls() {
    const invalid = [];
    const controls = this.registerForm.controls;
    for (const name in controls) {
      //  controls[name].markAsTouched();
      controls[name].markAsDirty();
    }
  }

  // public previewLogo($event: any) {
  //   const file: File = $event.target.files[0];
  //   this.logoImg = file;
  //   this.logoImgSrc = window.URL.createObjectURL(file);
  //   this.showLogo = true;
  //   this.ImageError = false;

  // }
}
