import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TextInputComponent} from '../../../../components/text-input/text-input.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    TextInputComponent
  ],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})
export class PasswordRecoveryComponent {
  form: FormGroup;

  constructor(
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  sendRecoveryRequest() {
    // todo Пока нет эндпоинта на сброс пароля
    this.router.navigate(['/auth', 'password-recovery-success'], {
      queryParams: this.form.getRawValue(),
    })
  }

  goBackToAuth() {
    this.router.navigate(['/auth', 'login'],)
  }
}
