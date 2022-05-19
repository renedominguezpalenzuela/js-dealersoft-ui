import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
//  import { RegisterComponent } from '../register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    LoginComponent,
  // /  RegisterComponent
   
   
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
     MatTabsModule,
    // RegisterComponent
  
    
  ]
})
export class LoginModule {
}
