import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StripePaymentMobileRoutingModule } from './stripe-payment-mobile-routing.module';
import { StripePaymentMobileComponent } from './stripe-payment-mobile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    StripePaymentMobileComponent
  ],
  imports: [
    CommonModule,
    StripePaymentMobileRoutingModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('***your-stripe-publishable-key***'),
    MatIconModule,
  ]
})
export class StripePaymentMobileModule {
}
