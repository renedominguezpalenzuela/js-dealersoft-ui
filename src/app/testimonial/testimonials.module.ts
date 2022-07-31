import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsComponent } from './testimonials.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { DatenschutComponent } from './components/datenschut/datenschut.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    TestimonialsComponent,
    NavbarComponent,
    ImpressumComponent,
    DatenschutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TestimonialsModule { }
