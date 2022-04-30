import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBillComponent } from './new-bill.component';

const routes: Routes = [{ path: '', component: NewBillComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewBillRoutingModule {
}
