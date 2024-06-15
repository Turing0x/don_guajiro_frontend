import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService)
  const router = inject( Router );

  if (authService.authStatus( )  === AuthStatus.authenticated){
    return false;
  }

  if( authService.authStatus( )  === AuthStatus.checking){
  router.navigate(['/noServer']);

    return false;
  }

console.log('noooooooo');
//  router.navigate(['/login']);

  return true;
};
