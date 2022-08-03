import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//  import {PruebaComponent} from './componentes/prueba/prueba.component';

import { PageMainComponent } from './page-main.component';
import { BannerMainComponent } from './componentes/banner-main/banner-main.component';
import { SecondBannerComponent } from './componentes/second-banner/second-banner.component';
import { BannerBlackComponent } from './componentes/banner-black/banner-black.component';

import { MatExpansionModule } from '@angular/material/expansion';
 
import { SectionFunktionenComponent } from './componentes/section-funktionen/section-funktionen.component';
import { UberSectionComponent } from './componentes/uber-section/uber-section.component';
import { LandingRegisterComponent } from './componentes/landing-register/landing-register.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LandingLoginComponent } from './componentes/landing-login/landing-login.component';
import { LandingRegisterLoginComponent } from './componentes/landing-register-login/landing-register-login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LandingFooterComponent } from './componentes/landing-footer/landing-footer.component';
import { AcordionComponent } from './componentes/acordion/acordion.component';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './componentes/navbar/navbar.component';

@NgModule({
  declarations: [
    PageMainComponent,
    // PruebaComponent

    BannerMainComponent,
    SecondBannerComponent,

    BannerBlackComponent,
    SectionFunktionenComponent,
    UberSectionComponent,
    LandingRegisterComponent,
     LandingLoginComponent,
     NavbarComponent,
    LandingRegisterLoginComponent,
    LandingFooterComponent,
    AcordionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // PruebaModule
    MatProgressSpinnerModule,
    MatTabsModule,
    MatExpansionModule,
    MatIconModule,
  ],
  exports: [],
})
export class PageMainModule {}
