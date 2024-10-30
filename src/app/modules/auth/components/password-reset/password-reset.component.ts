import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TextInputComponent} from "../../../../components/text-input/text-input.component";
import {matchValidator} from '../../../../validators/match';

@Component({
  selector: 'app-password-reset',
  standalone: true,
    imports: [
        MatButton,
        MatIcon,
        ReactiveFormsModule,
        TextInputComponent
    ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  form: FormGroup;

  constructor(
  ) {
    this.form = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        matchValidator('password_confirm', true)
      ]),
      password_confirm: new FormControl('', [Validators.required, matchValidator('password')]),
    })
  }

  resetPassword() {
    // todo Пока нет эндпоинта на сброс пароля
    console.log('resetPassword');
  }
}
