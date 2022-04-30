import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetUeExportComponent } from './net-ue-export.component';

const routes: Routes = [{ path: '', component: NetUeExportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetUeExportRoutingModule {
}
