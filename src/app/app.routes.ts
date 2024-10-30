import { Routes } from '@angular/router';
import {roleGuard} from './guards/role-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/modules/auth/auth.module').then(r => r.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('../app/modules/user/user.module').then(r => r.UserModule),
    canActivate: [() => roleGuard(['USER'])],
    canActivateChild: [() => roleGuard(['USER'])]
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/modules/admin/admin.module').then(r => r.AdminModule),
    canActivate: [() => roleGuard(['ADMIN', 'SUPER_ADMIN'])],
    canActivateChild: [() => roleGuard(['ADMIN', 'SUPER_ADMIN'])]
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
];
