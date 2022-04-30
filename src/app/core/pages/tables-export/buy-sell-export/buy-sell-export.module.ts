import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuySellExportRoutingModule } from './buy-sell-export-routing.module';
import { BuySellExportComponent } from './buy-sell-export.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    BuySellExportComponent
  ],
  imports: [
    CommonModule,
    BuySellExportRoutingModule,
    MatIconModule
  ]
})
export class BuySellExportModule {
}
