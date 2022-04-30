import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetExportComponent } from './net-export.component';

const routes: Routes = [{ path: '', component: NetExportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetExportRoutingModule {
}
