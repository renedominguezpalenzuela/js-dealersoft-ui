import { Component, OnInit } from '@angular/core';
import { ApiHelperService, RequestService, ValidationsService, } from '@core/services';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery-account',
  templateUrl: './recovery-account.component.html',
  styleUrls: ['./recovery-account.component.scss'],
})
export class RecoveryAccountComponent implements OnInit {

  public recoveryAccountForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private apiHelperService: ApiHelperService,
    private validationsService: ValidationsService,
  ) {
  }

  ngOnInit(): void {
  }

  public hasError = (input: string): boolean => {
    return this.validationsService.hasError(this.recoveryAccountForm, input);
  };

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.recoveryAccountForm, input);
  };

  public hasEmailError = (input: string): boolean => {
    return this.validationsService.hasEmailError(this.recoveryAccountForm, input);
  };

  public recoverAccount() {
    if (this.recoveryAccountForm.valid) this.requestRecoveryAccount().subscribe();
  }

  public requestRecoveryAccount = () => {
    return this.requestService.Post(this.apiHelperService.forgotPasswordURL, this.recoveryAccountForm.value, false);
  };
}
