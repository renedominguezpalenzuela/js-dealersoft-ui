import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllVehiclesRoutingModule } from './all-vehicles-routing.module';
import { AllVehiclesComponent } from './all-vehicles.component';
import { CoreModule } from '@core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AllVehiclesComponent
  ],
  imports: [
    CommonModule,
    AllVehiclesRoutingModule,
    CoreModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatDialogModule
  ]
})
export class AllVehiclesModule {
}
