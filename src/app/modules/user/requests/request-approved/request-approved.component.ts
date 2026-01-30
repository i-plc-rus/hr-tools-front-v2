import { Component, inject, AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestTemplateComponent } from '../../templates/requests-templates/request-template/request-template.component';
import { MatButtonModule } from '@angular/material/button';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { VacancyModalService } from '../../../../services/vacancy-modal.service';
import { SnackBarService } from '../../../../services/snackbar.service';
import { ApiService } from '../../../../api/Api';
import {
  DictapimodelsCityView,
  DictapimodelsCompanyStructView,
  SpaceapimodelsSpaceUser,
  VacancyapimodelsVacancyRequestView
} from '../../../../api/data-contracts';

@Component({
  selector: 'app-request-approved',
  standalone: true,
  imports: [RequestTemplateComponent, MatButtonModule],
  templateUrl: './request-approved.component.html',
  styleUrl: './request-approved.component.scss'
})
export class RequestApprovedComponent implements OnInit, AfterViewInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private modalService = inject(VacancyModalService);
  private snackBarService = inject(SnackBarService);
  private api = inject(ApiService);
  private destroy$ = new Subject<void>();

  @ViewChild(RequestTemplateComponent) templateComponent!: RequestTemplateComponent;
  protected requestId!: string | null;

  // Данные для передачи в дочерний компонент
  vacancyDetails: VacancyapimodelsVacancyRequestView | null = null;
  companyStructure: DictapimodelsCompanyStructView[] = [];
  city: DictapimodelsCityView[] = [];
  user: SpaceapimodelsSpaceUser | null = null;
  users: SpaceapimodelsSpaceUser[] = [];
  isDataLoaded = false;

  ngOnInit(): void {
    this.requestId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.requestId) {
      this.loadData();
    }
  }

  private loadData(): void {
    forkJoin({
      vacancyDetails: this.api.v1SpaceVacancyRequestDetail(this.requestId!, { observe: 'response' }),
      companyStructure: this.api.v1DictCompanyStructFindCreate({}, { observe: 'response' }),
      city: this.api.v1DictCityFindCreate({}, { observe: 'response' }),
      user: this.api.v1AuthMeList({ observe: 'response' }),
      users: this.api.v1UsersListCreate({
        page: 1,
        limit: 9999,
        sort: { fio_desc: false },
      }, { observe: 'response' })
    }).pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response: any) => {
        this.vacancyDetails = response.vacancyDetails.body?.data || null;
        this.companyStructure = response.companyStructure?.body?.data || [];
        this.city = response.city?.body?.data || [];
        this.user = response.user.body?.data || null;
        this.users = response.users.body?.data || [];
        this.isDataLoaded = true;
      },
      error: (err) => {
        console.error('Ошибка при загрузке данных:', err);
        this.snackBarService.snackBarMessageError('Ошибка при загрузке данных заявки');
      }
    });
  }

  ngAfterViewInit(): void {
    if (!this.templateComponent) {
      this.snackBarService.snackBarMessageError('Ошибка загрузки заявки');
      return;
    }

    if (!this.requestId) {
      this.snackBarService.snackBarMessageError('ID заявки не найден');
      return;
    }
  }

  get isLastStep(): boolean {
    return this.templateComponent?.isLastStep ?? false;
  }

  openCreateVacancyModal(): void {
    if (!this.requestId || !this.templateComponent?.form) return;

    const form = this.templateComponent.form;
    const companyName = form.get('company_name')?.value ?? this.templateComponent.companyName ?? '';
    const vacancyName = form.get('vacancy_name')?.value ?? '';

    const structId = form.get('company_struct_id')?.value;
    const deptId = form.get('department_id')?.value;
    const jobId = form.get('job_title_id')?.value;

    const companyStructName = structId
      ? this.templateComponent.companyStructureArray.find((s) => s.id === structId)?.name ?? ''
      : '';
    const departmentName = deptId
      ? this.templateComponent.companyDepartmentArray.find((d) => d.id === deptId)?.name ?? ''
      : '';
    const jobTitleName = jobId
      ? this.templateComponent.companyJobsNamesArray.find((j) => j.id === jobId)?.name ?? ''
      : '';

    this.modalService
      .openCreateVacancyModal(
        this.requestId,
        companyName,
        vacancyName,
        companyStructName,
        departmentName,
        jobTitleName,
        true
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: boolean) => {
        if (result) {
          this.router.navigate(['/user/vacancy/list']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
