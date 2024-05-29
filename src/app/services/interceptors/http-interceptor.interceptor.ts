import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../loader.service';
import { inject } from '@angular/core';
import { count, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);


  let clonedRequest = req.clone()

    if(clonedRequest.url.includes(environment.API_BASE_URL_YT + 'status')){
      return next(req).pipe(
        tap({
          error: () => {
            loaderService.setLoading(false, req.url)
          },
          complete: () => {
            loaderService.setLoading(false, req.url)}
        })
      );
    }
   return next(req)


};
