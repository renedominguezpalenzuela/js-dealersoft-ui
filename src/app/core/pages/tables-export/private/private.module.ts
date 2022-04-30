import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateExportComponent } from './private.component';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    PrivateExportComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatIconModule,
    CoreModule
  ]
})
export class PrivateExportModule {
}
