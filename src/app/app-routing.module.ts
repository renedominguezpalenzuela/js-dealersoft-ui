import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { TestimonialsComponent } from './testimonial/testimonials.component';
import { Register2Component } from './register2/register2.component';

import { AuthGuard } from '@core/guards';
import { IsFullRegisteredGuard } from '@core/guards/is-full-registered.guard';
import { TrialExpiredGuard } from '@core/guards/trial-expired.guard';
import { DatenschutComponent } from './testimonial/components/datenschut/datenschut.component';
import { ImpressumComponent } from './testimonial/components/impressum/impressum.component';

const routes: Routes = [
  // {
  //   path: '',             //home, url sin nada
  //   pathMatch: 'full',
  //   redirectTo: 'auth',
  // },
  {
    path: '', //home, url sin nada
    pathMatch: 'full',
    component: HomeComponent,
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'testimonials', //home, url sin nada
    pathMatch: 'full',
    component: TestimonialsComponent,
    loadChildren: () =>
      import('./testimonial/testimonials.module').then(
        (m) => m.TestimonialsModule
      ),
  },
  {
    path: 'datenschutz', //home, url sin nada
    pathMatch: 'full',
    component: DatenschutComponent,
    loadChildren: () =>
      import('./testimonial/testimonials.module').then(
        (m) => m.TestimonialsModule
      ),
  },
  {
    path: 'impressum', //home, url sin nada
    pathMatch: 'full',
    component: ImpressumComponent,
    loadChildren: () =>
      import('./testimonial/testimonials.module').then(
        (m) => m.TestimonialsModule
      ),
  },
  {
    path: 'register2', //home, url sin nada
    pathMatch: 'full',
    component: Register2Component,
    loadChildren: () =>
      import('./register2/register2.module').then((m) => m.Register2Module),
    // canActivate: [AuthGuard, TrialExpiredGuard],
    // canActivateChild: [AuthGuard, TrialExpiredGuard],
  },

  // {
  //   path: 'auth',
  //   component: AuthComponent,
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  // },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    // canActivate: [AuthGuard, TrialExpiredGuard],
    // canActivateChild: [AuthGuard, TrialExpiredGuard],

    canActivate: [AuthGuard, TrialExpiredGuard, IsFullRegisteredGuard],
    canActivateChild: [AuthGuard, TrialExpiredGuard, IsFullRegisteredGuard],
  },
  {
    path: 'export/my-stock/:jwt',
    loadChildren: () =>
      import(
        './core/pages/tables-export/my-stock-export/my-stock-export.module'
      ).then((m) => m.MyStockExportModule),
  },
  {
    path: 'export/buy-sell/:jwt',
    loadChildren: () =>
      import(
        './core/pages/tables-export/buy-sell-export/buy-sell-export.module'
      ).then((m) => m.BuySellExportModule),
  },
  {
    path: 'export/win-lose/:jwt',
    loadChildren: () =>
      import(
        './core/pages/tables-export/win-lose-export/win-lose-export.module'
      ).then((m) => m.WinLoseExportModule),
  },
  // {
  //   path: 'export/invoice/:jwt',
  //   loadChildren: () => import('./core/pages/tables-export/invoice-export/invoice-export.module').then(m => m.InvoiceExportModule)
  // },
  // {
  //   path: 'export/vehicle/:jwt',
  //   loadChildren: () => import('./core/pages/tables-export/vehicle/vehicle.module').then(m => m.VehicleExportModule)
  // },
  // {
  //   path: 'export/net-export/:jwt',
  //   loadChildren: () => import('./core/pages/tables-export/net-export/net-export.module').then(m => m.NetExportModule)
  // },
  // {
  //   path: 'export/net-ue-export/:jwt',
  //   loadChildren: () => import('./core/pages/tables-export/net-ue-export/net-ue-export.module').then(m => m.NetUeExportModule)
  // },
  // {
  //   path: 'export/business/:jwt',
  //   loadChildren: () => import('./core/pages/tables-export/business/business.module').then(m => m.BusinessExportModule)
  // },
  // {
  //   path: 'export/private/:jwt',
  //   loadChildren: () => import('./core/pages/tables-export/private/private.module').then(m => m.PrivateExportModule)
  // },
  // Rutas de Reportes nuevos
  {
    path: 'export/reports',
    loadChildren: () =>
      import('./core/pages/reportes/main/main.module').then(
        (m) => m.MainModule
      ),
  },
  {
    path: 'stripe-payment',
    loadChildren: () =>
      import('./core/pages/stripe-payment/stripe-payment.module').then(
        (m) => m.StripePaymentModule
      ),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'stripe-payment-mobile/:jwt',
    loadChildren: () =>
      import(
        './core/pages/stripe-payment-mobile/stripe-payment-mobile.module'
      ).then((m) => m.StripePaymentMobileModule),
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },
  {
    path: '404',
    loadChildren: () =>
      import('./core/pages/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
