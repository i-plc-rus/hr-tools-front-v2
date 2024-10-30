import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthComponent} from './auth.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {OrgRegistrationComponent} from './components/org-registration/org-registration.component';
import {OrgSearchComponent} from './components/org-search/org-search.component';
import {OrgApprovalComponent} from './components/org-approval/org-approval.component';
import {AdminRegistrationComponent} from './components/admin-registration/admin-registration.component';
import {PasswordRecoveryComponent} from './components/password-recovery/password-recovery.component';
import {PasswordResetComponent} from './components/password-reset/password-reset.component';
import {
  PasswordRecoverySuccessComponent
} from './components/password-recovery-success/password-recovery-success.component';

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
        path: 'org-search',
        component: OrgSearchComponent,
      },
      {
        path: 'org-approval',
        component: OrgApprovalComponent,
      },
      {
        path: 'org-registration',
        component: OrgRegistrationComponent,
      },
      {
        path: 'admin-registration',
        component: AdminRegistrationComponent,
      },
      {
        path: 'password-recovery',
        component: PasswordRecoveryComponent,
      },
      {
        path: 'password-recovery-success',
        component: PasswordRecoverySuccessComponent,
      },
      {
        path: 'password-reset',
        component: PasswordResetComponent,
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
