import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultipleInvoicesRoutingModule } from './multiple-invoices-routing.module';
import { MultipleInvoicesComponent } from './multiple-invoices.component';
import { CoreModule } from '@core/core.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TablaInvoicesComponent } from './componentes/tabla-invoices/tabla-invoices.component';


@NgModule({
  declarations: [
    MultipleInvoicesComponent,
    TablaInvoicesComponent
  ],
  imports: [
    CommonModule,
    MultipleInvoicesRoutingModule,
    CoreModule,
    FormsModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class MultipleInvoicesModule {
}
