import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

import { NavbarComponent } from './componentes/navbar/navbar.component';
import { BannerMainComponent } from './componentes/banner-main/banner-main.component';
import { SecondBannerComponent } from './componentes/second-banner/second-banner.component';
import { BannerBlackComponent } from './componentes/banner-black/banner-black.component';
import { SectionFunktionenComponent } from './componentes/section-funktionen/section-funktionen.component';
import { UberSectionComponent } from './componentes/uber-section/uber-section.component';
import { LandingRegisterComponent } from './componentes/landing-register/landing-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    BannerMainComponent,
    SecondBannerComponent,
    BannerBlackComponent,
    SectionFunktionenComponent,
    UberSectionComponent,
    LandingRegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class HomeModule { }
