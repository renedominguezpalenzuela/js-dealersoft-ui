import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoveryAccountComponent } from './recovery-account.component';

const routes: Routes = [{ path: '', component: RecoveryAccountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecoveryAccountRoutingModule {
}
