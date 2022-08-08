import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthComponent } from './auth/auth.component';
// import { AdminComponent } from './admin/admin.component';
// import { HomeComponent } from './home/home.component';
// import { TestimonialsComponent } from './testimonial/testimonials.component';
import { PageMainComponent } from './componentes/page-main/page-main.component';
import { ContactComponent } from './componentes/page-main/contact/contact.component';
import {ImpressumComponent} from './componentes/page-main/impressum/impressum.component'
import {TestimonialsComponent} from './componentes/page-main/testimonials/testimonials.component'
import { AuthGuard } from '@core/guards';
import { IsFullRegisteredGuard } from '@core/guards/is-full-registered.guard';
import { TrialExpiredGuard } from '@core/guards/trial-expired.guard';

 const routes: Routes = [

  {
    path: '',
    component: PageMainComponent,
    pathMatch: 'full',
    loadChildren: () => import('./componentes/page-main/page-main.module').then((m) => m.PageMainModule),
  },
  {
    path: 'contact',
    pathMatch: 'full',
    component: ContactComponent,
    loadChildren: () => import('./componentes/page-main/page-main.module').then((m) => m.PageMainModule),
  },
  {
    path: 'impressum',
    pathMatch: 'full',
    component: ImpressumComponent,
    loadChildren: () => import('./componentes/page-main/page-main.module').then((m) => m.PageMainModule),
  },
  {
    path: 'testimonials',
    pathMatch: 'full',
    component: TestimonialsComponent,
    loadChildren: () => import('./componentes/page-main/page-main.module').then((m) => m.PageMainModule),
  },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
