import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A25Component } from './gewerbe/a25/a25.component';
import { KaufvertragA25Component } from './private/kaufvertrag-a25/kaufvertrag-a25.component';
import { KaufvertragIvaComponent } from './private/kaufvertrag-iva/kaufvertrag-iva.component';
import { RechnungA25Component } from './private/rechnung-a25/rechnung-a25.component';
import { RechnungIvaComponent } from './private/rechnung-iva/rechnung-iva.component';

import { RouterModule, Routes } from '@angular/router';

import { SaveDomPipe } from '@core/pipes';
import { CoreModule } from '@core/core.module';

 
 import {FooterPrivadoComponent} from '../componentes/footer-privado/footer-privado.component';

 import { ContratoFechaComponent } from '../componentes/contrato-fecha/contrato-fecha.component';



import { NettoKaufvertragExportComponent } from './netto/netto-kaufvertrag-export/netto-kaufvertrag-export.component';
import { NettoRechnungExportComponent } from './netto/netto-rechnung-export/netto-rechnung-export.component';


import {  NettoEuRechnungExportComponent} from './netto-eu/netto-eu-rechnung-export/netto-eu-rechnung-export.component';
import { NettoEuKaufvertragExportComponent } from './netto-eu/netto-eu-kaufvertrag-export/netto-eu-kaufvertrag-export.component';

import { BuyCarA25Component } from './buy-car-a25/buy-car-a25.component';
import { BuyCarIvaComponent } from './buy-car-iva/buy-car-iva.component';
import { BillA25Component } from './bill-a25/bill-a25.component';
import { BillIvaComponent } from './bill-iva/bill-iva.component';
;


 
// import { IvaComponent } from './private/rechnung/iva/iva.component';
// import { HeaderEmpresaComponent } from './pages/reportes/componentes/header-empresa/header-empresa.component';
// import { HeaderPrivadoComponent } from './pages/reportes/componentes/header-privado/header-privado.component';


//TODO: error si se pasa cualquier cosa como JWT abre

const routes: Routes = [
  { path: 'gewerbe/a25/:jwt', component: A25Component },

  //Private 
  { path: 'kaufvertrag/a25/:jwt', component: KaufvertragA25Component },
  { path: 'kaufvertrag/iva/:jwt', component: KaufvertragIvaComponent },
  { path: 'rechnung/a25/:jwt', component: RechnungA25Component },
  { path: 'rechnung/iva/:jwt', component: RechnungIvaComponent },

  //netto
   { path: 'netto/rechnung/export/:jwt', component: NettoRechnungExportComponent },
   { path: 'netto/kaufvertrag/export/:jwt', component: NettoKaufvertragExportComponent },

   //netto
   { path: 'netto-eu/rechnung/export/:jwt', component: NettoEuRechnungExportComponent },
   { path: 'netto-eu/kaufvertrag/export/:jwt', component: NettoEuKaufvertragExportComponent },


   //buy car
   { path: 'buy-car/a25/:jwt', component: BuyCarA25Component },
   { path: 'buy-car/iva/:jwt', component: BuyCarIvaComponent },

   { path: 'bill/a25/:jwt', component: BillA25Component },
   { path: 'bill/iva/:jwt', component: BillIvaComponent },


    // { path: 'buy-car', component: BuyCarComponent },

];

  // const routes: Routes = [{ path: 'a25', component: A25Component }];

 //http://localhost:4200/export/gewerbe/a25

@NgModule({
  declarations: [
    A25Component,
  
    FooterPrivadoComponent,

    ContratoFechaComponent,
    KaufvertragA25Component,
    KaufvertragIvaComponent,
    RechnungA25Component,
    RechnungIvaComponent,
    NettoKaufvertragExportComponent,
    NettoRechnungExportComponent,
    NettoEuRechnungExportComponent,
    NettoEuKaufvertragExportComponent,
    
    BuyCarA25Component,
         BuyCarIvaComponent,
         BillA25Component,
         BillIvaComponent,

 


    
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],

  
  exports: [RouterModule]

})
export class MainModule { }

