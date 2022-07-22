import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { SaveDom3Pipe } from '../../../save-dom3.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    ProfileComponent,
    SaveDom3Pipe
  ],
  exports: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class ProfileModule { }
