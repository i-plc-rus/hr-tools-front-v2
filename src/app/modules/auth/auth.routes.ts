import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import {RegistrationComponent} from './registration/registration.component';
import {OrgRegistrationComponent} from './org-registration/org-registration.component';

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
        path: 'org-registration',
        component: OrgRegistrationComponent,
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
