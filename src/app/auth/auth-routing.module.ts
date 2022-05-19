import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginRegisterComponent} from './new/login-register/login-register.component';
import {MainPageComponent} from './new/main-page/main-page.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },

  {
    path:'main',
    component: MainPageComponent
  },
  {
    path:'login',
    component: LoginRegisterComponent
  }
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  // },
  // {
  //   path: 'recovery-account',
  //   loadChildren: () => import('./pages/recovery-account/recovery-account.module').then((m) => m.RecoveryAccountModule)
  // },
  // {
  //   path: 'reset-password',
  //   loadChildren: () => import('./pages/change-password/change-password.module').then((m) => m.ChangePasswordModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
