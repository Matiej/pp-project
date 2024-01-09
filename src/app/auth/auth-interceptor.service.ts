import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { SignInAuthResponse } from './signin-auth-response';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    const requstWithHeaders = req.clone({ headers });

    //take(1) makes that take only once data and usnubsrcibe
    return this.authService.singinLoginResposne.pipe(
      take(1),
      exhaustMap((singResp: SignInAuthResponse | null) => {
        if (singResp && singResp.userAuthData.idToken) {
          let token: string = singResp.userAuthData.idToken;
          console.log('token     ', token);
          const authParams = new HttpParams().set('auth', token);
          const requestWithAuthAndHeaders = requstWithHeaders.clone({
            params: authParams,
          });
          return next.handle(requestWithAuthAndHeaders);
        } else if (!req.url.toString().includes('openlibrary')) {
          return next.handle(requstWithHeaders);
        }
        return next.handle(req);
      })
    );

    // return next.handle(requstWithHeaders);
  }
}
