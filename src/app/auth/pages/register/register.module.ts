import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    MatProgressSpinnerModule
  ]
})
export class RegisterModule {
}
