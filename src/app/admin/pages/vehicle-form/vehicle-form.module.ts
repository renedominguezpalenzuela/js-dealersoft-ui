import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleFormRoutingModule } from './vehicle-form-routing.module';
import { VehicleFormComponent } from './vehicle-form.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { NewVehicleModule } from '../new-vehicle/new-vehicle.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    VehicleFormComponent
  ],
  imports: [
    CommonModule,
    VehicleFormRoutingModule,
    MatDividerModule,
    MatTabsModule,
    NewVehicleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    CoreModule
  ]
})
export class VehicleFormModule {
}
