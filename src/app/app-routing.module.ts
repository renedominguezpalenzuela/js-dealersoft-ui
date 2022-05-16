import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '@core/guards';
import { TrialExpiredGuard } from '@core/guards/trial-expired.guard';

const routes: Routes = [
  {
    path: '',             //home, url sin nada
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, TrialExpiredGuard],
    canActivateChild: [AuthGuard, TrialExpiredGuard],
  },
  {
    path: 'export/my-stock/:jwt',
    loadChildren: () => import('./core/pages/tables-export/my-stock-export/my-stock-export.module').then(m => m.MyStockExportModule)
  },
  {
    path: 'export/buy-sell/:jwt',
    loadChildren: () => import('./core/pages/tables-export/buy-sell-export/buy-sell-export.module').then(m => m.BuySellExportModule)
  },
  {
    path: 'export/win-lose/:jwt',
    loadChildren: () => import('./core/pages/tables-export/win-lose-export/win-lose-export.module').then(m => m.WinLoseExportModule)
  },
  {
    path: 'export/invoice/:jwt',
    loadChildren: () => import('./core/pages/tables-export/invoice-export/invoice-export.module').then(m => m.InvoiceExportModule)
  },
  {
    path: 'export/vehicle/:jwt',
    loadChildren: () => import('./core/pages/tables-export/vehicle/vehicle.module').then(m => m.VehicleExportModule)
  },
  {
    path: 'export/net-export/:jwt',
    loadChildren: () => import('./core/pages/tables-export/net-export/net-export.module').then(m => m.NetExportModule)
  },
  {
    path: 'export/net-ue-export/:jwt',
    loadChildren: () => import('./core/pages/tables-export/net-ue-export/net-ue-export.module').then(m => m.NetUeExportModule)
  },
  {
    path: 'export/business/:jwt',
    loadChildren: () => import('./core/pages/tables-export/business/business.module').then(m => m.BusinessExportModule)
  },
  {
    path: 'export/private/:jwt',
    loadChildren: () => import('./core/pages/tables-export/private/private.module').then(m => m.PrivateExportModule)
  },
  {
    path: 'stripe-payment',
    loadChildren: () => import('./core/pages/stripe-payment/stripe-payment.module').then(m => m.StripePaymentModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  },
  {
    path: 'stripe-payment-mobile/:jwt',
    loadChildren: () => import('./core/pages/stripe-payment-mobile/stripe-payment-mobile.module').then(m => m.StripePaymentMobileModule)
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  },
  {
    path: '404',
    loadChildren: () => import('./core/pages/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
