import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyStockComponent } from './my-stock.component';

const routes: Routes = [{ path: '', component: MyStockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyStockRoutingModule {
}
