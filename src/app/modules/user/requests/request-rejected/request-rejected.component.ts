import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestTemplateComponent } from '../../templates/requests-templates/request-template/request-template.component';
import { ApiService } from '../../../../api/Api';
import { SnackBarService } from '../../../../services/snackbar.service';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import {
  DictapimodelsCityView,
  DictapimodelsCompanyStructView,
  SpaceapimodelsSpaceUser,
  VacancyapimodelsVacancyRequestView
} from '../../../../api/data-contracts';

@Component({
  selector: 'app-request-rejected',
  standalone: true,
  imports: [RequestTemplateComponent],
  templateUrl: './request-rejected.component.html',
  styleUrl: './request-rejected.component.scss'
})
export class RequestRejectedComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private api = inject(ApiService);
  private snackBarService = inject(SnackBarService);
  private destroy$ = new Subject<void>();
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
