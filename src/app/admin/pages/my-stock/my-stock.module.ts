import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyStockRoutingModule } from './my-stock-routing.module';
import { MyStockComponent } from './my-stock.component';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '@core/core.module';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    MyStockComponent
  ],
  imports: [
    CommonModule,
    MyStockRoutingModule,
    MatIconModule,
    CoreModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class MyStockModule {
}
