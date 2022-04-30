import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinLoseRoutingModule } from './win-lose-routing.module';
import { WinLoseComponent } from './win-lose.component';
import { CoreModule } from '@core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    WinLoseComponent
  ],
  imports: [
    CommonModule,
    WinLoseRoutingModule,
    CoreModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class WinLoseModule {
}
