import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyingSellingComponent } from './buying-selling.component';

const routes: Routes = [{ path: '', component: BuyingSellingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyingSellingRoutingModule {
}
