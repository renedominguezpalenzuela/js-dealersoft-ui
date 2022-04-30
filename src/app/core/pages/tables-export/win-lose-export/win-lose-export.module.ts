import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinLoseExportRoutingModule } from './win-lose-export-routing.module';
import { WinLoseExportComponent } from './win-lose-export.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    WinLoseExportComponent
  ],
  imports: [
    CommonModule,
    WinLoseExportRoutingModule,
    MatIconModule
  ]
})
export class WinLoseExportModule {
}
