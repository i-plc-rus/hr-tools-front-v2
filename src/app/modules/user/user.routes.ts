import {Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {VacancyListComponent} from './vacancy-list/vacancy-list.component';
import {RequestListComponent} from './request-list/request-list.component';
import {RequestCreationComponent} from './request-creation/request-creation.component';
import {RequestApprovalComponent} from './request-approval/request-approval.component';
import {RequestDetailComponent} from './request-detail/request-detail.component';
import {DevelopmentComponent} from '../../components/development/development.component';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'vacancy',
        component: VacancyListComponent,
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
        component: DevelopmentComponent,
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
