import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {routes} from './user.routes';
import {AgGridAngular} from 'ag-grid-angular';
import {UserComponent} from './user.component';
import {UsersListComponent} from './users-list/users-list.component';
import {TableButtonComponent} from './users-list/table-button/table-button.component';
import {TableSpinnerComponent} from './users-list/table-spinner/table-spinner.component';
import {AddUserModalComponent} from './users-list/add-user-modal/add-user-modal.component';
import {DeleteUserModalComponent} from './users-list/delete-user-modal/delete-user-modal.component';
import {VacancyListComponent} from './vacancy-list/vacancy-list.component';
import {RequestListComponent} from './request-list/request-list.component';
import {RequestCreationComponent} from './request-creation/request-creation.component';
import {RequestApprovalComponent} from './request-approval/request-approval.component';
import {RequestDetailComponent} from './request-detail/request-detail.component';
import {LayoutComponent} from '../../components/layout/layout.component';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotificationBubbleComponent} from '../../components/notification-bubble/notification-bubble.component';
import {SearchInputComponent} from '../../components/search-input/search-input.component';

import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    UserComponent,
    UsersListComponent,
    TableButtonComponent,
    TableSpinnerComponent,
    AddUserModalComponent,
    DeleteUserModalComponent,
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
    AgGridAngular,
    SearchInputComponent,

    MatIcon,
    MatIconModule,
    MatButtonModule,
    MatTooltip,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class UserModule { }
