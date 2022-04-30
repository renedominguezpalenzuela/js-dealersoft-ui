import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StripePaymentMobileComponent } from './stripe-payment-mobile.component';

const routes: Routes = [{ path: '', component: StripePaymentMobileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StripePaymentMobileRoutingModule {
}
