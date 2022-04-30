import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceExportRoutingModule } from './invoice-export-routing.module';
import { InvoiceExportComponent } from './invoice-export.component';
import { CoreModule } from '@core/core.module';


@NgModule({
  declarations: [
    InvoiceExportComponent
  ],
  imports: [
    CommonModule,
    InvoiceExportRoutingModule,
    CoreModule
  ]
})
export class InvoiceExportModule {
}
