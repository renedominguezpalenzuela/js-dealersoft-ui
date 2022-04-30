import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewVehicleComponent } from './new-vehicle.component';

const routes: Routes = [{ path: '', component: NewVehicleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewVehicleRoutingModule {
}
