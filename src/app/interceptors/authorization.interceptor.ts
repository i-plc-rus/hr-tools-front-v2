import {HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {TokenService} from '../services/token.service';
import {catchError, switchMap, throwError} from 'rxjs';
import {UserService} from '../services/user.service';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const userService = inject(UserService);
  function addAuthHeader(request: HttpRequest<unknown>) {
    if (tokenService.token)
      return request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + tokenService.token)
      });
    return request;
  }

  req = addAuthHeader(req);

  return next(req).pipe(
    catchError((error) => {
      const isUnauthorized = (error.status === 400 && error.error === 'missing or malformed JWT') || error.status === 401;
      if (isUnauthorized && !tokenService.isRefreshing && tokenService.refreshToken) {
        tokenService.isRefreshing = true;
        return tokenService.refresh()
          .pipe(
            switchMap((response) => {
              tokenService.updateToken(response.body?.data?.token, response.body?.data?.refresh_token);
              tokenService.isRefreshing = false;
              req = addAuthHeader(req);
              return next(req);
            }),
            catchError((e) => {
              userService.logout();
              tokenService.isRefreshing = false;
              return throwError(() => new Error(JSON.stringify(e)));
            })
          );
      }
      else
        return throwError(() => new Error(JSON.stringify(error)));
    }))
};
