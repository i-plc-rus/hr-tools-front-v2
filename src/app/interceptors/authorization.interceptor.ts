import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {TokenService} from '../services/token.service';
import {catchError, throwError} from 'rxjs';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  if (tokenService.token) {
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + tokenService.token)
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if ((error.status === 400 && error.error === "missing or malformed JWT") || error.status === 401) {
        console.log(error);
        tokenService.logout();
        //todo обновление токена
      }
      return throwError(() => new Error(JSON.stringify(error)));
    }))
};
