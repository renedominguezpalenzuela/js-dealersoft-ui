import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@core/services';

@Injectable({ providedIn: 'root' })
export class TrialExpiredGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isOnTrial()) {
      return true;
    } else {
      this.router.navigate(['/stripe-payment']);
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isOnTrial()) {
      return true;
    } else {
      this.router.navigate(['/stripe-payment']);
      return false;
    }
  }
}
