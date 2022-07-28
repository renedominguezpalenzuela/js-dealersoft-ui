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
import { LandingLoginComponent } from './componentes/landing-login/landing-login.component';
import { LandingRegisterLoginComponent } from './componentes/landing-register-login/landing-register-login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LandingFooterComponent } from './componentes/landing-footer/landing-footer.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    BannerMainComponent,
    SecondBannerComponent,
    BannerBlackComponent,
    SectionFunktionenComponent,
    UberSectionComponent,
    LandingRegisterComponent,
    LandingLoginComponent,
    LandingRegisterLoginComponent,
    LandingFooterComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
})
export class HomeModule {}