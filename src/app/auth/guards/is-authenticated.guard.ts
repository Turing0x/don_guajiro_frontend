import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { AuthStatus } from '../../interfaces';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  // const url = state.url;
  // console.log(url);




  const authService = inject( AuthService)
  const router = inject( Router );





  if (authService.authStatus( )  === AuthStatus.authenticated){
    console.log('authenticated');
    return true;
  }

  if( authService.authStatus( )  === AuthStatus.checking){
    console.log('checking');
    return false;
  }

console.log('noooooooo');
 // router.navigate(['/auth/login']);

  return false;
};
