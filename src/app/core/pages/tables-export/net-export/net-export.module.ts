import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetExportRoutingModule } from './net-export-routing.module';
import { NetExportComponent } from './net-export.component';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    NetExportComponent
  ],
  imports: [
    CommonModule,
    NetExportRoutingModule,
    MatIconModule,
    CoreModule
  ]
})
export class NetExportModule {
}
