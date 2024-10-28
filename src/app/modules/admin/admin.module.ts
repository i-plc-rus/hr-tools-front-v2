import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {UsersComponent} from './users/users.component';
import {RouterModule} from '@angular/router';
import {routes} from './admin.routes';
import {LayoutComponent} from '../../components/layout/layout.component';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {AddUserModalComponent} from './users/add-user-modal/add-user-modal.component';
import {DeleteUserModalComponent} from './users/delete-user-modal/delete-user-modal.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgGridAngular} from 'ag-grid-angular';
import {TableButtonComponent} from './users/table-button/table-button.component';
import {TableSpinnerComponent} from './users/table-spinner/table-spinner.component';

import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    TableButtonComponent,
    TableSpinnerComponent,
    AddUserModalComponent,
    DeleteUserModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutComponent,
    SidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    AgGridAngular,

    MatIcon,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatTooltip,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class AdminModule {
}
