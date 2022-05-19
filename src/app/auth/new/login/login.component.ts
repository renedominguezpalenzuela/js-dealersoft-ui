import { Component, OnInit/**ViewEncapsulation */ } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ApiHelperService,
  AuthService,
  NotificationService,
  RequestService,
  ValidationsService,
} from '@core/services';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public showPassword = false;

  public loginForm = this.formBuilder.group({
    identifier: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  public rememberMe = false;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly validationsService: ValidationsService,
    private readonly requestService: RequestService,
    private readonly apiHelperService: ApiHelperService,
    private readonly authService: AuthService,
    private readonly notificationService: NotificationService
  ) {
    this.returnURL =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/admin';
  }

  private _returnURL: string | undefined;

  get returnURL(): string {
    return <string>this._returnURL;
  }

  set returnURL(value: string) {
    this._returnURL = value;
  }

  ngOnInit(): void {}

  togglePwd = () => (this.showPassword = !this.showPassword);

  public hasError = (input: string): boolean => {
    return this.validationsService.hasError(this.loginForm, input);
  };

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.loginForm, input);
  };

  public hasMinLengthError = (input: string): boolean => {
    return this.validationsService.hasMinLengthError(this.loginForm, input);
  };

  onSubmit() {
    if (this.loginForm.valid) {
      this.requestService
        .Post(this.apiHelperService.loginURL, this.loginForm.value, false)
        .subscribe(() => {
          this.notificationService.riseNotification({
            color: 'success',
            data: 'Protokollierung erfolgreich',
          });
          this.router.navigate([this.returnURL]);
        });
    }
  }

  public checkRememberMe = () => {
    this.rememberMe = !this.rememberMe;
    this.authService.updateRememberMe = true;
    localStorage.setItem('rememberMe', this.rememberMe ? 'TRUE' : 'FALSE');
  };
}
