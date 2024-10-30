import { HttpInterceptorFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // todo пока не работает тк на бэке не прописаны ориджины а просто указано *
  // req = req.clone({
  //   withCredentials: true
  // });
  return next(req);
};
