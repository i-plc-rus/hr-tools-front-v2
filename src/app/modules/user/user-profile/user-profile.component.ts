import {Component, OnInit} from '@angular/core';
import {MatChipListbox, MatChipOption} from '@angular/material/chips';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatIcon} from '@angular/material/icon';
import {AgGridAngular} from 'ag-grid-angular';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatInput, MatInputModule} from '@angular/material/input';
import {QuillEditorComponent} from 'ngx-quill';
import {ApiService} from '../../../api/Api';
import {CommonModule} from '@angular/common';
import {SpaceapimodelsSpaceUser} from '../../../api/data-contracts';
import {HttpResponse} from '@angular/common/http';
import {MatMenuItem} from '@angular/material/menu';
import {UsersModalService} from '../../../services/users-modal.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatChipOption,
    ReactiveFormsModule,
    MatChipListbox,
    MatTab,
    MatTabGroup,
    MatIcon,
    AgGridAngular,
    MatButton,
    MatFormField,
    MatSlideToggle,
    MatSelect,
    MatOption,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    QuillEditorComponent,
    MatMenuItem,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  internalNumbers: number[] = [1001, 1002, 1003, 1004];

  profileForm = new FormGroup({
    lastName: new FormControl('', [Validators.required]), // Фамилия
    firstName: new FormControl('', [Validators.required]), // Имя
    position: new FormControl(''), // Должность
    phone: new FormControl('', [Validators.required]), // Телефон
    email: new FormControl('', [Validators.required, Validators.email]), // Email
    internalNumber: new FormControl(''), // Внутренний номер
    signatureText: new FormControl(''),
    personalSignature: new FormControl(false)
  });

  userId: string | null = null;

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline'] // Жирный, курсив, подчёркнутый
    ]
  };


  constructor(private api: ApiService, private modalService: UsersModalService,
  ) {}

  ngOnInit(): void {
    this.api.v1AuthMeList().subscribe({
      next: (response) => {
        const httpResponse = response as HttpResponse<{ data: SpaceapimodelsSpaceUser }>;

        if (httpResponse.body && httpResponse.body.data) {
          const user = httpResponse.body.data;

          this.userId = user.id || null;

          this.profileForm.patchValue({
            email: user.email || '',
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            phone: user.phone_number || '',
            position: user.job_title_id || '',
            internalNumber: user.text_sign || '',
          });
        } else {
          console.warn('Данные отсутствуют в ответе.');
        }
      },
      error: (err) => {
        console.error('Ошибка получения данных пользователя:', err);
      }
    });
  }




  saveProfile(): void {
    if (this.profileForm.valid && this.userId) {
      const updateData: SpaceapimodelsSpaceUser = {
        email: this.profileForm.value.email!,
        first_name: this.profileForm.value.firstName!,
        last_name: this.profileForm.value.lastName!,
        phone_number: this.profileForm.value.phone!,
        job_title_id: this.profileForm.value.position!,
        text_sign: this.profileForm.value.internalNumber!,
      };

      this.api.v1UsersUpdate(this.userId, updateData).subscribe({
        next: () => {
          console.log('Данные пользователя успешно сохранены.');
          this.profileForm.markAsPristine();
        },
        error: (err) => {
          console.error('Ошибка сохранения данных пользователя:', err);
        }
      });
    } else {
      console.warn('Форма невалидна или отсутствует ID пользователя.');
    }
  }

  openChangePasswordModal(): void {
    this.modalService.changePasswordModal().subscribe(() => {
      console.log('Пароль успешно изменен');
    });
  }

}
