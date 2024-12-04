import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
  ModelsApplicantSource,
  ModelsDriverLicenseType,
  ModelsEducationType,
  ModelsEmployment,
  ModelsExperienceType,
  ModelsGenderType,
  ModelsLanguageLevelType,
  ModelsResponsePeriodType,
  ModelsSchedule,
  ModelsSearchLabelType,
  ModelsSearchStatusType,
  ModelsTripReadinessType,
  DbmodelsNegotiationFilter,
  ModelsNegotiationStatus,
} from '../../../api/data-contracts';
import {ApiService} from '../../../api/Api';
import {NegotiationView} from '../../../models/Negotiation';
import {CellClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, ValueFormatterParams, ValueGetterParams} from 'ag-grid-community';
import {LoaderComponent} from '../../../components/loader/loader.component';
import {MockDataService} from '../../../services/mock-data.service';
import {TableCandidateNameComponent} from '../table-candidate-name/table-candidate-name.component';
import {ActivatedRoute} from '@angular/router';
import {NegotiationStatusComponent} from './negotiation-status/negotiation-status.component';


@Component({
  selector: 'app-vacancy-negotiations',
  templateUrl: './vacancy-negotiations.component.html',
  styleUrl: './vacancy-negotiations.component.scss',
})
export class VacancyNegotiationsComponent {
  // фильтр
  filterForm = new FormGroup({
    /** Водительсике права */
    driver_licence: new FormControl<ModelsDriverLicenseType[] | undefined>(undefined),
    /** Образование */
    education: new FormControl<ModelsEducationType | undefined>(undefined),
    /** Опыт */
    experience: new FormControl<ModelsExperienceType | undefined>(undefined),
    /** Занятость */
    employment: new FormControl<ModelsEmployment | undefined>(undefined),
    /** Пол кандидата */
    gender: new FormControl<ModelsGenderType | undefined>(undefined),
    /** График работы */
    schedule: new FormControl<ModelsSchedule | undefined>(undefined),
    /** Источник */
    source: new FormControl<ModelsApplicantSource | undefined>(undefined),
    /** Уровень знания языка */
    language_level: new FormControl<ModelsLanguageLevelType | undefined>(undefined),
    /** Период отклика на вакансию */
    response_period: new FormControl<ModelsResponsePeriodType | undefined>(undefined),
    /** Метка поиска резюме */
    search_label: new FormControl<ModelsSearchLabelType | undefined>(undefined),
    /** Статус поиска работы */
    job_search_statuses: new FormControl<ModelsSearchStatusType | undefined>(undefined),
    trip_readiness: new FormControl<ModelsTripReadinessType | undefined>(undefined),
    /** Уровень дохода */
    salary_from: new FormControl<number | undefined>(undefined),
    salary_to: new FormControl<number | undefined>(undefined),
    /** Указан доход */
    salary_provided: new FormControl<boolean | undefined>(undefined),
    /** Повышение квалификации, курсы */
    advanced_training: new FormControl<boolean | undefined>(undefined),
    language: new FormControl<string>(''),
    city: new FormControl(''),
    citizenship: new FormControl(''),
    /** поиск по ФИО/телефон/емайл */
    search: new FormControl(''),
    vacancy_id: new FormControl(''),
  });
  driverLicenseTypes = Object.values(ModelsDriverLicenseType);
  applicantSources = Object.values(ModelsApplicantSource);
  responsePeriodTypes = Object.values(ModelsResponsePeriodType);
  educationTypes: {label: string, value: ModelsEducationType}[] = [
    {label: 'Среднее', value: ModelsEducationType.EducationTypeSecondary},
    {label: 'Среднее профессиональное', value: ModelsEducationType.EducationTypeSpecialSecondary},
    {label: 'Незаконченное высшее', value: ModelsEducationType.EducationTypeUnfinishedHigher},
    {label: 'Высшее', value: ModelsEducationType.EducationTypeHigher},
    {label: 'Бакалавр', value: ModelsEducationType.EducationTypeBachelor},
    {label: 'Магистр', value: ModelsEducationType.EducationTypeMaster},
    {label: 'Кандидат наук', value: ModelsEducationType.EducationTypeCandidate},
    {label: 'Доктор наук', value: ModelsEducationType.EducationTypeDoctor},
  ];
  experienceTypes: {label: string, value: ModelsExperienceType}[] = [
    {label: 'Нет опыта', value: ModelsExperienceType.ExperienceTypeNo},
    {label: 'От 1 до 3 лет', value: ModelsExperienceType.ExperienceTypeBetween1And3},
    {label: 'От 3 до 6 лет', value: ModelsExperienceType.ExperienceTypeBetween3And6},
    {label: 'Более 6 лет', value: ModelsExperienceType.ExperienceTypeMoreThan6},
  ];
  scheduleTypes: {label: string, value: ModelsSchedule}[] = [
    {label: 'Полный день', value: ModelsSchedule.ScheduleFullDay},
    {label: 'Неполная занятость', value: ModelsSchedule.SchedulePartTime},
    {label: 'Гибкий график', value: ModelsSchedule.ScheduleFlexible},
    {label: 'Сменный график', value: ModelsSchedule.ScheduleShift},
    {label: 'Вахтовый метод', value: ModelsSchedule.ScheduleFlyInFlyOut},
  ];
  searchLabelTypes: {label: string, value: ModelsSearchLabelType}[] = [
    {label: 'С фотографией', value: ModelsSearchLabelType.SearchLabelPhoto},
    {label: 'Указана зарплатой', value: ModelsSearchLabelType.SearchLabelSalary},
    {label: 'Указан возраст', value: ModelsSearchLabelType.SearchLabelAge},
    {label: 'Указан пол', value: ModelsSearchLabelType.SearchLabelGender},
  ];
  searchStatusTypes: {label: string, value: ModelsSearchStatusType}[] = [
    {label: 'Активно ищет работу', value: ModelsSearchStatusType.SearchStatusActive},
    {label: 'Рассматривает предложения', value: ModelsSearchStatusType.SearchStatusLookingForOffers},
    {label: 'Не ищет работу', value: ModelsSearchStatusType.SearchStatusNotLookingForJob},
    {label: 'Предложили работу, решает', value: ModelsSearchStatusType.SearchStatusHasJobOffer},
    {label: 'Вышел на новое место', value: ModelsSearchStatusType.SearchStatusAcceptedJobOffer},
  ];
  genderTypes: {label: string, value: ModelsGenderType}[] = [
    {label: 'Мужской', value: ModelsGenderType.GenderTypeM},
    {label: 'Женский', value: ModelsGenderType.GenderTypeF},
  ];
  employmentTypes: {label: string, value: ModelsEmployment}[] = [
    {label: 'Полная занятость', value: ModelsEmployment.EmploymentFull},
    {label: 'Частичная занятость', value: ModelsEmployment.EmploymentPartial},
    {label: 'Временная занятость', value: ModelsEmployment.EmploymentTemporary},
    {label: 'Интернатура', value: ModelsEmployment.EmploymentInternship},
    {label: 'Стажировка', value: ModelsEmployment.EmploymentProbation},
    {label: 'Волонтерство', value: ModelsEmployment.EmploymentVolunteer},
  ];
  tripReadinessTypes: {label: string, value: ModelsTripReadinessType}[] = [
    {label: 'Готов к командировкам', value: ModelsTripReadinessType.TripReadinessReady},
    {label: 'Иногда готов к командировкам', value: ModelsTripReadinessType.TripReadinessSometimes},
    {label: 'Не готов к командировкам', value: ModelsTripReadinessType.TripReadinessNever},
  ];
  languageLevelTypes: {label: string, value: ModelsLanguageLevelType}[] = [
    {label: 'A1 - Начальный', value: ModelsLanguageLevelType.LanguageLevelA1},
    {label: 'A2 - Элементарный', value: ModelsLanguageLevelType.LanguageLevelA2},
    {label: 'B1 - Средний', value: ModelsLanguageLevelType.LanguageLevelB1},
    {label: 'B2 - Средне-продвинуый', value: ModelsLanguageLevelType.LanguageLevelB2},
    {label: 'C1 - Продвинутый', value: ModelsLanguageLevelType.LanguageLevelC1},
    {label: 'C2 - В совершенстве', value: ModelsLanguageLevelType.LanguageLevelC2},
    {label: 'Родной язык', value: ModelsLanguageLevelType.LanguageLevelL1},
  ];
  searchValue: string = '';
  vacancyName: string = '';

  //отклики
  private gridApi!: GridApi<NegotiationView>;
  detailsSelectedId?: {negotiationId: string, nodeId?: string};
  negotiationsList: NegotiationView[] = [];
  colDefsDetails: ColDef<NegotiationView>[] = [
    {
      headerName: 'Кандидаты',
      headerClass: 'font-medium',
      flex: 1,
      minWidth: 200,
      maxWidth: 350,
      resizable: false,
      cellRenderer: TableCandidateNameComponent,
      valueGetter: (params: ValueGetterParams<NegotiationView>) => params.data?.fio,
    }
  ];
  colDefs: ColDef<NegotiationView>[] = [
    {
      headerName: 'Кандидаты',
      headerClass: 'font-medium',
      width: 320,
      minWidth: 200,
      cellRenderer: TableCandidateNameComponent,
      valueGetter: (params: ValueGetterParams<NegotiationView>) => params.data?.fio,
      pinned: 'left',
    },
    {
      headerName: 'Контакты',
      headerClass: 'font-medium',
      sortable: false,
      cellRenderer: (params: ICellRendererParams<NegotiationView>) => {
        return `<div class="flex h-full flex-col justify-center gap-1 leading-4">
          <span>${params.data?.phone}</span>
          <span>${params.data?.email}</span>
          </div>`;
      },
    },
    {
      field: 'comment',
      headerName: 'Последний комментарий',
      headerClass: 'font-medium',
    },
    {
      field: 'negotiation_date',
      headerName: 'Дата отклика',
      headerClass: 'font-medium',
      valueFormatter: function (params: ValueFormatterParams) {
        if (params.data?.negotiation_date) {
          return new Date(params.data?.negotiation_date).toLocaleDateString('ru-RU');
        } else
          return '';
      }
    },
    {
      headerName: 'Оценка',
      headerClass: 'font-medium'
    },
    {
      field: 'salary',
      headerName: 'Ожидаемая ЗП',
      headerClass: 'font-medium'
    },
    {
      field: 'step',
      headerName: 'Этап',
      headerClass: 'font-medium'
    },
    {
      field: 'step_time',
      headerName: 'Время на этапе',
      headerClass: 'font-medium'
    },
    {
      field: 'negotiation_status',
      headerName: 'Статус',
      headerClass: 'font-medium',
      cellRenderer: NegotiationStatusComponent,
      cellRendererParams: {
        onChange: this.changeStatus.bind(this),
      },
      valueGetter: (params: ValueGetterParams<NegotiationView>) => params.data?.negotiation_status,
    },
  ];
  gridOptions: GridOptions = {
    onGridReady: this.onGridReady.bind(this),
    onCellClicked: this.openDetails.bind(this),
    columnDefs: this.colDefs,
    rowData: this.negotiationsList,
    overlayNoRowsTemplate: '<span class="text-[32px] leading-10">Отклики отсутствуют</span>',
    loadingOverlayComponent: LoaderComponent,
    loading: true,
    suppressMovableColumns: true,
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private mockApi: MockDataService,
    private api: ApiService
  ) { }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getNegotiations();
    this.activatedRoute.params.subscribe(params => {
      this.getVacancyById(params['id']);
    })
  }

  openDetails(event: CellClickedEvent) {
    if (event.colDef.field !== 'negotiation_status') {
      this.detailsSelectedId = {negotiationId: event.data.id, nodeId: event.node.id};
      event.node.setSelected(true);
      this.gridApi.setGridOption('columnDefs', this.colDefsDetails);
    }
  }

  closeDetails() {
    if (this.detailsSelectedId?.nodeId)
      this.gridApi.getRowNode(this.detailsSelectedId?.nodeId)?.setSelected(false);
    this.detailsSelectedId = undefined;
    this.gridApi.setGridOption('columnDefs', this.colDefs);
  }

  getNegotiations() {
    const filter = this.filterForm.value as DbmodelsNegotiationFilter;
    this.gridApi.setGridOption('loading', true);
    this.mockApi.getNegotiations().subscribe({
      next: (res) => {
        this.negotiationsList = res;
        this.gridApi.setGridOption('rowData', this.negotiationsList);
        this.gridApi.setGridOption('loading', false);

      },
      error: (error) => {
        console.log(error);
        this.gridApi.setGridOption('loading', false);
      }
    })
  }

  getVacancyById(id: string) {
    this.api.v1SpaceVacancyDetail(id, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data)
          this.vacancyName = data.body.data.vacancy_name;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  changeStatus(id: string, status: ModelsNegotiationStatus) {
    console.log('Смена статуса', id, status);
    // this.api.v1SpaceNegotiationStatusChangeUpdate(id, {status}).subscribe({
    //   next: (data) => {
    //     this.getNegotiations();
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });
  }

  onSearch() {
    console.log(this.filterForm.value);
  }

  onBack() {
    window.history.back();
  }
}
