import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleEvaluationComponent } from './vehicle-evaluation.component';

const routes: Routes = [{ path: '', component: VehicleEvaluationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleEvaluationRoutingModule {
}
