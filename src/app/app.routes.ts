import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { AdminRoleGuard } from './auth/guards/admin-role.guard';
import { NotFound404Component } from './not-found404/not-found404.component';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [ isNotAuthenticatedGuard ],
    component: LoginComponent
  },
  {
    path: 'admin',
    canActivate: [ AdminRoleGuard ],
    loadChildren: () =>
      import('./admin/admin.routes')
        .then( m => m.routesAdmin )
  },
];
