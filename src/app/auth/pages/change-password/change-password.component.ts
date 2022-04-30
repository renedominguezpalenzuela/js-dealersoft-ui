import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ApiHelperService, RequestService, ValidationsService } from '@core/services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public showPassword = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private apiHelperService: ApiHelperService,
    private router: Router,
    private validationsService: ValidationsService
  ) {
    if (this.activatedRoute.snapshot.paramMap.has('token'))
      this.changePasswordForm.patchValue({ code: <string>this.activatedRoute.snapshot.paramMap.get('token') });
    else this.router.navigate(['/auth/recovery-account']);
  }

  public checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirm')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  public changePasswordForm = this.formBuilder.group(
    {
      code: ['', [Validators.nullValidator]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]]
    },
    { validators: this.checkPasswords }
  );

  ngOnInit(): void {
  }

  public hasError = (input: string): boolean => {
    return this.validationsService.hasError(this.changePasswordForm, input);
  };

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.changePasswordForm, input);
  };

  public hasMinLengthError = (input: string): boolean => {
    return this.validationsService.hasMinLengthError(this.changePasswordForm, input);
  };

  public notSamePwd = () => this.changePasswordForm.hasError('notSame');

  public togglePwd = () => (this.showPassword = !this.showPassword);

  public changePassword() {
    if (this.changePasswordForm.valid)
      this.requestService.Post(this.apiHelperService.resetPasswordURL, this.changePasswordForm.value, false)
        .subscribe(() => this.router.navigate(['/auth/login']));
  }
}
