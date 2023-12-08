import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../core/services/authentication.service';
import { inject } from '@angular/core';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const authSvc = inject(AuthenticationService);
  const isUserLogged = authSvc.isUserLogged;
  if (req.url.indexOf(environment.apiBaseUrl) !== -1 && isUserLogged()) {
    //inject apiKey
    const authReq = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')!}`
      }
    })

    return next(authReq);
  }

  return next(req);
};
