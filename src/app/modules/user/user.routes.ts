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
import {UserProfileComponent} from './user-profile/components/personal-info/personal-info.component';

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
        children: [
          {
            path: 'list',
            component: UserProfileComponent,
          },
          {
            path: '**',
            redirectTo: 'list'
          }
        ],
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
