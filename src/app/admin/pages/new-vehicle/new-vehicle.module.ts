import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewVehicleRoutingModule } from './new-vehicle-routing.module';
import { NewVehicleComponent } from './new-vehicle.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    NewVehicleComponent
  ],
  exports: [
    NewVehicleComponent
  ],
  imports: [
    CommonModule,
    NewVehicleRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDividerModule,
    MatSelectModule,
    CoreModule
  ]
})
export class NewVehicleModule {
}
