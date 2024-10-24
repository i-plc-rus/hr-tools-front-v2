import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {TextInputComponent} from '../../../components/text-input/text-input.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    ReactiveFormsModule,
    TextInputComponent
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
}
