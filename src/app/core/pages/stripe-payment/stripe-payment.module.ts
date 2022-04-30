import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StripePaymentRoutingModule } from './stripe-payment-routing.module';
import { StripePaymentComponent } from './stripe-payment.component';
import { NgxStripeModule } from 'ngx-stripe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    StripePaymentComponent
  ],
  imports: [
    CommonModule,
    StripePaymentRoutingModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('***your-stripe-publishable-key***'),
    MatIconModule,
  ]
})
export class StripePaymentModule {
}
