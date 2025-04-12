import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {UsersModalService} from '../../../../../../services/users-modal.service';
import {SpaceapimodelsSpaceUserProfileView} from '../../../../../../api/data-contracts';
import {ApiService} from '../../../../../../api/Api';
import {LoadingWrapperService} from '../../../services/loading-wrapper.service';
import {SnackBarService} from '../../../../../../services/snackbar.service';
import {forkJoin, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

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
  jobTitles: any[] = [];
  departments: any[] = [];
  jobTitlesLoaded = false;
  isJobTitlesLoading = false;

  constructor(
    private api: ApiService,
    private modalService: UsersModalService,
    private loadingService: LoadingWrapperService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadUserPhoto();
    this.loadCachedJobTitles();

    this.profileForm.get('job_title_id')?.valueChanges.subscribe(value => {
      if (value) {
        this.profileForm.markAsDirty();
      }
    });
  }

  private loadCachedJobTitles(): void {
    try {
      const cachedJobTitles = localStorage.getItem('cachedJobTitles');
      if (cachedJobTitles) {
        this.jobTitles = JSON.parse(cachedJobTitles);
        this.jobTitlesLoaded = true;
        this.syncJobTitleIdWithName();
      }
    } catch (err) {}
  }

  private cacheJobTitles(): void {
    try {
      if (this.jobTitles.length > 0) {
        localStorage.setItem('cachedJobTitles', JSON.stringify(this.jobTitles));
      }
    } catch (err) {}
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
      const userData = this.getUserUpdateData();

      this.api.v1UserProfileUpdate(this.userId, userData).subscribe({
        next: () => {
          this.handleProfileResponse();

          this.saveJobTitleToLocalStorage(
            this.profileForm.get('job_title_name')?.value,
            this.profileForm.get('job_title_id')?.value
          );
        },
        error: (err) => {
          this.handleError(err, 'Ошибка при сохранении данных');
        }
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

  loadAllJobTitles(): void {
    if (this.jobTitlesLoaded) {
      return;
    }

    if (this.isJobTitlesLoading) {
      return;
    }

    this.isJobTitlesLoading = true;

    if (this.departments.length === 0) {
      this.api.v1DictDepartmentFindCreate({}, {observe: 'response'}).subscribe({
        next: (data) => {
          if (data.body?.data) {
            this.departments = data.body.data;
            this.fetchJobTitlesFromDepartments();
          } else {
            this.isJobTitlesLoading = false;
          }
        },
        error: () => {
          this.isJobTitlesLoading = false;
        }
      });
    } else {
      this.fetchJobTitlesFromDepartments();
    }
  }

  private fetchJobTitlesFromDepartments(): void {
    const requests = this.departments.map(dept => {
      const params = {
        department_id: dept.id
      };

      return this.api.v1DictJobTitleFindCreate(params, {observe: 'response'}).pipe(
        map(response => response.body?.data || []),
        catchError(() => of([]))
      );
    });

    forkJoin(requests).subscribe({
      next: results => {
        const allJobTitles: any[] = [];
        const uniqueIds = new Set();

        results.forEach(jobsArr => {
          jobsArr.forEach((job: any) => {
            if (!uniqueIds.has(job.id)) {
              uniqueIds.add(job.id);
              allJobTitles.push(job);
            }
          });
        });

        this.jobTitles = allJobTitles;
        this.jobTitlesLoaded = true;
        this.isJobTitlesLoading = false;

        this.cacheJobTitles();
        this.syncJobTitleIdWithName();
      },
      error: () => {
        this.isJobTitlesLoading = false;
      }
    });
  }

  private syncJobTitleIdWithName(): void {
    const jobTitleName = this.profileForm.get('job_title_name')?.value;
    if (jobTitleName) {
      const matchingJob = this.jobTitles.find(job => job.name === jobTitleName);
      if (matchingJob) {
        this.profileForm.get('job_title_id')?.setValue(matchingJob.id);
      } else {
        const savedId = this.getJobTitleIdFromLocalStorage(jobTitleName);
        if (savedId) {
          this.profileForm.get('job_title_id')?.setValue(savedId);
        }
      }
    }
  }

  jobTitleSelectionChange(jobTitleId: string): void {
    if (!jobTitleId) return;

    const selectedJob = this.jobTitles.find(job => job.id === jobTitleId);
    if (selectedJob) {
      this.profileForm.get('job_title_name')?.setValue(selectedJob.name);
      this.saveJobTitleToLocalStorage(selectedJob.name, jobTitleId);


      this.profileForm.markAsDirty();
    }
  }

  private handleUserResponse(response: any): void {
    const user = this.extractUserData(response);
    if (!user) return;
    this.userId = user.id || null;
    this.updateProfileForm(user);
    this.loadingService.setLoading(false);

    if (user.job_title_name) {
      if (this.jobTitlesLoaded) {
        this.syncJobTitleIdWithName();
      } else {
        const savedId = this.getJobTitleIdFromLocalStorage(user.job_title_name);
        if (savedId) {
          this.profileForm.get('job_title_id')?.setValue(savedId);
        }
      }
    }

    this.profileForm.markAsPristine();
  }

  private handleProfileResponse(): void {
    this.profileForm.markAsPristine();
    this.handleSuccessfulAction('Данные сохранены');
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
      first_name: user.first_name,
      job_title_name: user.job_title_name,
      job_title_id: '',
      phone_number: user.phone_number,
      email: user.email,
      internal_phone_number: user.internal_phone_number,
      text_sign: user.text_sign,
      use_personal_sign: user.use_personal_sign
    });
  }

  private getUserUpdateData(): any {
    const formData = this.profileForm.value;

    const userData: any = {
      email: formData.email ?? '',
      first_name: formData.first_name ?? '',
      last_name: formData.last_name ?? '',
      job_title_name: formData.job_title_name ?? '',
      phone_number: formData.phone_number ?? '',
      internal_phone_number: formData.internal_phone_number ?? '',
      text_sign: formData.text_sign ?? '',
      use_personal_sign: formData.use_personal_sign ?? false
    };

    if (formData.job_title_id) {
      userData.job_title_id = formData.job_title_id;
    }

    return userData;
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

  private saveJobTitleToLocalStorage(jobTitleName: string | undefined | null, jobTitleId: string | undefined | null): void {
    if (!jobTitleName || !jobTitleId) return;

    try {
      const savedJobTitles = localStorage.getItem('jobTitles');
      let jobTitlesMap: Record<string, string> = {};

      if (savedJobTitles) {
        jobTitlesMap = JSON.parse(savedJobTitles);
      }

      jobTitlesMap[jobTitleName] = jobTitleId;

      localStorage.setItem('jobTitles', JSON.stringify(jobTitlesMap));
    } catch (error) {}
  }

  private getJobTitleIdFromLocalStorage(jobTitleName: string | undefined | null): string | null {
    if (!jobTitleName) return null;

    try {
      const savedJobTitles = localStorage.getItem('jobTitles');
      if (savedJobTitles) {
        const jobTitlesMap = JSON.parse(savedJobTitles);
        if (jobTitlesMap[jobTitleName]) {
          return jobTitlesMap[jobTitleName];
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  }

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
