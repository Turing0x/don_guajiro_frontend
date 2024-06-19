import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth-service.service';

export const AdminRoleGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService)
  const current = authService.currentUser();
  if(!current) return false;

  if( current.role === 'admin') return true;

  return false;

};


