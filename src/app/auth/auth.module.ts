import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
  constructor(private readonly authService: AuthService, private readonly router: Router) {
    if (this.authService.isAuth) this.router.navigate(['/admin']);
  }
}
