import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CoreModule } from '@core/core.module';
import { ApiHelperService, AuthService, RequestService } from '@core/services';
import { Router } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
//import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AdminComponent,
  //  ProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    CoreModule,
    MatMenuModule
  ],
})
export class AdminModule {
  constructor(
    private readonly requestService: RequestService,
    private readonly apiHelperService: ApiHelperService,
    private readonly authService: AuthService,
    private readonly router: Router
    
  ) {
    var tiempo_parcial_ini = new Date().getTime();



    // this.requestService.Get(this.apiHelperService.meURL)
    //   .subscribe(
    //     result => {

      

    //       var end = new Date().getTime();
    //       var time = end - tiempo_parcial_ini;
    //       console.log("Calling Admin module: "+this.apiHelperService.meURL)
    //       console.log('Execution time: ' + time);
         

        
        
         
    //     },
    //     error => {
    //       console.log("Error")
    //       console.log(error)
    //       this.authService.updateUser = null;
    //       this.authService.updateJWT = null;          
    //       this.router.navigate(['/']);
    //     }
    //   );
  }
}
