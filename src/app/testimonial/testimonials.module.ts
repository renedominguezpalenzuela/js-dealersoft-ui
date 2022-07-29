import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsComponent } from './testimonials.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    TestimonialsComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TestimonialsModule { }
