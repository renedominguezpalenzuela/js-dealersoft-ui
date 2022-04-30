import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService, LoadingService, NotificationService } from '../services';
import { Router } from '@angular/router';
import { ErrorResponse } from '@core/interfaces';
import * as _ from 'lodash';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private readonly loadingService: LoadingService,
              private readonly authService: AuthService,
              private readonly router: Router,
              private readonly notificationService: NotificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true);

    return next.handle(request)
      .pipe(
        tap((evt: any) => {
          if (evt instanceof HttpResponse) this.loadingService.setLoading(false);
        }),
        catchError((err: HttpErrorResponse) => {
          const error: ErrorResponse = err.error.error;
          const errors = this.generateErrorList(error);
          this.notificationService.riseNotification({ color: 'warning', data: errors });

          if (err.status === 403) {
            this.authService.updateUser = null;
            this.authService.updateJWT = null;
            this.router.navigate(['/auth/login']);
          }

          this.loadingService.setLoading(false);
          return throwError(err);
        })
      );
  }

  private generateErrorList = (errors: ErrorResponse): string[] | string => {
    if (_.isEmpty(errors?.details))
      return errors.message;
    else
      return errors.details!.errors.map(err => err.message.replace(err.path[0], err.path[0].split('_').join(' ')));
  }
}
