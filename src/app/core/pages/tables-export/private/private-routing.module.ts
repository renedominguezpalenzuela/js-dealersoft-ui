import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateExportComponent } from './private.component';

const routes: Routes = [{ path: '', component: PrivateExportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {
}
