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
import {QuillModule} from 'ngx-quill';
import {StatusTagComponent} from '../../components/status-tag/status-tag.component';
import {FilterComponent} from '../../components/filter/filter.component';
import {FilterToggleComponent} from '../../components/filter-toggle/filter-toggle.component';
import {SearchInputComponent} from '../../components/search-input/search-input.component';
import {TableCandidateNameComponent} from './table-candidate-name/table-candidate-name.component';
import {VacancyNegotiationsComponent} from './vacancy-negotiations/vacancy-negotiations.component';
import {VacancyСandidatesComponent} from './vacancy-candidates/vacancy-candidates.component';
import {CandidateDetailComponent} from './candidate-detail/candidate-detail.component';
import {NegotiationDetailComponent} from './vacancy-negotiations/negotiation-detail/negotiation-detail.component';
import {NegotiationStatusComponent} from './vacancy-negotiations/negotiation-status/negotiation-status.component';
import {TextEditorComponent} from '../../components/text-editor/text-editor.component';
import {VacancyDetailComponent} from './vacancy-detail/vacancy-detail.component';
import {GenerateDescriptionModalComponent} from './generate-description-modal/generate-description-modal.component';
import {TextInputComponent} from "../../components/text-input/text-input.component";
import {DropdownDirective} from "../../directives/dropdown.directive";
import {DropdownContentDirective} from "../../directives/dropdown-content.directive";

import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';

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
    VacancyNegotiationsComponent,
    VacancyСandidatesComponent,
    TableCandidateNameComponent,
    NegotiationDetailComponent,
    NegotiationStatusComponent,
    CandidateDetailComponent,
    VacancyDetailComponent,
    GenerateDescriptionModalComponent,
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
    QuillModule.forRoot(),
    StatusTagComponent,
    LoaderComponent,
    FilterComponent,
    FilterToggleComponent,
    SearchInputComponent,
    TextEditorComponent,
    TextInputComponent,
    DropdownDirective,
    DropdownContentDirective,

    MatIcon,
    MatIconModule,
    MatButtonModule,
    MatTooltip,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatExpansionModule,
    MatTabsModule,
    MatDatepickerModule,
]

})
export class UserModule { }
