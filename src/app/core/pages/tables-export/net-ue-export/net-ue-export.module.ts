import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetUeExportRoutingModule } from './net-ue-export-routing.module';
import { NetUeExportComponent } from './net-ue-export.component';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    NetUeExportComponent
  ],
  imports: [
    CommonModule,
    NetUeExportRoutingModule,
    MatIconModule,
    CoreModule
  ]
})
export class NetUeExportModule {
}
