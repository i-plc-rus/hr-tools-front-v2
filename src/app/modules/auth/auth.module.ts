import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {routes} from './auth.routes';
import {MatButton} from "@angular/material/button";
import {TextInputComponent} from "../../components/text-input/text-input.component";
import {DropdownDirective} from "../../directives/dropdown.directive";
import {DropdownContentDirective} from "../../directives/dropdown-content.directive";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButton,
    TextInputComponent,
    DropdownDirective,
    DropdownContentDirective,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
