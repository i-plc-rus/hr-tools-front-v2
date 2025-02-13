import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../../../api/Api';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrl: './company-info.component.scss'
})
export class CompanyInfoComponent implements OnInit{
  companyForm!: FormGroup;
  companyLogoPreview: string | null = null;
  timezones = [
    { id: '01', name: 'Москва' },
    { id: '02', name: 'Ижевск' },
    { id: '03', name: 'Владимир' }
  ];
  quillConfig = {
    toolbar: [['bold', 'italic', 'underline']] // Жирный, курсив, подчёркнутый
  };
  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit() {
    this.companyForm = this.fb.group({
      companyName: ['Моя компания', Validators.required],
      website: ['http://localhost:4200/user/profile/personal/notifications', Validators.required],
      timezone: ['Ижевск', Validators.required],
      description: ['']
    });
    this.loadCompanyData()  }

  saveCompanySettings() {
    if (this.companyForm.valid) {
      console.log('Сохранено:', this.companyForm.value);
    }
  }

  uploadLogo(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.companyLogoPreview = reader.result as string;
      reader.readAsDataURL(file);
    }
  }
  private loadCompanyData(): void {
    this.api.v1DictCompanyFindCreate({}).subscribe({
      next: (response) => {
          console.log('Респонс компании:', response);
      },
      error: (err) => console.error('Респонс с ошибкой:', err)
    });
  }


}
