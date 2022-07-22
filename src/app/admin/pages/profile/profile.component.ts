import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiHelperService, RequestService, ValidationsService } from '@core/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {



  public showPassword = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private requestService: RequestService,
    private apiHelperService: ApiHelperService,
    private router: Router,
    private validationsService: ValidationsService
  ) {

    //hace que se muestre la ventana de recuperar accunt mediante email
    //mucho mas segura, tiene que funcionar el correo correctamente
    // if (this.activatedRoute.snapshot.paramMap.has('code'))
    //   this.changePasswordForm.patchValue({ code: <string>this.activatedRoute.snapshot.paramMap.get('code') });
    // else this.router.navigate(['/auth/recovery-account']);
  }


  public changePasswordScreen(){
    console.log("llamando a recovery-accoun")
    this.router.navigate(['auth/recovery-account'])
  }
  
  public checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirm')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };


  public changePasswordForm = this.formBuilder.group(
    {
      code: ['', [Validators.nullValidator]],   ///Token JWT
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

    console.log("Change password")
    console.log(this.changePasswordForm.value)

    if (this.changePasswordForm.valid)
      this.requestService.Post(this.apiHelperService.resetPasswordURL, this.changePasswordForm.value, false)
        .subscribe(() => this.router.navigate(['/auth/login']));
  }
}
