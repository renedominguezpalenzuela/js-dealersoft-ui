import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StripePaymentComponent } from './stripe-payment.component';

const routes: Routes = [{ path: '', component: StripePaymentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StripePaymentRoutingModule {
}
