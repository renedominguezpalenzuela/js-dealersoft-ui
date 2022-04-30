import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleRoutingModule } from './vehicle-routing.module';
import { VehicleExportComponent } from './vehicle.component';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    VehicleExportComponent
  ],
  imports: [
    CommonModule,
    VehicleRoutingModule,
    MatIconModule,
    CoreModule
  ]
})
export class VehicleExportModule {
}
