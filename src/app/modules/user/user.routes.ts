import {Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {UsersListComponent} from './users-list/users-list.component';
import {VacancyListComponent} from './vacancy-list/vacancy-list.component';
import {RequestListComponent} from './request-list/request-list.component';
import {RequestCreationComponent} from './request-creation/request-creation.component';
import {RequestApprovalComponent} from './request-approval/request-approval.component';
import {RequestDetailComponent} from './request-detail/request-detail.component';
import {DevelopmentComponent} from '../../components/development/development.component';
import {VacancyNegotiationsComponent} from './vacancy-negotiations/vacancy-negotiations.component';
import {VacancyСandidatesComponent} from './vacancy-candidates/vacancy-candidates.component';
import {VacancyDetailComponent} from './vacancy-detail/vacancy-detail.component';
import {СandidateListComponent} from './candidate-list/candidate-list.component';
import {CandidateDetailComponent} from './candidate-detail/candidate-detail.component';
import {CandidateDuplicateComponent} from './candidate-duplicate/candidate-duplicate.component';
import {ProfileComponent} from './profile/profile.component';
import {AccountComponent} from './profile/user-profile/profile/account/account.component';
import {ExternalAccountsComponent} from './profile/user-profile/profile/external-accounts/external-accounts.component';
import {NotificationsComponent} from './profile/user-profile/profile/notifications/notifications.component';
import {TemplatesComponent} from './profile/user-profile/profile/templates/templates.component';
import {
  InterfaceSettingsComponent
} from './profile/user-profile/profile/interface-settings/interface-settings.component';
import {UserProfileComponent} from './profile/user-profile/user-profile';
import {CompanyProfileComponent} from './profile/company-profile/company-profile.component';
import {CompanyInfoComponent} from './profile/company-profile/sections/company-info/company-info.component';
import {MembersComponent} from './profile/company-profile/sections/members/members.component';
import {IntegrationsComponent} from './profile/company-profile/sections/integrations/integrations.component';
import {DirectoriesComponent} from './profile/company-profile/sections/directories/directories.component';
import {CommunicationsComponent} from './profile/company-profile/sections/communications/communications.component';
import {
  CompanyTemplatesComponent
} from './profile/company-profile/sections/company-templates/company-templates.component';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'employees',
        component: UsersListComponent,
      },
      {
        path: 'vacancy',
        children: [
          {
            path: 'list',
            component: VacancyListComponent,
          },
          {
            path: 'create',
            component: VacancyDetailComponent,
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                component: VacancyDetailComponent,
              },
              {
                path: 'negotiations',
                component: VacancyNegotiationsComponent,
              },
              {
                path: 'candidates',
                component: VacancyСandidatesComponent,
              },
              {
                path: '**',
                redirectTo: ''
              }
            ],
          },
          {
            path: '**',
            redirectTo: 'list'
          }
        ],
      },
      {
        path: 'request',
        children: [
          {
            path: 'list',
            component: RequestListComponent,
          },
          {
            path: 'create',
            component: RequestCreationComponent,
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                component: RequestDetailComponent,
              },
              {
                path: 'approval',
                component: RequestApprovalComponent,
              },
              {
                path: '**',
                redirectTo: ''
              }
            ],
          },
          {
            path: '**',
            redirectTo: 'list'
          }
        ],
      },
      {
        path: 'candidates',
        children: [
          {
            path: 'list',
            component: СandidateListComponent,
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                component: CandidateDetailComponent,
              },
              {
                path: ':duplicateId',
                component: CandidateDuplicateComponent,
              },
              {
                path: '**',
                redirectTo: ''
              }
            ]
          },
          {
            path: '**',
            redirectTo: 'list'
          }
        ],
      },
      {
        path: 'offers',
        component: DevelopmentComponent,
      },
      {
        path: 'calendar',
        component: DevelopmentComponent,
      },
      {
        path: 'analytics',
        component: DevelopmentComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: 'personal',
            component: UserProfileComponent,
            children: [
              { path: 'account', component: AccountComponent },
              { path: 'external-accounts', component: ExternalAccountsComponent },
              { path: 'notifications', component: NotificationsComponent },
              { path: 'templates', component: TemplatesComponent },
              { path: 'interface-settings', component: InterfaceSettingsComponent },
              { path: '**', redirectTo: 'account' }
            ]
          },
          {
            path: 'company',
            component: CompanyProfileComponent,
            children: [
              { path: 'info', component: CompanyInfoComponent },
              { path: 'members', component: MembersComponent },
              { path: 'integrations', component: IntegrationsComponent },
              { path: 'directories', component: DirectoriesComponent },
              { path: 'communications', component: CommunicationsComponent },
              { path: 'templates', component: CompanyTemplatesComponent },
              { path: '**', redirectTo: 'info' }
            ]
          },
          { path: '**', redirectTo: 'personal' }
        ]
      },
      {
        path: '**',
        redirectTo: 'vacancy'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
]
