import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiHelperService, AuthService } from '@core/services';
import { User } from '@core/interfaces';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private availableUrls = [this.apiHelperService.loginURL, this.apiHelperService.registerURL]

  constructor(
    private authService: AuthService,
    private apiHelperService: ApiHelperService
  ) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {

 
    if (this.authService.isAuth) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${ this.authService.JWT }` },
      });
    }

    return next.handle(request).pipe(
      tap((response) => {
        if (response instanceof HttpResponse && this.availableUrls.some(url => response.url?.includes(url))) {
          this.authService.updateUser = (response.body as any).user as User;
          this.authService.updateJWT = (response.body as any).jwt;
        }
      })
    );
  }
}
