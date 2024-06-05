import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { inject } from '@angular/core';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {

  const cookieService = inject(CookieService);

  let cloneReq = req.clone();
  const token =cookieService.get('token');

  if (cloneReq.url.includes(`${environment.AUTH}`) ) {
    cloneReq = cloneReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(cloneReq);
};
