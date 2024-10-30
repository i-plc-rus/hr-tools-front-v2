import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {routes} from './user.routes';
import {UserComponent} from './user.component';
import {VacancyListComponent} from './vacancy-list/vacancy-list.component';
import {RequestListComponent} from './request-list/request-list.component';
import {RequestCreationComponent} from './request-creation/request-creation.component';
import {RequestApprovalComponent} from './request-approval/request-approval.component';
import {RequestDetailComponent} from './request-detail/request-detail.component';
import {LayoutComponent} from '../../components/layout/layout.component';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotificationBubbleComponent} from '../../components/notification-bubble/notification-bubble.component';

import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    UserComponent,
    VacancyListComponent,
    RequestListComponent,
    RequestCreationComponent,
    RequestApprovalComponent,
    RequestDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutComponent,
    SidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    NotificationBubbleComponent,

    MatIcon,
    MatIconModule,
    MatButtonModule,
    MatTooltip,
    MatMenuModule,
  ]
})
export class UserModule { }
