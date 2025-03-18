import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../../../api/Api';
import {TokenService} from '../../../../services/token.service';
import {TextInputComponent} from '../../../../components/text-input/text-input.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {SnackBarService} from '../../../../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    TextInputComponent,
    ReactiveFormsModule,
    MatIcon,
    MatButton
  ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private tokenService: TokenService,
    private snackBarService: SnackBarService
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    if (this.tokenService.refreshToken) {
      this.router.navigate(['/user']);
    }
  }

  login() {
    this.loading = true;
    this.api.v1AuthLoginCreate(this.form.getRawValue())
      .subscribe({
        next: (response: any) => {
          console.log(response.body.data);
          this.loading = false;
          this.tokenService.updateToken(response.body.data.token, response.body.data.refresh_token);
          this.router.navigate(['/user']);
        },
        error: (err) => {
          this.loading = false
          this.snackBarService.snackBarMessageError('Ошибка авторизации: неверный логин или пароль')
        }
      })
  }

  recoveryPassword() {
    this.router.navigate(['/auth', 'password-recovery']);
  }

}
