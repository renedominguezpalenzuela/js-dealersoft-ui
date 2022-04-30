import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewBillRoutingModule } from './new-bill-routing.module';
import { NewBillComponent } from './new-bill.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    NewBillComponent
  ],
  imports: [
    CommonModule,
    NewBillRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class NewBillModule {
}
