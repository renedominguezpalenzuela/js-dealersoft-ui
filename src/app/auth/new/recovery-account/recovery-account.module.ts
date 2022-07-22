import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoveryAccountRoutingModule } from './recovery-account-routing.module';
import { RecoveryAccountComponent } from './recovery-account.component';



import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations:
   [RecoveryAccountComponent],
  exports: [
    RecoveryAccountComponent
  ] ,
  imports: [
    CommonModule,
    RecoveryAccountRoutingModule,
    ReactiveFormsModule
  ],
})
export class RecoveryAccountModule { }
