import { Injectable, Injector } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private injector: Injector,
    private authService: AuthService,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = request;
    let authService = this.injector.get(AuthService);
    const token = authService.getAccessToken();

    if (token != null) {
      request = this.addTokenHeader(request, token);
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (
          err instanceof HttpErrorResponse &&
          !request.url.includes('/login') &&
          err.status === 401
        ) {
          return this.handle401Error(authReq, next);
        } else {
          console.log(err);
          this.handleErrors(err);
        }
        return throwError(err);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      const token = this.authService.getRefreshToken();
      if (token) {
        return this.authService.refreshToken(token).pipe(
          switchMap((res: any) => {
            this.isRefreshing = false;
            this.cookieService.set('accessToken', res.accessToken);
            this.cookieService.set('refreshToken', res.refreshToken);
            return next.handle(this.addTokenHeader(request, res.accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.authService.logout();
            return throwError(err);
          })
        );
      }
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private handleErrors(err: any) {
    if (err instanceof HttpErrorResponse) {
      switch (err.status) {
        case 401:
          this.toastr.error('User account or password incorrect');
          break;
        case 404:
          this.toastr.error('The server can not find the requested resource');
          break;
        case 403:
          this.toastr.error(
            'The client does not have access rights to the content'
          );
          break;
        case 503:
          this.toastr.error('The server is not ready to handle the request.');
          break;
        default: {
          if (err.error.message) {
            this.toastr.error(err.error.message);
          } else {
            this.toastr.error(err.message);
          }
          break;
        }
      }
    }
    return new Observable<HttpEvent<any>>();
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
    });
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
