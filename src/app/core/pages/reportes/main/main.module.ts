import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A25Component } from './gewerbe/a25/a25.component';

import { RouterModule, Routes } from '@angular/router';

import { SaveDomPipe } from '@core/pipes';
import { CoreModule } from '@core/core.module';
 import {HeaderEmpresaComponent} from '../componentes/header-empresa/header-empresa.component';
 import {HeaderPrivadoComponent} from '../componentes/header-privado/header-privado.component';
 import {FooterEmpresaComponent} from '../componentes/footer-empresa/footer-empresa.component';
 import {FooterPrivadoComponent} from '../componentes/footer-privado/footer-privado.component';
 
// import { HeaderEmpresaComponent } from './pages/reportes/componentes/header-empresa/header-empresa.component';
// import { HeaderPrivadoComponent } from './pages/reportes/componentes/header-privado/header-privado.component';


//TODO: error si se pasa cualquier cosa como JWT abre

const routes: Routes = [{ path: 'a25/:jwt', component: A25Component }];

  // const routes: Routes = [{ path: 'a25', component: A25Component }];

 //http://localhost:4200/export/gewerbe/a25

@NgModule({
  declarations: [
    A25Component,
    HeaderEmpresaComponent,
    HeaderPrivadoComponent,
    FooterEmpresaComponent,
    FooterPrivadoComponent
    
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],

  
  exports: [RouterModule]

})
export class MainModule { }
