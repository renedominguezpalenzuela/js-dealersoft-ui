import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DynamicTableComponent } from './lib/dynamic-table/dynamic-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { NestedPropertyPipe } from '@core/lib/dynamic-table/utils/pipes';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoaderComponent } from './components/loader/loader.component';
import { SelectColumnsComponent } from './components/select-columns/select-columns.component';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotificationComponent } from './components/notification/notification.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { RemoveConfirmationComponent } from './components/remove-confirmation/remove-confirmation.component';
import { BuyFormComponent } from './components/buy-form/buy-form.component';
import { SellFormComponent } from './components/sell-form/sell-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SaveDomPipe } from '@core/pipes';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { InvoiceInfoComponent } from './components/invoice-info/invoice-info.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  exports: [
    DynamicTableComponent,
    LoaderComponent,
    NestedPropertyPipe,
    BuyFormComponent,
    SellFormComponent,
    SaveDomPipe
  ],
  declarations: [
    DynamicTableComponent,
    NestedPropertyPipe,
    LoaderComponent,
    SelectColumnsComponent,
    CustomerFormComponent,
    NotificationComponent,
    VehicleInfoComponent,
    CustomerInfoComponent,
    RemoveConfirmationComponent,
    BuyFormComponent,
    SellFormComponent,
    SaveDomPipe,
    InvoiceInfoComponent
  ]
})
export class CoreModule {
}
