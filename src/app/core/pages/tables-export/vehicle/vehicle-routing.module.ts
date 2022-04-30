import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleExportComponent } from './vehicle.component';

const routes: Routes = [{ path: '', component: VehicleExportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleRoutingModule {
}
