import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';

import { MatToolbarModule } from '@angular/material/toolbar';

// import { ChangePasswordComponent } from './new/change-password/change-password.component';
// import { RecoveryAccountComponent } from './new/recovery-account/recovery-account.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { SaveDom2Pipe } from './../save-dom2.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Register2Component } from './register2.component';
import { CoreModule } from '@core/core.module';

//import { SaveDom4Pipe } from './../save-dom4.pipe';

@NgModule({
  declarations: [Register2Component/*, SaveDom4Pipe */   ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule
   
  ],
})
export class Register2Module {}
