import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllVehiclesComponent } from './all-vehicles.component';

const routes: Routes = [{ path: '', component: AllVehiclesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllVehiclesRoutingModule {
}
