import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import {RegistrationComponent} from './registration/registration.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
  },
]
