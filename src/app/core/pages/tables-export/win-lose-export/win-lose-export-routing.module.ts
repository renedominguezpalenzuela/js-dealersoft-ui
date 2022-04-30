import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WinLoseExportComponent } from './win-lose-export.component';

const routes: Routes = [{ path: '', component: WinLoseExportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WinLoseExportRoutingModule {
}
