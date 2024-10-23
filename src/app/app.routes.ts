import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/modules/auth/auth.module').then(r => r.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () => import('../app/modules/user/user.module').then(r => r.UserModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('../app/modules/admin/admin.module').then(r => r.AdminModule),
  },
  {
    path: '**',
    redirectTo: 'auth',
  }
];
