import {Component, OnDestroy} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {
  ApplicantapimodelsApplicantFilter,
  ApplicantapimodelsApplicantSort,
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
import {debounceTime, distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import {CandidateStatusComponent} from './candidate-status/candidate-status.component';
import {Subject, Subscription} from 'rxjs';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { CandidatesFilterState, CandidatesStateService } from '../../../services/candidates-state.service';

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

  public customIcons = {
    sortUnSort: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_57293_68199" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9"/>
                  </mask>
                  <g mask="url(#mask0_57293_68199)">
                  <path d="M8 13V5.825L5.425 8.4L4 7L9 2L14 7L12.575 8.4L10 5.825V13H8ZM15 22L10 17L11.425 15.6L14 18.175V11H16V18.175L18.575 15.6L20 17L15 22Z" fill="#625B71"/>
                  </g>
                  </svg>`, // Unsorted icon
    };

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
      unSortIcon: true,
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
      unSortIcon: true,
    },
    {
      field: 'resume_title',
      headerName: 'Должность',
      headerClass: 'font-medium',
      unSortIcon: true,
    },
    {
      field: 'source',
      headerName: 'Источник кандидата',
      headerClass: 'font-medium',
      unSortIcon: true,
    },
    {
      field: 'negotiation_date',
      headerName: 'Дата отбора',
      headerClass: 'font-medium',
      unSortIcon: true,
      valueFormatter: function (params: ValueFormatterParams) {
        if (params.data?.negotiation_date) {
          // Парсим дату в формате DD.MM.YYYY
          const dateParts = params.data.negotiation_date.split('.');
          if (dateParts.length === 3) {
            const day = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]) - 1;
            const year = parseInt(dateParts[2]);
            const date = new Date(year, month, day);
            return date.toLocaleDateString('ru-RU');
          }
          return params.data.negotiation_date; 
        } else
          return '';
      }
    },
    {
      field: 'salary',
      headerName: 'Ожидаемая ЗП',
      headerClass: 'font-medium',
      unSortIcon: true,
    },
    {
      field: 'start_date',
      headerName: 'Дата выхода',
      headerClass: 'font-medium',
      unSortIcon: true,
      valueFormatter: function (params: ValueFormatterParams) {
        if (params.data?.start_date) {
          // Парсим дату в формате DD.MM.YYYY
          const dateParts = params.data.start_date.split('.');
          if (dateParts.length === 3) {
            const day = parseInt(dateParts[0]);
            const month = parseInt(dateParts[1]) - 1; 
            const year = parseInt(dateParts[2]);
            const date = new Date(year, month, day);
            return date.toLocaleDateString('ru-RU');
          }
          return params.data.start_date; 
        } else
          return '';
      }
    },
    {
      field: 'status',
      headerName: 'Статус',
      headerClass: 'font-medium',
      unSortIcon: true,
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
    icons: this.customIcons,
    rowSelection: {
      mode: 'multiRow'
    },
    selectionColumnDef: {
      pinned: 'left',
    },
    suppressScrollOnNewData: true,
    getRowId: (params) => params.data?.id || ''
  }
  fioDesc: boolean | null = null;
  private currentPage = 1;
  private pageSize = 50;
  private isLoading = false;
  private allDataLoaded = false;
  private destroy$ = new Subject<void>();
  rowCount = 0;

  filterCount = 0;
  private subscriptions: Subscription[] = [];
  private selectedIds: string[] = [];
  private findedSelectedRows: number = 0;
  isFilterOpen: boolean = false;

  constructor(
    private modalService: CandidateModalService,
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private stateService: CandidatesStateService,
  ) { }

  ngOnInit(): void { 
    const savedState = this.stateService.getFilters();
    this.patchForms(savedState);
    this.subscribeToFormChanges();

    this.subscriptions.push(
      this.filterForm.valueChanges.pipe(
        debounceTime(100),
        map(() => this.countActiveFilters())
      ).subscribe(count => {
        this.filterCount = count;
      })
    );
  }
  

  private patchForms(state: CandidatesFilterState): void {
      this.filterForm.patchValue(state, { emitEvent: false });
      this.searchValue.patchValue(state.searchValue, { emitEvent: false });
      this.searchCity.patchValue(state.searchCity, { emitEvent: false });
      this.searchVacancy.patchValue(state.searchVacancy, { emitEvent: false });
      this.isFilterOpen = state.isFilterOpen ?? false;
      this.filterCount = state.filterCount ?? 0;
    }
  
    private subscribeToFormChanges(): void {
      this.filterForm.valueChanges.pipe(
        debounceTime(300), 
        takeUntil(this.destroy$)
      ).subscribe(values => {
        const combinedState: Partial<CandidatesFilterState> = {
          ...values,
          searchValue: this.searchValue.value,
          searchCity: this.searchCity.value,
          searchVacancy: this.searchVacancy.value,
          filterCount: this.filterCount,
          isFilterOpen: this.isFilterOpen,
        };
        this.updateStateAndLoad(combinedState);
      });
  
      this.searchValue.valueChanges.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(() => this.updateCombinedState());
      this.searchCity.valueChanges.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(() => this.updateCombinedState());
      this.searchVacancy.valueChanges.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(() => this.updateCombinedState());
    }
    
    private updateCombinedState(): void {
      const combinedState: Partial<CandidatesFilterState> = {
        ...this.filterForm.value,
        searchValue: this.searchValue.value,
        searchCity: this.searchCity.value,
        searchVacancy: this.searchVacancy.value,
        filterCount: this.filterCount,
        isFilterOpen: this.isFilterOpen,
      };
      this.updateStateAndLoad(combinedState);
    }
  
    private updateStateAndLoad(changes: Partial<CandidatesFilterState>): void {
      this.stateService.setFilters(changes);
      this.getApplicants();
      this.setFormListeners();
    }

  onToggleChange(): void {
    this.updateCombinedState();
  }

  closePanel(): void {
    this.isFilterOpen = false;
    this.updateCombinedState();
  }

  private isControlActive(control: AbstractControl): boolean {
    const value = control.value;
    if (value === 'Все') {
        return true;
    }
    if (value === null || typeof value === 'undefined' || value === '' ) {
      return false;
    }
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }
    if (typeof value === 'boolean') {
      return value === true;
    }
    return true;
  }

  public countActiveFilters(): number {
    let count = 0;
    const controlsToExclude = ['sort', 'age_to', 'total_experience_to'];

    Object.keys(this.filterForm.controls).forEach(key => {
      if (controlsToExclude.includes(key)) {
        return;
      }

      const control = this.filterForm.get(key);
      if (control && this.isControlActive(control) ) {
        if (Array.isArray(control.value)) {
          count += control.value.length;
        } else {
          count++;
        }
      }
    });
    return count;
  }

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
    
      // Отслеживание клика по заголовку ФИО для сортировки на беке
      const headerTexts = document.querySelectorAll('.ag-header-cell-text');
      headerTexts.forEach((el: Element) => {
        if (el.textContent?.trim() === 'ФИО') {
          const headerCell = el.closest('.ag-header-cell');
          if (headerCell) {
            headerCell.addEventListener('click', () => {
              switch(this.fioDesc) {
                case null: this.fioDesc = false;
                break;
                case false: this.fioDesc = true;
                break;
                case true: this.fioDesc = null;
                break;
                default: this.fioDesc = null;
              }
              this.getApplicants();
            });
            (headerCell as HTMLElement).style.cursor = 'pointer';
          }
        }
      });
    
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

    if (!loadMore && this.gridApi) {
      const selectedNodes = this.gridApi.getSelectedNodes();
      this.selectedIds = selectedNodes
        .map(node => node.data?.id)
        .filter((id): id is string => !!id);
      this.findedSelectedRows = this.selectedIds.length  
    }

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
    filter.sort = { fio_desc: this.fioDesc } as ApplicantapimodelsApplicantSort;
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

            this.rowCount = res.body?.row_count ?? this.rowCount;

            // Восстанавливаем выбранные строки по айди
            if (this.selectedIds.length > 0 && this.findedSelectedRows >= 0) {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                 
                  this.api.v1SpaceApplicantDetail(this.selectedIds[0], {observe: 'response'}).subscribe({
                    next: (res) => {

                      if (res.body?.data) {
                        const newApplicant = new ApplicantView(res.body.data);
                        
                        const exists = this.applicantsList.some(app => app.id === newApplicant.id);
                        if (!exists) {
                          this.applicantsList.push(newApplicant);
                          console.log(this.applicantsList);
                          this.gridApi.setGridOption('rowData', this.applicantsList);
                        }
                      }
                      this.selectedIds.forEach(id => {
                        const rowNode = this.gridApi.getRowNode(id);
                        if (rowNode) {
                          rowNode.setSelected(true);
                          -- this.findedSelectedRows;
                        }
                      });
                    },
                    error: (error) => {
                      console.error('Ошибка при загрузке деталей кандидата:', error);
                    }
                  })
                });
              });
            }

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
        const normalizedNumber = this.normalizePhoneNumber(value!);
          
        this.filterForm.controls.search.setValue(normalizedNumber);
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

  normalizePhoneNumber(input: string): any {
    if (!input) return '';
    
    let normalized = '';
    
    if (input.startsWith('+7')) {
      normalized = input.replace(/[^\d+]/g, '');
      normalized = normalized.substring(2);
      return normalized;
    } else if (input.startsWith('8') || input.startsWith('7')) {
      normalized = input.replace(/[^\d+]/g, '');
      normalized = normalized.substring(1);
      return normalized;
    } else {
      return input;
    }

  }

  onSearch() {
    // this.filterForm.controls.search.setValue(this.searchValue.value);
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
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
