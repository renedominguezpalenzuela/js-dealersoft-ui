import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuySellExportComponent } from './buy-sell-export.component';

const routes: Routes = [{ path: '', component: BuySellExportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuySellExportRoutingModule {
}
