import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit} from '@angular/core';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {MatTooltip} from '@angular/material/tooltip';
import {CommonModule} from '@angular/common';
import {matchValidator} from '../../../../../validators/match';
import {UsersModalService} from '../../../../../services/users-modal.service';
import {ApiService} from '../../../../../api/Api';
import {SpaceapimodelsPasswordChange} from '../../../../../api/data-contracts';
import {SpaceUser} from '../../../../../models/SpaceUser';
import {TextInputComponent} from '../../../../../components/text-input/text-input.component';
import {SnackBarService} from '../../../../../services/snackbar.service';

@Component({
  selector: 'app-change-password-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatFormField,
    ReactiveFormsModule,
    MatButton,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatSuffix,
    MatTooltip,
    TextInputComponent
  ],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.scss'
})
export class ChangePasswordModalComponent implements OnInit {
  @Input() user?: SpaceUser;
  onSubmit = new EventEmitter<boolean>();

  isLoading = false;
  currentPasswordError: string | null = null;
  isOldPasswordVisible = false;
  isNewPasswordVisible = false;
  isNewCopyPasswordVisible = false;

  changePasswordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      matchValidator('confirmPassword', true),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      matchValidator('newPassword'),
    ]),
  });

  constructor(
    private modalService: UsersModalService,
    private api: ApiService,
    private snackBarService: SnackBarService,
  ) {}

  ngOnInit() {
  }

  savePassword(): void {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const currentPassword = this.changePasswordForm.get('currentPassword')?.value ?? '';
    const newPassword = this.changePasswordForm.get('newPassword')?.value ?? '';

    this.isLoading = true;
    this.currentPasswordError = null;

    const requestBody: SpaceapimodelsPasswordChange = {
      current_password: currentPassword,
      new_password: newPassword,
    };

    this.api.v1UserProfileChangePasswordUpdate(requestBody).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBarService.snackBarMessageSuccess('Пароль успешно изменён!');
        this.closeModal();
      },
      error: (error) => {
        this.isLoading = false;
        this.currentPasswordError = 'Текущий пароль указан неверно.';
      }
    });
  }

  closeModal(): void {
    this.modalService.closeModal();
  }
}
