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
import {CellCandidateNameComponent} from '../../components/cell-candidate-name/cell-candidate-name.component';
import {CellCandidateContactsComponent} from '../../components/cell-candidate-contacts/cell-candidate-contacts.component';
import {VacancyNegotiationsComponent} from './vacancy-negotiations/vacancy-negotiations.component';
import {VacancyСandidatesComponent} from './vacancy-candidates/vacancy-candidates.component';
import {СandidateListComponent} from './candidate-list/candidate-list.component';
import {CandidateStatusComponent} from './candidate-list/candidate-status/candidate-status.component';
import {CandidateDetailComponent} from './candidate-detail/candidate-detail.component';
import {CandidateDetailInfoComponent} from './candidate-detail/candidate-detail-info/candidate-detail-info.component';
import {CandidateDuplicateComponent} from './candidate-duplicate/candidate-duplicate.component';
import {AddCandidateModalComponent} from './candidate-list/add-candidate-modal/add-candidate-modal.component';
import {RejectCandidateModalComponent} from './candidate-list/reject-candidate-modal/reject-candidate-modal.component';
import {ChangeStageModalComponent} from './candidate-list/change-stage-modal/change-stage-modal.component';
import {AddCommentModalComponent} from './candidate-detail/add-comment-modal/add-comment-modal.component';
import {NegotiationDetailComponent} from './vacancy-negotiations/negotiation-detail/negotiation-detail.component';
import {NegotiationStatusComponent} from './vacancy-negotiations/negotiation-status/negotiation-status.component';
import {TextEditorComponent} from '../../components/text-editor/text-editor.component';
import {VacancyDetailComponent} from './vacancy-detail/vacancy-detail.component';
import {VacancyDescriptionComponent} from './vacancy-detail/vacancy-description/vacancy-description.component';
import {VacancyTeamComponent} from './vacancy-detail/vacancy-team/vacancy-team.component';
import {VacancyPublicationComponent} from './vacancy-detail/vacancy-publication/vacancy-publication.component';
import {VacancyStagesComponent} from './vacancy-detail/vacancy-stages/vacancy-stages.component';
import {VacancyIntegrationsComponent} from './vacancy-detail/vacancy-integrations/vacancy-integrations.component';
import {GenerateDescriptionModalComponent} from './generate-description-modal/generate-description-modal.component';
import {TextInputComponent} from "../../components/text-input/text-input.component";
import {DropdownDirective} from "../../directives/dropdown.directive";
import {DropdownContentDirective} from "../../directives/dropdown-content.directive";
import {NgxMaskDirective, NgxMaskPipe} from 'ngx-mask';
import {PdfViewerModule} from 'ng2-pdf-viewer';

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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {UserProfileComponent} from './profile/user-profile/user-profile';
import {AccountComponent} from './profile/user-profile/profile/account/account.component';
import {ProfileComponent} from './profile/profile.component';
import {ExternalAccountsComponent} from './profile/user-profile/profile/external-accounts/external-accounts.component';
import {NotificationsComponent} from './profile/user-profile/profile/notifications/notifications.component';
import {TemplatesComponent} from './profile/user-profile/profile/templates/templates.component';
import {
  InterfaceSettingsComponent
} from './profile/user-profile/profile/interface-settings/interface-settings.component';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatCard} from '@angular/material/card';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import {CommunicationsComponent} from './profile/company-profile/sections/communications/communications.component';
import {CompanyInfoComponent} from './profile/company-profile/sections/company-info/company-info.component';
import {DirectoriesComponent} from './profile/company-profile/sections/directories/directories.component';
import {IntegrationsComponent} from './profile/company-profile/sections/integrations/integrations.component';
import {MembersComponent} from './profile/company-profile/sections/members/members.component';
import {
  CompanyTemplatesComponent
} from './profile/company-profile/sections/company-templates/company-templates.component';
import {CompanyProfileComponent} from './profile/company-profile/company-profile.component';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatToolbar} from '@angular/material/toolbar';
import {MatBadge} from '@angular/material/badge';

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
    CellCandidateNameComponent,
    CellCandidateContactsComponent,
    NegotiationDetailComponent,
    NegotiationStatusComponent,
    СandidateListComponent,
    CandidateStatusComponent,
    CandidateDetailComponent,
    CandidateDetailInfoComponent,
    CandidateDuplicateComponent,
    AddCandidateModalComponent,
    RejectCandidateModalComponent,
    ChangeStageModalComponent,
    AddCommentModalComponent,
    VacancyDetailComponent,
    VacancyDescriptionComponent,
    VacancyPublicationComponent,
    VacancyStagesComponent,
    VacancyIntegrationsComponent,
    VacancyTeamComponent,
    GenerateDescriptionModalComponent,
    UserProfileComponent,
    AccountComponent,
    ProfileComponent,
    ExternalAccountsComponent,
    NotificationsComponent,
    TemplatesComponent,
    InterfaceSettingsComponent,
    CommunicationsComponent,
    CompanyInfoComponent,
    DirectoriesComponent,
    IntegrationsComponent,
    MembersComponent,
    CompanyTemplatesComponent,
    CompanyProfileComponent

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
    NgxMaskDirective,
    NgxMaskPipe,
    PdfViewerModule,

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
    MatCheckboxModule,
    DragDropModule,
    MatRadioButton,
    MatRadioGroup,
    MatCard,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatSlideToggle,
    MatHeaderRow,
    MatRow,
    MatTableModule,
    MatToolbar,
    MatBadge
  ]

})
export class UserModule { }
