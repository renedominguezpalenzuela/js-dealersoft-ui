import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {LoginRegisterComponent} from './new/login-register/login-register.component';
import {RegisterLoginComponent} from './new/register-login/register-login.component';
import {RegisterComponent} from './new/register/register.component';
import {LoginComponent} from './new/login/login.component';

import {MainPageComponent} from './new/main-page/main-page.component';





const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'reset-password',
  //   pathMatch: 'full'
  // },
  {
    path: 'reset-password',
    loadChildren: () => import('./new/change-password/change-password.module').then((m) => m.ChangePasswordModule)
  },
  {
    path: 'recovery-account',
    loadChildren: () => import('./new/recovery-account/recovery-account.module').then((m) => m.RecoveryAccountModule)
  },


  // {
  //   path:'main',
  //   component: MainPageComponent
  // },
  // {
  //   path:'login',
  //   component: LoginRegisterComponent
  //   // loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)

  // },
  //   {
  //    path: 'register',
  //     component: RegisterLoginComponent
  //   // loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  //  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  // },
  // {
  //   path: 'register',
  //   loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  // },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
