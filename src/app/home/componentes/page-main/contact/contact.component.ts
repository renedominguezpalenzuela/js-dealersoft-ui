import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  ApiHelperService,
  NotificationService,
  RequestService,
  ValidationsService,
} from '@core/services';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public contactForm = this.formBuilder.group({
    first_name: [null, [Validators.required]],
    last_name: [null, [Validators.required]],
    email_address: [null, [Validators.required]],
    telephone: [null, [Validators.required]],
    message: [null],
  });

  public selectedTab: any = 1;

  ABG: boolean = false;

  toggleABG() {
    this.ABG = !this.ABG;
  }

  constructor(
    private readonly validationsService: ValidationsService,
    private readonly requestService: RequestService,
    private readonly notificationService: NotificationService,
    private readonly apiHelperService: ApiHelperService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  public navigationTop() {
    window.scrollTo(0, 0);
  }

  receiveMessage(msg: any) {
    this.selectedTab = msg;
    console.log(this.selectedTab);
  }
  //--------------------------  Formulario ------------------------------------------
  public submit() {
    console.log('submit');
    if (!this.contactForm.valid) {
      this.markAsTouchedAllControls();
      this.notificationService.riseNotification({
        color: 'warning',
        data: 'Bitte überprüfen Sie ihre Eingabe',
      });

      return;
    }


  
    //sendMailURL

    this.requestService
      .Post(this.apiHelperService.sendMailURL, this.contactForm.value)
      .subscribe(() => {
        this.notificationService.riseNotification({
          color: 'success',
          data: 'Vielen Dank für Ihre Anfrage. Wir melden uns in Kürze bei Ihnen. ',
        });
      });
  }

  public hasRequiredError = (input: string): boolean => {
    return this.validationsService.hasRequiredError(this.contactForm, input);
  };

  public hasEmailError = (input: string): boolean => {
    return this.validationsService.hasEmailError(this.contactForm, input);
  };

  public markAsTouchedAllControls() {
    const invalid = [];
    const controls = this.contactForm.controls;
    for (const name in controls) {
      controls[name].markAsTouched();
      controls[name].markAsDirty();
      //  if (controls[name].invalid) {
      //   console.log(name)
      // //   invalid.push(name + ', ' + controls[name].value);
      //  }
    }
    // return invalid;
  }
}
