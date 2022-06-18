import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ApiHelperService,
  NotificationService,
  RequestService,
  ValidationsService,
} from '@core/services';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import * as moment from 'moment';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public showPassword = false;
  public registerForm = this.formBuilder.group({
    first_name: [null, [Validators.required]],
    last_name: [null, [Validators.required]],
    company_name: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    email: [null, [Validators.required, Validators.email]],
    employees_number: [null, [Validators.required]],
    street: [null, [Validators.required]],
    house_number: [null, [Validators.required]],
    city: [null, [Validators.required]],
    postal_code: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    website: [null, [Validators.required]],
    steuer_nr: [null, [Validators.required]],
    ust_Idnr: [null, [Validators.required]],
    geschaftsfuhrer: [null, [Validators.required]],
    iban: [null, [Validators.required]],
    bic_swift_code: [null, [Validators.required]],
    hrb_walsrode: [null, [Validators.required]],
    bank_name:[null, [Validators.required]],
    username:[null, [Validators.required]]
  });
  public logoImg: File | undefined;
  public showLogo: boolean = false;
  public logoImgSrc: string = '';
  public isLoading: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly requestService: RequestService,
    private readonly apiHelperService: ApiHelperService,
    private readonly router: Router,
    private readonly validationsService: ValidationsService,
    private readonly notificationService: NotificationService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {}

  public hasError = (input: string): boolean => {
    return this.validationsService.hasError(this.registerForm, input);
  };

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.registerForm, input);
  };

  public hasMinLengthError = (input: string): boolean => {
    return this.validationsService.hasMinLengthError(this.registerForm, input);
  };

  public hasEmailError = (input: string): boolean => {
    return this.validationsService.hasEmailError(this.registerForm, input);
  };

  togglePwd = () => (this.showPassword = !this.showPassword);

  public POSTUpload2 = (url: string, files: FormData): Observable<any> => {
    let cabcera = new HttpHeaders({ Accept: 'application/json' });
    return this.httpClient.post(url, files, {
      headers: cabcera,
      reportProgress: true,
      observe: 'events',
    });
  };

  public register() {
    if (
      this.registerForm.valid &&
      this.logoImg instanceof File &&
      !this.isLoading
    ) {
      this.isLoading = true;
      const newUser = {
        ...this.registerForm.value,
        active_until: moment().add(30, 'days').format('YYYY-MM-DD'),
      };

      const form = new FormData();
      form.append('files', <File>this.logoImg);

      this.POSTUpload2(this.apiHelperService.uploadFilesURL, form).subscribe(
        (events) => {
          if (events.type === HttpEventType.Response) {
            // const data = { logo: events.body[0].id, user: res.user.id };
            const data = { logo: events.body[0].id };

            this.requestService
              .Post(this.apiHelperService.logosURL, data)
              .subscribe((respuesta) => {
                newUser.logo = respuesta.data.id;
                this.requestService
                  .Post(this.apiHelperService.registerURL, newUser, false)
                  .subscribe((res) => {
                    this.isLoading = false;
                    this.notificationService.riseNotification({
                      color: 'success',
                      data: 'Registrierung & Anmeldung erfolgreich',
                    });
                  });

                // this.router.navigate(['/admin']);
              });
          }
        }
      );
    }
  }

  public register2() {
    if (
      this.registerForm.valid &&
      this.logoImg instanceof File &&
      !this.isLoading &&
      this.registerForm.valid && this.logoImg instanceof File && !this.isLoading
    ) {
      this.isLoading = true;
      const newUser = {
        ...this.registerForm.value,
        active_until: moment().add(30, 'days').format('YYYY-MM-DD'),
      };
      this.requestService
        .Post(this.apiHelperService.registerURL, newUser, false)
        .subscribe((res) => {
          const form = new FormData();
          form.append('files', <File>this.logoImg);

          this.POSTUpload2(
            this.apiHelperService.uploadFilesURL,
            form
          ).subscribe((events) => {
            if (events.type === HttpEventType.Response) {
              const data = { logo: events.body[0].id, user: res.user.id };
              this.requestService
                .Post(this.apiHelperService.logosURL, data)
                .subscribe(() => {
                  this.isLoading = false;
                  this.notificationService.riseNotification({
                    color: 'success',
                    data: 'Registrierung & Anmeldung erfolgreich',
                  });
                  // this.router.navigate(['/admin']);
                });
            }
          });
        });
    }
  }

  public registerOLD() {
    if (this.registerForm.valid && !this.isLoading) {
      // if (this.registerForm.valid && this.logoImg instanceof File && !this.isLoading) {
      this.isLoading = true;
      const newUser = {
        ...this.registerForm.value,
        active_until: moment().add(30, 'days').format('YYYY-MM-DD'),
      };

      this.requestService
        .Post(this.apiHelperService.registerURL, newUser, false)
        .subscribe((res) => {
          const form = new FormData();

          form.append('files', <File>this.logoImg);

          

          this.requestService
            .POSTUpload(this.apiHelperService.uploadFilesURL, form)
            .subscribe((events) => {
              if (events.type === HttpEventType.Response) {
                const data = { logo: events.body[0].id, user: res.user.id };

                this.requestService
                  .Post(this.apiHelperService.logosURL, data)
                  .subscribe(() => {
                    this.isLoading = false;
                    this.notificationService.riseNotification({
                      color: 'success',
                      data: 'Registrierung & Anmeldung erfolgreich',
                    });
                  });
              }
            });
        });
    } else {
      this.isLoading = false;
      this.notificationService.riseNotification({
        color: 'error',
        data: 'Data Errors!!!',
      });
    }
  }

  public previewLogo($event: any) {
    const file: File = $event.target.files[0];
    this.logoImg = file;
    this.logoImgSrc = window.URL.createObjectURL(file);
    this.showLogo = true;
  }
}
