import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { VacancyModalService } from '../../../services/vacancy-modal.service';
import { ApiService } from '../../../api/Api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-create-vacancy-modal',
  templateUrl: './request-create-vacancy-modal.component.html',
  styleUrl: './request-create-vacancy-modal.component.scss'
})
export class RequestCreateVacancyModalComponent implements OnInit {
  @Input() requestId?: string;
  @Input() companyName?: string;
  @Input() vacancyName?: string;
  @Input() companyStructName?: string;
  @Input() departmentName?: string;
  @Input() jobTitleName?: string;
  @Input() showNumber?: boolean;
  @Output() onSubmit = new EventEmitter<boolean>();

  isLoading = false;
  requestNumber: boolean | undefined = false;
  form = new FormGroup({
    company_name: new FormControl({ value: '', disabled: true }),
    vacancy_name: new FormControl({ value: '', disabled: true }),
    company_struct_name: new FormControl({ value: '', disabled: true }),
    department_name: new FormControl({ value: '', disabled: true }),
    job_title_name: new FormControl({ value: '', disabled: true }),
  });

  constructor(
    private modalService: VacancyModalService,
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.companyName) {
      this.form.controls.company_name.setValue(this.companyName);
    }
    if (this.vacancyName) {
      this.form.controls.vacancy_name.setValue(this.vacancyName);
    }
    if (this.companyStructName) {
      this.form.controls.company_struct_name.setValue(this.companyStructName);
    }
    if (this.departmentName) {
      this.form.controls.department_name.setValue(this.departmentName);
    }
    if (this.jobTitleName) {
      this.form.controls.job_title_name.setValue(this.jobTitleName);
    }
    this.requestNumber = this.showNumber;
  }

  closeModal() {
    this.modalService.closeModal();
  }

  navigateToRequest() {
    this.router.navigate(['/user/request', this.requestId, 'approval']);
    this.closeModal();
  }

  createVacancy() {
    if (!this.requestId) return;
    
    this.isLoading = true;
    this.api.v1SpaceVacancyRequestPublishUpdate(this.requestId).subscribe({
      next: (res) => {
        console.log(res);
        this.onSubmit.emit(true);
        this.isLoading = false;
        this.closeModal();
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }
}
