import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './user.component';
import { VacancyListComponent } from './vacancy-list/vacancy-list.component';
import {RouterModule} from '@angular/router';
import {routes} from './user.routes';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestCreationComponent } from './request-creation/request-creation.component';
import { RequestApprovalComponent } from './request-approval/request-approval.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import {LayoutComponent} from '../../components/layout/layout.component';
import {SidebarComponent} from "../../components/sidebar/sidebar.component";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";



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
        MatIcon,
        MatTooltip
    ]
})
export class UserModule { }
