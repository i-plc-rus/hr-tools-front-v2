import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {routes} from './user.routes';
import {AgGridAngular} from 'ag-grid-angular';
import {UserComponent} from './user.component';
import {UsersListComponent} from './users-list/users-list.component';
import {TableButtonComponent} from './users-list/table-button/table-button.component';
import {LoaderComponent} from '../../components/loader/loader.component';
import {AddUserModalComponent} from './users-list/add-user-modal/add-user-modal.component';
import {DeleteUserModalComponent} from './users-list/delete-user-modal/delete-user-modal.component';
import {VacancyListComponent} from './vacancy-list/vacancy-list.component';
import {RequestListComponent} from './request-list/request-list.component';
import {ViewCommentModalComponent} from './view-comment-modal/view-comment-modal.component';
import {RequestCreationComponent} from './request-creation/request-creation.component';
import {RequestApprovalComponent} from './request-approval/request-approval.component';
import {RequestDetailComponent} from './request-detail/request-detail.component';
import {LayoutComponent} from '../../components/layout/layout.component';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotificationBubbleComponent} from '../../components/notification-bubble/notification-bubble.component';
import {StatusTagComponent} from '../../components/status-tag/status-tag.component';
import {FilterComponent} from '../../components/filter/filter.component';
import {FilterToggleComponent} from '../../components/filter-toggle/filter-toggle.component';
import {SearchInputComponent} from '../../components/search-input/search-input.component';

import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    UserComponent,
    UsersListComponent,
    TableButtonComponent,
    AddUserModalComponent,
    DeleteUserModalComponent,
    VacancyListComponent,
    RequestListComponent,
    ViewCommentModalComponent,
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
    StatusTagComponent,
    LoaderComponent,
    FilterComponent,
    FilterToggleComponent,
    SearchInputComponent,

    MatIcon,
    MatIconModule,
    MatButtonModule,
    MatTooltip,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatExpansionModule,
  ]
})
export class UserModule { }
