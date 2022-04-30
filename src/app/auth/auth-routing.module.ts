import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'recovery-account',
    loadChildren: () => import('./pages/recovery-account/recovery-account.module').then((m) => m.RecoveryAccountModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/change-password/change-password.module').then((m) => m.ChangePasswordModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
