import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [CommonModule, ChangePasswordRoutingModule, ReactiveFormsModule],
})
export class ChangePasswordModule {
}
