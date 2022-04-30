import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessExportComponent } from './business.component';

const routes: Routes = [{ path: '', component: BusinessExportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {
}
