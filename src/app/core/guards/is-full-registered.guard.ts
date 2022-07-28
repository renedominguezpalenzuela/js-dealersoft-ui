import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class IsFullRegisteredGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthService) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  
     if (this.authService.isFullRegistered) {
         return true;
     } else {        
        this.router.navigate(['/register2']);
        return false;
     }

  
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (this.authService.isFullRegistered) {
          return true;
      } else {        
         this.router.navigate(['/register2']);
         return false;
      }
 
  }
  
}
