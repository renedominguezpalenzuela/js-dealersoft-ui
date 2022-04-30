import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyingSellingRoutingModule } from './buying-selling-routing.module';
import { BuyingSellingComponent } from './buying-selling.component';
import { CoreModule } from '@core/core.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    BuyingSellingComponent
  ],
  imports: [
    CommonModule,
    BuyingSellingRoutingModule,
    CoreModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class BuyingSellingModule {
}
