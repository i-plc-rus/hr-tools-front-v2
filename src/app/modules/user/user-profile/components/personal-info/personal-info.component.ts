import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelect, MatOption } from '@angular/material/select';
import { ApiService } from '../../../../../api/Api';
import { UsersModalService } from '../../../../../services/users-modal.service';
import { HttpResponse } from '@angular/common/http';
import { DictapimodelsCompanyView, DictapimodelsJobTitleData, SpaceapimodelsSpaceUser } from '../../../../../api/data-contracts';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButton, MatSelect, MatOption
  ],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  profileForm = new FormGroup({
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    job_title_id: new FormControl(''),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    internalNumber: new FormControl(''),
    signatureText: new FormControl(''),
    personalSignature: new FormControl(false)
  });
  userId: string | null = null;
  userPhoto: string | null = null;
  userPhotoPreview: string | null = null;
  jobTitles: { id: string; name: string }[] = [];

  constructor(private api: ApiService, private modalService: UsersModalService) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadUserPhoto();
    this.loadJobTitles();
  }

  private loadUserData(): void {
    this.api.v1AuthMeList().subscribe({
      next: (response) => {
        const httpResponse = response as HttpResponse<{ data: SpaceapimodelsSpaceUser }>;
        if (httpResponse.body?.data) {
          const user = httpResponse.body.data;
          this.userId = user.id || null;
          this.profileForm.patchValue({
            email: user.email || '',
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            phone: user.phone_number || '',
            internalNumber: user.text_sign || '',
            job_title_id: user.job_title_id || ''
          });
        } else {
          console.warn('Данные отсутствуют в ответе.');
        }
      },
      error: (err) => console.error('Ошибка получения данных пользователя:', err)
    });
  }

  saveProfile(): void {
    if (this.profileForm.valid && this.userId) {
      const updateData: SpaceapimodelsSpaceUser = {
        email: this.profileForm.value.email!,
        first_name: this.profileForm.value.firstName!,
        last_name: this.profileForm.value.lastName!,
        phone_number: this.profileForm.value.phone!,
        job_title_id: this.profileForm.value.job_title_id!,
        text_sign: this.profileForm.value.internalNumber!
      };
      this.api.v1UsersUpdate(this.userId, updateData).subscribe({
        next: () => {
          console.log('Данные пользователя успешно сохранены.');
          this.profileForm.markAsPristine();
        },
        error: (err) => console.error('Ошибка сохранения данных пользователя:', err)
      });
    } else {
      console.warn('Форма невалидна или отсутствует ID пользователя.');
    }
  }

  uploadPhoto(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input?.files?.length) {
      console.warn('Файл не выбран.');
      return;
    }
    const file = input.files[0];
    this.generatePhotoPreview(file);
    this.uploadPhotoToServer(file);
  }

  private generatePhotoPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) this.userPhotoPreview = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }

  private uploadPhotoToServer(file: File): void {
    const formData = new FormData();
    formData.append('photo', file);
    this.api.v1UserProfilePhotoCreate(formData as any).subscribe({
      next: () => {
        console.log('Фото успешно загружено.');
        this.loadUserPhoto();
      },
      error: (err) => console.error('Ошибка загрузки фото:', err)
    });
  }

  private loadUserPhoto(): void {
    this.api.v1UserProfilePhotoList({ responseType: 'blob' as 'json' }).subscribe({
      next: (response: any) => {
        if (response instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => (this.userPhoto = reader.result as string);
          reader.readAsDataURL(response);
        } else {
          console.warn('API вернул неожиданные данные:', response);
        }
      },
      error: (err) => console.error('Ошибка загрузки фото:', err)
    });
  }

  private loadJobTitles(): void {
    this.api.v1DictJobTitleFindCreate({ department_id: '', name: '' }).subscribe({
      next: (response) => {
        if (response?.data) {
          this.jobTitles = response.data.filter(
            (job: DictapimodelsCompanyView): job is { id: string; name: string } => !!job.id && !!job.name
          );
        } else {
          console.warn('API вернул пустой список должностей.');
        }
      },
      error: (err) => console.error('Ошибка загрузки списка должностей:', err)
    });
  }

  openChangePasswordModal(): void {
    this.modalService.changePasswordModal().subscribe(() => console.log('Пароль успешно изменен'));
  }
}
