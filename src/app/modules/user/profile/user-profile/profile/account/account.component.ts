import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {UsersModalService} from '../../../../../../services/users-modal.service';
import {SpaceapimodelsSpaceUserProfileView} from '../../../../../../api/data-contracts';
import {ApiService} from '../../../../../../api/Api';
import {LoadingWrapperService} from '../../../services/loading-wrapper.service';
import {SnackBarService} from '../../../../../../services/snackbar.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput!: ElementRef;

  profileForm = new FormGroup({
    last_name: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    job_title_name: new FormControl(''),
    job_title_id: new FormControl(''),
    phone_number: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    internal_phone_number: new FormControl('', [Validators.min(0)]),
    text_sign: new FormControl(''),
    use_personal_sign: new FormControl(false)
  });

  userId: string | null = null;
  userPhoto: string | null = null;
  userPhotoPreview: string | null = null;

  quillConfig = {toolbar: [['bold', 'italic', 'underline']]};

  constructor(
    private api: ApiService,
    private modalService: UsersModalService,
    private loadingService: LoadingWrapperService,
    private snackBar: SnackBarService
  ) {
  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadUserPhoto();
  }

  private loadUserData(): void {
    this.loadingService.setLoading(true);
    this.api.v1UserProfileList().subscribe({
      next: (response) => this.handleUserResponse(response),
      error: (err) => this.handleError(err, 'Ошибка при загрузке данных')
    });
  }

  private loadUserPhoto(): void {
    this.api.v1UserProfilePhotoList({responseType: 'blob' as 'json'}).subscribe({
      next: (response: any) => {
        if (response instanceof Blob) {
          if(response.size > 0) {
            const reader = new FileReader();
            reader.onload = () => (this.userPhoto = reader.result as string);
            reader.readAsDataURL(response);
          }
        } else {
          this.logWarning(response)
        }
      },
      error: (err) => this.handleError(err, 'Ошибка загрузки фото')
    });
  }

  saveProfile(): void {
    if (this.profileForm.valid && this.userId) {
      this.api.v1UserProfileUpdate(this.userId, this.getUserUpdateData()).subscribe({
        next: () => this.handleProfileResponse(),
        error: (err) => this.handleError(err, '')
      });
    } else {
      this.logWarning('Форма невалидна');
    }
  }


  uploadPhoto(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input?.files?.length) {
      this.logWarning('Файл не выбран')
      return;
    }
    const file = input.files[0];
    this.generatePhotoPreview(file);
    this.uploadPhotoToServer(file);

  }

  private handleUserResponse(response: any): void {
    const user = this.extractUserData(response);
    if (!user) return;
    this.userId = user.id || null;
    this.updateProfileForm(user);
    this.loadingService.setLoading(false);
  }

  private handleProfileResponse(): void {
    this.profileForm.markAsPristine();
    this.handleSuccessfulAction('Данные сохранены')
  }

  private extractUserData(response: HttpResponse<{ data: SpaceapimodelsSpaceUserProfileView }>): SpaceapimodelsSpaceUserProfileView | null {
    const user = response.body?.data;
    if (!user) {
      this.loadingService.setLoading(false);
      return null;
    }
    return user;
  }
  private updateProfileForm(user: SpaceapimodelsSpaceUserProfileView): void {
    this.profileForm.patchValue({
      last_name: user.last_name,
      first_name:user.first_name,
      job_title_name: user.job_title_name,
      job_title_id: '',
      phone_number: user.phone_number,
      email: user.email,
      internal_phone_number: user.internal_phone_number,
      text_sign: user.text_sign,
      use_personal_sign: user.use_personal_sign
    });
  }

  private getUserUpdateData(): SpaceapimodelsSpaceUserProfileView {
    return {
      email: this.profileForm.value.email ?? '',
      first_name: this.profileForm.value.first_name ?? '',
      last_name: this.profileForm.value.last_name ?? '',
      phone_number: this.profileForm.value.phone_number ?? '',
      internal_phone_number: this.profileForm.value.internal_phone_number ?? '',
      text_sign: this.profileForm.value.text_sign ?? '',
      use_personal_sign: this.profileForm.value.use_personal_sign ?? false
    };
  }

  private generatePhotoPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => (this.userPhotoPreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  private uploadPhotoToServer(file: File): void {
    const formData = new FormData();
    formData.append('photo', file);
    this.api.v1UserProfilePhotoCreate(formData as any).subscribe({
      next: () => {
        this.loadUserPhoto()
        this.handleSuccessfulAction('Фото загружено')

      },
      error: (err) => this.handleError(err, 'Ошибка загрузки фото!')
    });
  }

  openChangePasswordModal(): void {
    this.modalService.changePasswordModal().subscribe(() => this.handleSuccessfulAction('Пароль изменён!'));
  }


  // Тут можно вывести всплывашки с предупреждениями
  private handleError(err: any, message: string): void {
    this.snackBar.snackBarMessageError(message)
    this.loadingService.setLoading(false);
  }

  private logWarning(message: string): void {
    this.snackBar.snackBarMessageWarning(message)
  }

  private handleSuccessfulAction(message: string): void {
    this.snackBar.snackBarMessageSuccess(message)
  }
}
