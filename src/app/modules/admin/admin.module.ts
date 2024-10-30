import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {UsersComponent} from './users/users.component';
import {RouterModule} from '@angular/router';
import {routes} from './admin.routes';
import {LayoutComponent} from '../../components/layout/layout.component';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {MatIcon} from '@angular/material/icon';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutComponent,
    SidebarComponent,
    MatIcon,
  ]
})
export class AdminModule {
}
