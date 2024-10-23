import {Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {UsersComponent} from './users/users.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: '**',
        redirectTo: 'users',
      }
    ]
  },
  {
    path: '**',
    redirectTo: '',
  }
]
