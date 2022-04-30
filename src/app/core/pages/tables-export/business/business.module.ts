import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { BusinessExportComponent } from './business.component';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    BusinessExportComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    MatIconModule,
    CoreModule
  ]
})
export class BusinessExportModule {
}
