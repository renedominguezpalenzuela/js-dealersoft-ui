import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';

import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './new/login/login.component';
import { RegisterComponent } from './new/register/register.component';
import { ChangePasswordComponent } from './new/change-password/change-password.component';
import { RecoveryAccountComponent } from './new/recovery-account/recovery-account.component';
import { MainPageComponent } from './new/main-page/main-page.component';
import { LoginRegisterComponent } from './new/login-register/login-register.component';
import { MaintextoComponent } from './new/components/maintexto/maintexto.component';
import { MainimgComponent } from './new/components/mainimg/mainimg.component';
import { MainbuttonComponent } from './new/components/mainbutton/mainbutton.component';
import { MaincarruselimgComponent } from './new/components/maincarruselimg/maincarruselimg.component';
import { MainfooterComponent } from './new/components/mainfooter/mainfooter.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    RecoveryAccountComponent,
    MainPageComponent,
    LoginRegisterComponent,
    MaintextoComponent,
    MainimgComponent,
    MainbuttonComponent,
    MaincarruselimgComponent,
    MainfooterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  
  ]
})
export class AuthModule {
  constructor(private readonly authService: AuthService, private readonly router: Router) {
    if (this.authService.isAuth) this.router.navigate(['/admin']);
  }
}
