import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {UsersComponent} from './users/users.component';
import {RouterModule} from '@angular/router';
import {routes} from './admin.routes';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule {
}
