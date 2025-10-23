import {Component, OnDestroy, OnInit} from '@angular/core';
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
  NegotiationapimodelsNegotiationView,
} from '../../../api/data-contracts';
import {ApiService} from '../../../api/Api';
import {NegotiationView} from '../../../models/Negotiation';
import {
  CellClickedEvent,
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ICellRendererParams,
  ValueFormatterParams,
  ValueGetterParams
} from 'ag-grid-community';
import {LoaderComponent} from '../../../components/loader/loader.component';
import {CellCandidateNameComponent} from '../../../components/cell-candidate-name/cell-candidate-name.component';
import {CellCandidateContactsComponent} from '../../../components/cell-candidate-contacts/cell-candidate-contacts.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NegotiationStatusComponent} from './negotiation-status/negotiation-status.component';
import {educationTypes, employmentTypes, experienceBetweenTypes, genderTypes, languageLevelTypes, scheduleTypes, searchStatusTypes, tripReadinessTypes} from '../user-consts';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {ApplicantView} from '../../../models/Applicant';


@Component({
  selector: 'app-vacancy-negotiations',
  templateUrl: './vacancy-negotiations.component.html',
  styleUrl: './vacancy-negotiations.component.scss',
})
export class VacancyNegotiationsComponent implements OnInit, OnDestroy {
  // фильтр
  filterForm = new FormGroup({
    /** Водительсике права */
    driver_licence: new FormControl<ModelsDriverLicenseType[]>([]),
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
    city: new FormControl('', {nonNullable: true}),
    citizenship: new FormControl('', {nonNullable: true}),
    /** поиск по ФИО/телефон/емайл */
    search: new FormControl(''),
    vacancy_id: new FormControl(''),
  });
  driverLicenseTypes = Object.values(ModelsDriverLicenseType);
  applicantSources = Object.values(ModelsApplicantSource);
  responsePeriodTypes = Object.values(ModelsResponsePeriodType);
  educationTypes = educationTypes;
  experienceTypes = experienceBetweenTypes;
  scheduleTypes = scheduleTypes;
  searchLabelTypes: {label: string, value: ModelsSearchLabelType}[] = [
    {label: 'С фотографией', value: ModelsSearchLabelType.SearchLabelPhoto},
    {label: 'Указана зарплатой', value: ModelsSearchLabelType.SearchLabelSalary},
    {label: 'Указан возраст', value: ModelsSearchLabelType.SearchLabelAge},
    {label: 'Указан пол', value: ModelsSearchLabelType.SearchLabelGender},
  ];
  searchStatusTypes = searchStatusTypes;
  genderTypes = genderTypes;
  employmentTypes = employmentTypes;
  tripReadinessTypes = tripReadinessTypes;
  languageLevelTypes = languageLevelTypes;
  searchValue = new FormControl('');
  vacancyName: string = '';
  vacancyId: string = '';
  private destroy$ = new Subject<void>();

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
      cellRenderer: CellCandidateNameComponent,
      valueGetter: (params: ValueGetterParams<NegotiationView>) => params.data?.fio,
    }
  ];
  colDefs: ColDef<NegotiationView>[] = [
    {
      headerName: 'Кандидаты',
      headerClass: 'font-medium',
      width: 320,
      minWidth: 200,
      cellRenderer: CellCandidateNameComponent,
      valueGetter: (params: ValueGetterParams<NegotiationView>) => params.data?.fio,
      pinned: 'left',
    },
    {
      headerName: 'Контакты',
      headerClass: 'font-medium',
      sortable: false,
      cellRenderer: CellCandidateContactsComponent,
    },
    {
      field: 'comment',
      headerName: 'Последний комментарий',
      headerClass: 'font-medium',
      cellRenderer: (params: ICellRendererParams<ApplicantView>) => {
        return params.data?.comment
      },
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
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setFilterFormListeners();
    this.setSearchListener();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
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

  setFilterFormListeners() {
    this.filterForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.getNegotiations();
      });
  }

  getNegotiations() {
    const filter = this.filterForm.value as DbmodelsNegotiationFilter;
    this.gridApi.setGridOption('loading', true);
    this.api.v1SpaceNegotiationListCreate(filter, {observe: 'response'}).subscribe({
      next: (res) => {
        if (res.body?.data)
          this.negotiationsList = res.body?.data.map((negotiation: NegotiationapimodelsNegotiationView) => new NegotiationView(negotiation));
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
        if (data.body?.data) {
          this.vacancyName = data.body.data.vacancy_name;
          this.vacancyId = data.body.data.id;
          this.filterForm.controls.vacancy_id.setValue(this.vacancyId);
          this.getNegotiations();
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  changeStatus(id: string, status: ModelsNegotiationStatus) {
    this.api.v1SpaceNegotiationStatusChangeUpdate(id, {status}).subscribe({
      next: () => {
        this.getNegotiations();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onSearch() {
    this.filterForm.controls.search.setValue(this.searchValue.value);
  }

  onBack() {
    this.router.navigate(['user', 'vacancy', 'list']);
  }

  onReset() {
    if (!this.vacancyId) return;
    this.filterForm.reset();
    this.filterForm.controls.vacancy_id.setValue(this.vacancyId);
    this.searchValue.reset();
  }

  private setSearchListener() {
    this.searchValue.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.filterForm.controls.search.setValue(value);
        this.negotiationsList = [];
        this.gridApi.setGridOption('loading', true);
        this.gridApi.setGridOption('rowData', []);
        this.getNegotiations();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
