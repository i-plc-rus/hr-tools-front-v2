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
    MatTooltip
  ],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.scss'
})
export class ChangePasswordModalComponent implements OnInit {
  @Input() user?: SpaceUser;
  onSubmit = new EventEmitter<boolean>();
  isLoading = false;
  currentPasswordError: string | null = null;

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
    private api: ApiService) {}

  ngOnInit() {
    console.log('Форма создана:', this.user);
  }

  savePassword() {
    if (this.changePasswordForm.valid) {
      this.isLoading = true;
      this.currentPasswordError = null;

      const requestBody: SpaceapimodelsPasswordChange = {
        current_password: this.changePasswordForm.value.currentPassword!,
        new_password: this.changePasswordForm.value.newPassword!,
      };

      this.api.v1UserProfileChangePasswordUpdate(requestBody).subscribe({
        next: () => {
          console.log('Пароль успешно изменён');
          this.isLoading = false;
          this.closeModal();
        },
        error: (error) => {
          console.error('Ошибка изменения пароля:', error);
          this.isLoading = false;
          //ToDo: проверка на код ошибки
          this.currentPasswordError =
            'Текущий пароль указан неверно. Попробуйте снова.';
        },
      });
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
