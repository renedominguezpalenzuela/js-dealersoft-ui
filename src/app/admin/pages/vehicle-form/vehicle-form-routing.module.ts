import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleFormComponent } from './vehicle-form.component';

const routes: Routes = [{ path: '', component: VehicleFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleFormRoutingModule {
}
