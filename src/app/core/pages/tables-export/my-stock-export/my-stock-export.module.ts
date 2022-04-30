import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStockExportRoutingModule } from './my-stock-export-routing.module';
import { MyStockExportComponent } from './my-stock-export.component';


@NgModule({
  declarations: [
    MyStockExportComponent
  ],
  imports: [
    CommonModule,
    MyStockExportRoutingModule
  ]
})
export class MyStockExportModule {
}
