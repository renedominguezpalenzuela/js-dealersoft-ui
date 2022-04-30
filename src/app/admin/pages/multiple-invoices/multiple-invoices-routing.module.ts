import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipleInvoicesComponent } from './multiple-invoices.component';

const routes: Routes = [{ path: '', component: MultipleInvoicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultipleInvoicesRoutingModule {
}
