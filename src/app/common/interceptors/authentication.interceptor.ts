import { HttpHeaders, type HttpInterceptorFn } from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const userToken = localStorage.getItem('access-token');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'access-token': userToken ?? ''
  });

  const modifiedReq = req.clone({ headers: headers });

  return next(modifiedReq);
};
