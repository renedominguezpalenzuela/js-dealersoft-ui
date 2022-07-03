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
import { FirmaComponent } from './pages/reportes/componentes/firma/firma.component';
import { InvoiceFechaComponent } from './pages/reportes/componentes/invoice-fecha/invoice-fecha.component';
import { CarDetailsMinComponent } from './pages/reportes/componentes/car-details-min/car-details-min.component';
import { PrecioA25Component } from './pages/reportes/componentes/precio-a25/precio-a25.component';
import { PrecioIvaComponent } from './pages/reportes/componentes/precio-iva/precio-iva.component';
import { Contrato2FechaComponent } from './pages/reportes/componentes/contrato2-fecha/contrato2-fecha.component';
import { PrecioNettoComponent } from './pages/reportes/componentes/precio-netto/precio-netto.component';
import { PrecioNettoEuComponent } from './pages/reportes/componentes/precio-netto-eu/precio-netto-eu.component';
import { PrecioNetto2Component } from './pages/reportes/componentes/precio-netto2/precio-netto2.component';
import { PrecioNettoEu2Component } from './pages/reportes/componentes/precio-netto-eu2/precio-netto-eu2.component';
import { SecondPageComponent } from './pages/reportes/componentes/second-page/second-page.component';
import { HeaderEmpresaComponent } from './pages/reportes/componentes/header-empresa/header-empresa.component';
import { HeaderPrivadoComponent } from './pages/reportes/componentes/header-privado/header-privado.component';
import { CarDetailsComponent } from './pages/reportes/componentes/car-details/car-details.component';
import {FooterEmpresaComponent} from './pages/reportes/componentes/footer-empresa/footer-empresa.component';
import { CarDetailsCompraComponent } from './pages/reportes/componentes/car-details-compra/car-details-compra.component';
import { PrecioCompraComponent } from './pages/reportes/componentes/precio-compra/precio-compra.component';
import { ContratoFechaCompraComponent } from './pages/reportes/componentes/contrato-fecha-compra/contrato-fecha-compra.component';
import { PrecioCompraIvaComponent } from './pages/reportes/componentes/precio-compra-iva/precio-compra-iva.component';
import { ComentariosComponent } from './pages/reportes/componentes/comentarios/comentarios.component';
import { CarDetailsSuperminComponent } from './pages/reportes/componentes/car-details-supermin/car-details-supermin.component';
import { FechaBillComponent } from './pages/reportes/componentes/fecha-bill/fecha-bill.component';
import { PrecioBillA25Component } from './pages/reportes/componentes/precio-bill-a25/precio-bill-a25.component';
import { PrecioBillIvaComponent } from './pages/reportes/componentes/precio-bill-iva/precio-bill-iva.component';




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
    SaveDomPipe,
    FirmaComponent,
    CarDetailsMinComponent,
    PrecioA25Component,
    InvoiceFechaComponent,
    PrecioIvaComponent,
    Contrato2FechaComponent,
    PrecioNettoComponent,
    PrecioNettoEuComponent,
    PrecioNetto2Component,
    PrecioNettoEu2Component,
    SecondPageComponent,
    HeaderEmpresaComponent,
    HeaderPrivadoComponent,
    CarDetailsComponent,
    FooterEmpresaComponent,
    CarDetailsCompraComponent,
    PrecioCompraComponent,
    ContratoFechaCompraComponent,
    PrecioCompraIvaComponent,
    ComentariosComponent,
    CarDetailsSuperminComponent,
    FechaBillComponent,
    PrecioBillA25Component,
    PrecioBillIvaComponent,
    

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
    InvoiceInfoComponent,
    FirmaComponent,
    InvoiceFechaComponent,
    CarDetailsMinComponent,
    PrecioA25Component,
    PrecioIvaComponent,
    Contrato2FechaComponent,
    PrecioNettoComponent,
    PrecioNettoEuComponent,
    PrecioNetto2Component,
    PrecioNettoEu2Component,
    SecondPageComponent,
    HeaderEmpresaComponent,
    HeaderPrivadoComponent,
    CarDetailsComponent,
    FooterEmpresaComponent,
    CarDetailsCompraComponent,
    PrecioCompraComponent,
    ContratoFechaCompraComponent,
    PrecioCompraIvaComponent,
    ComentariosComponent,
    CarDetailsSuperminComponent,
    FechaBillComponent,
    PrecioBillA25Component,
    PrecioBillIvaComponent,
    


    // FooterEmpresaComponent,
  ],
})
export class CoreModule {}
