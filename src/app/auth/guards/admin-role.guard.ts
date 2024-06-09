import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import { AuthStatus, User } from '../../interfaces';
import { RolesUsers, UserRole } from '../../interfaces/roles-users.enum';

export const AdminRoleGuard: CanActivateFn = (route, state) => {

  const authService = inject( AuthService)
  const router = inject( Router );
  const current = authService.currentUser();
  if(!current) return false;

  if( current.role === 'admin') return true;

  return false;

};


