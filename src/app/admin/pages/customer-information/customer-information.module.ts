import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerInformationRoutingModule } from './customer-information-routing.module';
import { CustomerInformationComponent } from './customer-information.component';
import { CoreModule } from '@core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    CustomerInformationComponent
  ],
  imports: [
    CommonModule,
    CustomerInformationRoutingModule,
    CoreModule,
    MatIconModule,
    FormsModule,
    MatDialogModule
  ]
})
export class CustomerInformationModule {
}
