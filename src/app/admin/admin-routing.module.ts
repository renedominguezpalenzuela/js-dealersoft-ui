import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-stock',
    pathMatch: 'full'
  },
  {
    path: 'new-vehicle',
    loadChildren: () => import('./pages/new-vehicle/new-vehicle.module').then(m => m.NewVehicleModule)
  },
  {
    path: 'my-stock',
    loadChildren: () => import('./pages/my-stock/my-stock.module').then(m => m.MyStockModule)
  },
  {
    path: 'all-vehicles',
    loadChildren: () => import('./pages/all-vehicles/all-vehicles.module').then(m => m.AllVehiclesModule)
  },
  {
    path: 'customer-information',
    loadChildren: () => import('./pages/customer-information/customer-information.module').then(m => m.CustomerInformationModule)
  },
  {
    path: 'buying-selling',
    loadChildren: () => import('./pages/buying-selling/buying-selling.module').then(m => m.BuyingSellingModule)
  },
  {
    path: 'win-lose',
    loadChildren: () => import('./pages/win-lose/win-lose.module').then(m => m.WinLoseModule)
  },
  {
    path: 'vehicle-evaluation',
    loadChildren: () => import('./pages/vehicle-evaluation/vehicle-evaluation.module').then(m => m.VehicleEvaluationModule)
  },
  {
    path: 'new-invoice',
    loadChildren: () => import('./pages/new-bill/new-bill.module').then(m => m.NewBillModule)
  },
  {
    path: 'list-invoices',
    loadChildren: () => import('./pages/multiple-invoices/multiple-invoices.module').then(m => m.MultipleInvoicesModule)
  },
  {
    path: 'vehicle-form/:id',
    loadChildren: () => import('./pages/vehicle-form/vehicle-form.module').then(m => m.VehicleFormModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
