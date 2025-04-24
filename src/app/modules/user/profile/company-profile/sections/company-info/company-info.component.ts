import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../../api/Api';
import {LoadingWrapperService} from '../../../services/loading-wrapper.service';
import {SnackBarService} from '../../../../../../services/snackbar.service';
import {TIMEZONES} from './timezones';
import {first} from 'rxjs';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss'
})
export class CompanyInfoComponent implements OnInit {
  companyForm!: FormGroup;
  companyLogoPreview: string | null = null;
  quillConfig = {
    toolbar: [['bold', 'italic', 'underline']] // Жирный, курсив, подчёркнутый
  };

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  timezones = TIMEZONES;
  constructor(private fb: FormBuilder,
              private api: ApiService,
              private cdr: ChangeDetectorRef,
              private loadingService: LoadingWrapperService,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.initForm();
    this.loadCompanyData();
    this.loadCompanyLogo()
  }

  private initForm(): void {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      website: ['', Validators.required],
      timezone: [{value: ''}],
      description: ['']
    });
  }

  private loadCompanyData(): void {
    this.loadingService.setLoading(true)
    this.api.v1SpaceProfileList({observe: 'response'}).subscribe({
      next: (response) => this.handleCompanyResponse(response),
      error: (err) => this.handleError(err, 'Ошибка загрузки данных компании!')
    });
  }

  /** Загружает текущий логотип компании */
  private loadCompanyLogo(): void {
    this.api.v1SpaceProfilePhotoList({responseType: 'blob' as 'json'}).subscribe({
      next: (response: any) => {
        if (response instanceof Blob) {
          if (response.size > 0) {
            const reader = new FileReader();
            reader.onload = () => (this.companyLogoPreview = reader.result as string);
            reader.readAsDataURL(response);
          }
        } else {
          console.warn(response);
        }
      },
      error: (err) => console.error(err)
    });
  }


  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  uploadPhoto(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input?.files?.length) {
      this.snackBar.snackBarMessageInfo('Файл не выбран.')
      return;
    }

    const file = input.files[0];
    this.generatePhotoPreview(file);
    this.uploadPhotoToServer(file);
  }

  private generatePhotoPreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => (this.companyLogoPreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  private uploadPhotoToServer(file: File): void {
    const formData = new FormData();
    formData.append('photo', file);

    this.api.v1SpaceProfilePhotoCreate(formData as any).subscribe({
      next: () => {
        this.loadCompanyLogo();
      },
      error: (err) => this.handleError(err,'Ошибка загрузки фото на сервер')
    });
  }

  saveCompanySettings(): void {
    if (this.companyForm.invalid) {
      this.snackBar.snackBarMessageWarning('Ошибки в форме.')
      return;
    }

    const updatedData = {
      organization_name: this.companyForm.get('companyName')?.value || '',
      web: this.companyForm.get('website')?.value || '',
      time_zone: this.companyForm.get('timezone')?.value || '',
      description: this.companyForm.get('description')?.value || ''
    };

    this.api.v1SpaceProfileUpdate(updatedData, {observe: 'response'}).subscribe({
      next: (response) => this.handleUpdateResponse(response),
      error: (err) => this.handleError(err, 'Ошибка обновления данных компании!')
    });
  }

  private handleUpdateResponse(response: any): void {
    this.snackBar.snackBarMessageSuccess('Данные компании успешно обновлены')
    this.companyForm.markAsPristine();
  }


  private handleCompanyResponse(response: any): void {
    const responseBody = 'body' in response ? response.body : response;

    if (responseBody?.data) {
      this.companyForm.setValue({
        companyName: responseBody.data.organization_name || '',
        website: responseBody.data.web || '',
        timezone: responseBody.data.time_zone || '',
        description: responseBody.data.description || ''
      });

      this.companyForm.get('description')?.valueChanges
        .pipe(first())
        .subscribe(() => {
          this.companyForm.get('description')?.markAsPristine();
        });

      this.companyForm.markAsPristine();

      this.cdr.detectChanges();
      this.loadingService.setLoading(false);
    } else {
      this.snackBar.snackBarMessageWarning('Нет данных');
    }
  }

  private handleError(err: any, message: string): void {
    this.snackBar.snackBarMessageError(message);
  }


}
