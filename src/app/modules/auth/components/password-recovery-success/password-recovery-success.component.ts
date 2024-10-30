import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {TextInputComponent} from '../../../../components/text-input/text-input.component';

@Component({
  selector: 'app-password-recovery-success',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    TextInputComponent
  ],
  templateUrl: './password-recovery-success.component.html',
  styleUrl: './password-recovery-success.component.scss'
})
export class PasswordRecoverySuccessComponent {
  email?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.email = this.activatedRoute.snapshot.queryParams['email'];
  }

  goToLogin(): void {
    this.router.navigate(['/auth', 'login']);
  }
}
