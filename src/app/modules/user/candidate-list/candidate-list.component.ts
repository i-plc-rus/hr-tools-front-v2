import {Component, OnDestroy} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {
  ApplicantapimodelsApplicantFilter,
  ApplicantapimodelsApplicantView,
  ApplicantapimodelsXlsExportRequest,
  DictapimodelsCityView,
  ModelsAddedType,
  ModelsApAddedPeriodType,
  ModelsApplicantSource,
  ModelsApplicantStatus,
  ModelsGenderType,
  ModelsRelocationType,
  ModelsSchedule,
  VacancyapimodelsVacancyFilter,
  VacancyapimodelsVacancyView
} from '../../../api/data-contracts';
import {ApiService} from '../../../api/Api';
import {
  CellClickedEvent,
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  SelectionChangedEvent,
  ValueFormatterParams,
  ValueGetterParams
} from 'ag-grid-community';
import {LoaderComponent} from '../../../components/loader/loader.component';
import {CellCandidateNameComponent} from '../../../components/cell-candidate-name/cell-candidate-name.component';
import {
  CellCandidateContactsComponent
} from '../../../components/cell-candidate-contacts/cell-candidate-contacts.component';
import {ApplicantView} from '../../../models/Applicant';
import {CandidateModalService} from '../../../services/candidate-modal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VacancyView} from '../../../models/Vacancy';
import {relocationTypes} from '../user-consts';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {CandidateStatusComponent} from './candidate-status/candidate-status.component';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
})
export class СandidateListComponent implements OnDestroy{
  filterForm = new FormGroup({
    added_day: new FormControl(''),
    added_period: new FormControl<ModelsApAddedPeriodType | undefined>(undefined),
    added_type: new FormControl<ModelsAddedType | undefined>(undefined),
    age_from: new FormControl<number | null>(null, { validators: [this.validatePositiveNumber] }),
    age_to: new FormControl<number | null>(null, { validators: [this.validatePositiveNumber] }),
    city: new FormControl('', {nonNullable: true}),
    gender: new FormControl<ModelsGenderType | undefined>(undefined),
    language: new FormControl(''),
    relocation: new FormControl<ModelsRelocationType | undefined>(undefined),
    schedule: new FormControl<ModelsSchedule | undefined>(undefined),
    search: new FormControl(''),
    source: new FormControl<ModelsApplicantSource | undefined>(undefined),
    stage_name: new FormControl(''),
    status: new FormControl<ModelsApplicantStatus | undefined>(undefined),
    tag: new FormControl(''),
    total_experience_from: new FormControl<number | null>(null, { validators: [this.validatePositiveNumber] }),
    total_experience_to: new FormControl<number | null>(null, { validators: [this.validatePositiveNumber] }),
    vacancy_id: new FormControl('', {nonNullable: true}),
    vacancy_name: new FormControl(''),
  });
  statusTypes = Object.values(ModelsApplicantStatus);
  sourceTypes = Object.values(ModelsApplicantSource);
  addedPeriodTypes = Object.values(ModelsApAddedPeriodType);
  addedTypes = Object.values(ModelsAddedType);
  relocationTypes = relocationTypes;
  vacancyList: VacancyView[] = [];
  cities: DictapimodelsCityView[] = [];
  searchVacancy = new FormControl('');
  searchCity = new FormControl('');
  searchValue = new FormControl('');

  //кандидаты
  private gridApi!: GridApi<ApplicantView>;
  applicantsList: ApplicantView[] = [];
  selectedApplicants: ApplicantView[] = [];
  selectedSameVacancy: boolean = false;
  colDefs: ColDef<ApplicantView>[] = [
    {
      headerName: 'ФИО',
      headerClass: 'font-medium',
      width: 320,
      minWidth: 200,
      cellRenderer: CellCandidateNameComponent,
      valueGetter: (params: ValueGetterParams<ApplicantView>) => params.data?.fio,
      pinned: 'left',
    },
    {
      headerName: 'Контакты',
      headerClass: 'font-medium',
      sortable: false,
      cellRenderer: CellCandidateContactsComponent,
    },
    {
      field: 'vacancy_name',
      headerName: 'Вакансия',
      headerClass: 'font-medium',
    },
    {
      field: 'resume_title',
      headerName: 'Должность',
      headerClass: 'font-medium',
    },
    {
      field: 'source',
      headerName: 'Источник кандидата',
      headerClass: 'font-medium',
    },
    {
      field: 'negotiation_date',
      headerName: 'Дата отбора',
      headerClass: 'font-medium',
      valueFormatter: function (params: ValueFormatterParams) {
        if (params.data?.negotiation_date) {
          return new Date(params.data?.negotiation_date).toLocaleDateString('ru-RU');
        } else
          return '';
      }
    },
    {
      field: 'salary',
      headerName: 'Ожидаемая ЗП',
      headerClass: 'font-medium'
    },
    {
      field: 'start_date',
      headerName: 'Дата выхода',
      headerClass: 'font-medium',
      valueFormatter: function (params: ValueFormatterParams) {
        if (params.data?.start_date) {
          return new Date(params.data?.start_date).toLocaleDateString('ru-RU');
        } else
          return '';
      }
    },
    {
      field: 'status',
      headerName: 'Статус',
      headerClass: 'font-medium',
      cellRenderer: CandidateStatusComponent,
      cellRendererParams: {
        onChange: this.openRejectCandidateModal.bind(this),
      },
      valueGetter: (params: ValueGetterParams<ApplicantView>) => params.data?.status,
    },
  ];
  gridOptions: GridOptions = {
    onGridReady: this.onGridReady.bind(this),
    onCellClicked: this.onCellClicked.bind(this),
    onSelectionChanged: this.onSelectionChanged.bind(this),
    columnDefs: this.colDefs,
    rowData: this.applicantsList,
    overlayNoRowsTemplate: '<span class="text-[32px] leading-10">Кандидаты отсутствуют</span>',
    loadingOverlayComponent: LoaderComponent,
    loading: true,
    suppressMovableColumns: true,
    rowSelection: {
      mode: 'multiRow'
    },
    selectionColumnDef: {
      pinned: 'left',
    },
    suppressScrollOnNewData: true
  }

  private currentPage = 1;
  private pageSize = 50;
  private isLoading = false;
  private allDataLoaded = false;
  private destroy$ = new Subject<void>();

  constructor(
    private modalService: CandidateModalService,
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  onGridReady(params: GridReadyEvent) {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['type'] === 'create') {
          this.openAddApplicantModal();
          this.router.navigate([], { queryParams: {}, replaceUrl: true, relativeTo: this.activatedRoute });
        }
      });

    this.gridApi = params.api;
    this.gridApi.addEventListener('bodyScroll', this.onGridScroll.bind(this));
    this.getApplicants();
    this.setFormListeners();
  }

  onGridScroll = (event: any) => {
    if (this.isLoading || this.allDataLoaded) return;

    const api = event.api;
    const lastVisibleRow = api.getLastDisplayedRowIndex();
    const rowCount = api.getDisplayedRowCount();

    if (lastVisibleRow >= rowCount - 5) {
      this.getApplicants(true);
    }
  }

  onCellClicked(event: CellClickedEvent) {
    if (event.colDef.field !== 'status' && event.colDef.colId !== 'ag-Grid-ControlsColumn')
      this.router.navigate([`user/candidates/${event.data?.id}`]);
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    this.selectedApplicants = event.api.getSelectedNodes().map(node => node.data);
    this.selectedSameVacancy = this.selectedApplicants.every(applicant => applicant.vacancy_id === this.selectedApplicants[0].vacancy_id);
  }

  getApplicants(loadMore = false) {
    if (this.isLoading) return;
    if (this.allDataLoaded && loadMore) return;

    if (!this.filterForm.valid) return;

    this.isLoading = true;

    if (!loadMore) {
      this.currentPage = 1;
      this.applicantsList = [];
      this.allDataLoaded = false;
      this.gridApi.setGridOption('loading', true);
      this.gridApi.setGridOption('rowData', []);
    }

    const filter = { ...this.filterForm.value } as ApplicantapimodelsApplicantFilter;

    filter.age_from = filter.age_from || undefined;
    filter.age_to = filter.age_to || undefined;
    filter.total_experience_from = filter.total_experience_from || undefined;
    filter.total_experience_to = filter.total_experience_to || undefined;

    filter.page = this.currentPage;
    filter.limit = this.pageSize;

    this.api.v1SpaceApplicantListCreate(filter, {observe: 'response'})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.body?.data) {
            const newApplicants = res.body.data.map(
              (applicant: ApplicantapimodelsApplicantView) => new ApplicantView(applicant)
            );

            this.applicantsList = [...this.applicantsList, ...newApplicants];
            this.gridApi.setGridOption('rowData', this.applicantsList);

            if (newApplicants.length < this.pageSize) {
              this.allDataLoaded = true;
            } else {
              this.currentPage++;
            }
          }
          this.gridApi.setGridOption('loading', false);
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.gridApi.setGridOption('loading', false);
          this.isLoading = false;
        }
      });
  }

  getVacancyList(search: string) {
    const filter = {search} as VacancyapimodelsVacancyFilter;
    this.api.v1SpaceVacancyListCreate(filter, {observe: 'response'})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.body?.data) {
            this.vacancyList = data.body.data.map((vacancy: VacancyapimodelsVacancyView) => new VacancyView(vacancy));
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getCities(address: string) {
    this.api.v1DictCityFindCreate({address}, {observe: 'response'})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.body?.data) {
            this.cities = data.body.data;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  setFormListeners() {
    this.searchVacancy.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
      .subscribe((newValue) => {
        if (this.filterForm.controls.vacancy_id.value !== '')
          this.filterForm.controls.vacancy_id.setValue('');
        if (newValue && newValue.length > 3)
          this.getVacancyList(newValue);
        else
          this.vacancyList = [];
      });

    this.searchCity.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
      .subscribe((newValue) => {
        if (this.filterForm.controls.city.value !== '')
          this.filterForm.controls.city.setValue('');
        if (newValue && newValue.length > 0)
          this.getCities(newValue);
        else
          this.cities = [];
      });

    this.filterForm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
      )
      .subscribe(() => {
        if (this.filterForm.valid) {
          this.allDataLoaded = false;
          this.isLoading = false;
          this.currentPage = 1;
          this.applicantsList = [];
          this.gridApi.setGridOption('loading', true);
          this.gridApi.setGridOption('rowData', []);
          this.getApplicants();
        }
      });

    this.searchValue.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.filterForm.controls.search.setValue(value);
        this.allDataLoaded = false;
        this.isLoading = false;
        this.currentPage = 1;
        this.applicantsList = [];
        this.gridApi.setGridOption('loading', true);
        this.gridApi.setGridOption('rowData', []);
        this.getApplicants();
      });
  }

  openRejectCandidateModal(applicants: ApplicantView | ApplicantView[]) {
    if (!Array.isArray(applicants))
      applicants = [applicants];
    this.modalService.rejectCandidateModal(applicants)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.getApplicants()
      );
  }

  openChangeStageModal(applicants: ApplicantView[]) {
    this.modalService.changeStageModal(applicants)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.getApplicants()
      );
  }

  openAddApplicantModal() {
    this.modalService.addCandidateModal()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.getApplicants()
      );
  }

  exportXls() {
    const request: ApplicantapimodelsXlsExportRequest = {
      filter: this.filterForm.value as ApplicantapimodelsApplicantFilter,
      ids: this.selectedApplicants.map((applicant: ApplicantView) => applicant.id)
    };
    this.api.v1SpaceApplicantMultiActionsExportXlsUpdate(request, {observe: 'response', responseType: 'blob'})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.body) {
            const blob = new Blob([data.body], {type: 'application/octet-stream'});

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Кандидаты.xlsx';
            link.click();
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  onSearch() {
    this.filterForm.controls.search.setValue(this.searchValue.value);
    this.allDataLoaded = false;
    this.isLoading = false;
    this.currentPage = 1;
    this.applicantsList = [];
    this.gridApi.setGridOption('loading', true);
    this.gridApi.setGridOption('rowData', []);
    this.getApplicants();
  }

  onReset() {
    this.filterForm.reset();
    this.searchCity.reset();
    this.searchVacancy.reset();
    this.searchValue.reset();
    this.allDataLoaded = false;
    this.isLoading = false;
    this.currentPage = 1;
    this.applicantsList = [];
    this.gridApi.setGridOption('loading', true);
    this.gridApi.setGridOption('rowData', []);
    this.getApplicants();
  }

  validatePositiveNumber(control: AbstractControl) {
    const value = control.value;

    if (value === null || value === '') {
      return null;
    }

    const numValue = Number(value);
    if (isNaN(numValue) || numValue < 0) {
      return { invalidNumber: true };
    }

    return null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.gridApi && !this.gridApi.isDestroyed()) {
      this.gridApi.removeEventListener('bodyScroll', this.onGridScroll);
    }
  }
}
