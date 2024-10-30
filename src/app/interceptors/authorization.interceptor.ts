import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {TokenService} from '../services/token.service';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  if (tokenService.token) {
    req = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + tokenService.token)
    });
  }
  return next(req);
};
