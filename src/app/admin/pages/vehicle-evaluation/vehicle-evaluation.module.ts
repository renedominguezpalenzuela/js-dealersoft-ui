import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleEvaluationRoutingModule } from './vehicle-evaluation-routing.module';
import { VehicleEvaluationComponent } from './vehicle-evaluation.component';
import { BarChartModule } from '@swimlane/ngx-charts';
import { CoreModule } from '@core/core.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    VehicleEvaluationComponent
  ],
  imports: [
    CommonModule,
    VehicleEvaluationRoutingModule,
    BarChartModule,
    CoreModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class VehicleEvaluationModule {
}
