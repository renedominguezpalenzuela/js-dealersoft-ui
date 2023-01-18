import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';

import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
// import { SaveDom3Pipe } from '../../../save-dom3.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    ProfileComponent,
    //SaveDom3Pipe
  ],
  exports: [
    ProfileComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ProfileModule { }
