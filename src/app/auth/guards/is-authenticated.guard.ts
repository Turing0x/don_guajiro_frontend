import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { AuthStatus } from '../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService)
  if (authService.authStatus( )  === AuthStatus.authenticated){
    return true;
  }

  if( authService.authStatus( )  === AuthStatus.checking){
    return false;
  }

  return false;

};
