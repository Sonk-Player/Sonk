import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  let cloneReq = req.clone();
  let token = sessionStorage.getItem('token');

  if (cloneReq.url.includes(`${environment.AUTH}`) ) {
    cloneReq = cloneReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(cloneReq);
};
