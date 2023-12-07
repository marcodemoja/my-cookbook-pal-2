import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const authSvc = inject(AuthenticationService);
  const router = inject(Router);
    if(authSvc.isUserLogged()) {
      return true;
    }
    else {
      router.navigate(['/login']);
      return false;
    }
};
