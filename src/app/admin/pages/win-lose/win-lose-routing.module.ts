import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WinLoseComponent } from './win-lose.component';

const routes: Routes = [{ path: '', component: WinLoseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WinLoseRoutingModule {
}
