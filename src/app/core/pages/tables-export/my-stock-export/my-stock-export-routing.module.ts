import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyStockExportComponent } from './my-stock-export.component';

const routes: Routes = [{ path: '', component: MyStockExportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyStockExportRoutingModule {
}
