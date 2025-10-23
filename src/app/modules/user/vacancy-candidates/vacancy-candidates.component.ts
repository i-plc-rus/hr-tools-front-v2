import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApplicantapimodelsApplicantFilter, ApplicantapimodelsApplicantSort, ApplicantapimodelsApplicantView, DictapimodelsCityView, ModelsAddedType, ModelsApAddedPeriodType, ModelsApplicantSource, ModelsApplicantStatus, ModelsGenderType, ModelsRelocationType, ModelsSchedule, ModelsVacancyStatus} from '../../../api/data-contracts';
import {ApiService} from '../../../api/Api';
import {ApplicantView} from '../../../models/Applicant';
import {ColDef, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowClickedEvent, ValueFormatterParams, ValueGetterParams} from 'ag-grid-community';
import {LoaderComponent} from '../../../components/loader/loader.component';
import {CellCandidateNameComponent} from '../../../components/cell-candidate-name/cell-candidate-name.component';
import {CellCandidateContactsComponent} from '../../../components/cell-candidate-contacts/cell-candidate-contacts.component';
import {ActivatedRoute, Router} from '@angular/router';
import {VacancyView} from '../../../models/Vacancy';
import {relocationTypes, vacancyStatuses} from '../user-consts';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-vacancy-candidates',
  templateUrl: './vacancy-candidates.component.html',
  styleUrl: './vacancy-candidates.component.scss',
})
export class VacancyСandidatesComponent implements OnInit, OnDestroy {
  vacancy?: VacancyView;
  // фильтр
  filterForm = new FormGroup({
    added_day: new FormControl(''),
    added_period: new FormControl<ModelsApAddedPeriodType | undefined>(undefined),
    added_type: new FormControl<ModelsAddedType | undefined>(undefined),
    age_from: new FormControl(0, {nonNullable: true}),
    age_to: new FormControl(0, {nonNullable: true}),
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
    total_experience_from: new FormControl(0, {nonNullable: true}),
    total_experience_to: new FormControl(0, {nonNullable: true}),
    vacancy_id: new FormControl(''),
    vacancy_name: new FormControl(''),
  });
  statusTypes = Object.values(ModelsApplicantStatus);
  sourceTypes = Object.values(ModelsApplicantSource);
  addedPeriodTypes = Object.values(ModelsApAddedPeriodType);
  addedTypes = Object.values(ModelsAddedType);
  relocationTypes = relocationTypes;
  vacancyStatuses = vacancyStatuses;
  vacancyList: VacancyView[] = [];
  cities: DictapimodelsCityView[] = [];
  searchCity = new FormControl('');
  searchValue = new FormControl('');
  //кандидаты
  private gridApi!: GridApi<ApplicantView>;
  detailsSelectedId?: {applicantId: string, nodeId?: string};
  applicantsList: ApplicantView[] = [];
  colDefsDetails: ColDef<ApplicantView>[] = [
    {
      headerName: 'Кандидаты',
      headerClass: 'font-medium',
      flex: 1,
      minWidth: 200,
      maxWidth: 350,
      resizable: false,
      cellRenderer: CellCandidateNameComponent,
      valueGetter: (params: ValueGetterParams<ApplicantView>) => params.data?.fio,
    }
  ];
  colDefs: ColDef<ApplicantView>[] = [
    {
      headerName: 'Кандидаты',
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
      field: 'comment',
      headerName: 'Последний комментарий',
      headerClass: 'font-medium',
      cellRenderer: (params: ICellRendererParams<ApplicantView>) => {
        return params.data?.comment
      },
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
      headerName: 'Оценка',
      headerClass: 'font-medium'
    },
    {
      field: 'salary',
      headerName: 'Ожидаемая ЗП',
      headerClass: 'font-medium'
    },
    {
      field: 'selection_stage_name',
      headerName: 'Этап',
      headerClass: 'font-medium'
    },
    {
      field: 'stage_time',
      headerName: 'Время на этапе',
      headerClass: 'font-medium'
    },
  ];
  gridOptions: GridOptions = {
    onGridReady: this.onGridReady.bind(this),
    onRowClicked: this.openDetails.bind(this),
    columnDefs: this.colDefs,
    rowData: this.applicantsList,
    overlayNoRowsTemplate: '<span class="text-[32px] leading-10">Кандидаты отсутствуют</span>',
    loadingOverlayComponent: LoaderComponent,
    loading: true,
    suppressMovableColumns: true,
    suppressScrollOnNewData: true
  }
  fioDesc: boolean | null = null;
  private currentPage = 1;
  private pageSize = 50;
  private loading = false;
  private allDataLoaded = false;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setFilterFormListeners();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.gridApi.addEventListener('bodyScroll', this.onGridScroll.bind(this));

    // Отслеживание клика по заголовку ФИО для сортировки на беке
    const headerTexts = document.querySelectorAll('.ag-header-cell-text');
    headerTexts.forEach((el: Element) => {
      if (el.textContent?.trim() === 'Кандидаты') {
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

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['stage'])
        this.filterForm.controls.stage_name.setValue(params['stage']);
    })
    this.activatedRoute.params.subscribe(params => {
      this.getVacancyById(params['id']);
    })
  }

  openDetails(event: RowClickedEvent) {
    this.detailsSelectedId = {applicantId: event.data.id, nodeId: event.node.id};
    event.node.setSelected(true);
    this.gridApi.setGridOption('columnDefs', this.colDefsDetails);
  }

  closeDetails() {
    if (this.detailsSelectedId?.nodeId)
      this.gridApi.getRowNode(this.detailsSelectedId?.nodeId)?.setSelected(false);
    this.detailsSelectedId = undefined;
    this.gridApi.setGridOption('columnDefs', this.colDefs);
  }

  setFilterFormListeners() {
    this.searchCity.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((newValue) => {
        if (this.filterForm.controls.city.value !== '')
          this.filterForm.controls.city.setValue('');
        if (newValue && newValue.length > 3)
          this.getCities(newValue);
        else
          this.cities = [];
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
        this.loading = false;
        this.currentPage = 1;
        this.applicantsList = [];
        this.gridApi.setGridOption('loading', true);
        this.gridApi.setGridOption('rowData', []);
        this.getApplicants();
      });

    this.filterForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.getApplicants()
      });
  }

  getCities(address: string) {
    this.api.v1DictCityFindCreate({address}, {observe: 'response'}).subscribe({
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

  changeStatus(id: string, status: ModelsVacancyStatus) {
    this.api.v1SpaceVacancyChangeStatusUpdate(id, {status}, {observe: 'response'}).subscribe({
      next: () => {
        if (this.vacancy)
          this.getVacancyById(this.vacancy.id);
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  getApplicants(loadMore = false) {
    if (this.loading || (loadMore && this.allDataLoaded)) return;

    this.loading = true;

    if (!loadMore) {
      this.currentPage = 1;
      this.applicantsList = [];
      this.allDataLoaded = false;
      this.gridApi.setGridOption('loading', true);
    }

    const filter = this.filterForm.value as ApplicantapimodelsApplicantFilter;
    filter.page = this.currentPage;
    filter.limit = this.pageSize;
    filter.sort = { fio_desc: this.fioDesc } as ApplicantapimodelsApplicantSort;

    this.api.v1SpaceApplicantListCreate(filter, {observe: 'response'}).subscribe({
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
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.gridApi.setGridOption('loading', false);
        this.loading = false;
      }
    });
  }

  onGridScroll = (event: any) => {
    if (this.loading || this.allDataLoaded) return;

    const api = event.api;
    const lastVisibleRow = api.getLastDisplayedRowIndex();
    const rowCount = api.getDisplayedRowCount();

    if (lastVisibleRow >= 0 && lastVisibleRow >= rowCount - 5) {
      this.getApplicants(true);
    }
  }
  getVacancyById(id: string) {
    this.api.v1SpaceVacancyDetail(id, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.vacancy = new VacancyView(data.body.data);
          const stages = this.vacancy.selection_stages || [];
          this.vacancy.selection_stages = stages.sort((a, b) => (a.stage_order || 0) - (b.stage_order || 0));
          this.filterForm.controls.vacancy_id.setValue(this.vacancy.id);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSearch() {
    this.filterForm.controls.search.setValue(this.searchValue.value);
  }

  onReset() {
    if (!this.vacancy) return;
    this.filterForm.reset();
    this.filterForm.controls.vacancy_id.setValue(this.vacancy.id);
    this.searchValue.reset();
    this.searchCity.reset();
  }

  onSelectStage(name: string) {
    this.filterForm.controls.stage_name.setValue(name);
  }

  onSelectStatus(status?: ModelsApplicantStatus) {
    this.filterForm.controls.status.setValue(status);
  }

  onBack() {
    this.router.navigate(['user', 'vacancy', 'list']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.gridApi && !this.gridApi.isDestroyed()) {
      this.gridApi.removeEventListener('bodyScroll', this.onGridScroll);
    }
  }
}
