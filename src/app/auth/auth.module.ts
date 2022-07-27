import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';

import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './new/login/login.component';
import { RegisterComponent } from './new/register/register.component';
// import { ChangePasswordComponent } from './new/change-password/change-password.component';
// import { RecoveryAccountComponent } from './new/recovery-account/recovery-account.component';
import { MainPageComponent } from './new/main-page/main-page.component';
import { LoginRegisterComponent } from './new/login-register/login-register.component';
import { RegisterLoginComponent } from './new/register-login/register-login.component';
import { MaintextoComponent } from './new/components/maintexto/maintexto.component';
import { MainimgComponent } from './new/components/mainimg/mainimg.component';
import { MainbuttonComponent } from './new/components/mainbutton/mainbutton.component';
import { MaincarruselimgComponent } from './new/components/maincarruselimg/maincarruselimg.component';
import { MainfooterComponent } from './new/components/mainfooter/mainfooter.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SaveDom2Pipe } from './../save-dom2.pipe';

import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './landing-page/navbar/navbar.component';
import { BannerMainComponent } from './landing-page/banner-main/banner-main.component';
import { SecondBannerComponent } from './landing-page/second-banner/second-banner.component';
import { BannerBlackComponent } from './landing-page/banner-black/banner-black.component';
import { SectionFunktionenComponent } from './landing-page/section-funktionen/section-funktionen.component';
import { UberSectionComponent } from './landing-page/uber-section/uber-section.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    // ChangePasswordComponent,
    // RecoveryAccountComponent,
    MainPageComponent,
    LoginRegisterComponent,
    RegisterLoginComponent,
    MaintextoComponent,
    MainimgComponent,
    MainbuttonComponent,
    MaincarruselimgComponent,
    MainfooterComponent,
    SaveDom2Pipe,
    NavbarComponent,
    BannerMainComponent,
    SecondBannerComponent,
    BannerBlackComponent,
    SectionFunktionenComponent,
    UberSectionComponent
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule
  
  ]
})
export class AuthModule {
  constructor(private readonly authService: AuthService, private readonly router: Router) {
    if (this.authService.isAuth) this.router.navigate(['/admin']);
  }
}
