import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {routes} from './auth.routes';
import { OrgRegistrationComponent } from './org-registration/org-registration.component';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {TextInputComponent} from "../../components/text-input/text-input.component";
import {DropdownDirective} from "../../directives/dropdown.directive";
import {DropdownContentDirective} from "../../directives/dropdown-content.directive";



@NgModule({
  declarations: [
    LoginComponent,
    OrgRegistrationComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButton,
        MatIcon,
        TextInputComponent,
        DropdownDirective,
        DropdownContentDirective
    ]
})
export class AuthModule { }
