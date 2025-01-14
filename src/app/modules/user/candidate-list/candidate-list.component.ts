import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
  ApplicantapimodelsApplicantFilter,
  ApplicantapimodelsApplicantView,
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
import {CellClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent, SelectionChangedEvent, ValueFormatterParams, ValueGetterParams} from 'ag-grid-community';
import {LoaderComponent} from '../../../components/loader/loader.component';
import {CellCandidateNameComponent} from '../../../components/cell-candidate-name/cell-candidate-name.component';
import {CellCandidateContactsComponent} from '../../../components/cell-candidate-contacts/cell-candidate-contacts.component';
import {ApplicantView} from '../../../models/Applicant';
import {CandidateModalService} from '../../../services/candidate-modal.service';
import {Router} from '@angular/router';
import {VacancyView} from '../../../models/Vacancy';
import {relocationTypes} from '../user-consts';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {CandidateStatusComponent} from './candidate-status/candidate-status.component';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
})
export class СandidateListComponent {
  // фильтр
  filterForm = new FormGroup({
    added_day: new FormControl(''),
    added_period: new FormControl<ModelsApAddedPeriodType | undefined>(undefined),
    added_type: new FormControl<ModelsAddedType | undefined>(undefined),
    age_from: new FormControl(0),
    age_to: new FormControl(0),
    city: new FormControl(''),
    gender: new FormControl<ModelsGenderType | undefined>(undefined),
    language: new FormControl(''),
    relocation: new FormControl<ModelsRelocationType | undefined>(undefined),
    schedule: new FormControl<ModelsSchedule | undefined>(undefined),
    search: new FormControl(''),
    source: new FormControl<ModelsApplicantSource | undefined>(undefined),
    stage_name: new FormControl(''),
    status: new FormControl<ModelsApplicantStatus | undefined>(undefined),
    tag: new FormControl(''),
    total_experience_from: new FormControl(0),
    total_experience_to: new FormControl(0),
    vacancy_id: new FormControl(''),
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
  searchValue: string = '';

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
  }

  constructor(
    private modalService: CandidateModalService,
    private api: ApiService,
    private router: Router,
  ) { }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getApplicants();
    this.setFormListeners();
  }

  onCellClicked(event: CellClickedEvent) {
    if (event.colDef.field !== 'status' && event.colDef.colId !== 'ag-Grid-ControlsColumn')
      this.router.navigate([`user/candidates/${event.data?.id}`]);
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    this.selectedApplicants = event.api.getSelectedNodes().map(node => node.data);
    this.selectedSameVacancy = this.selectedApplicants.every(applicant => applicant.vacancy_id === this.selectedApplicants[0].vacancy_id);
  }

  getApplicants() {
    const filter = this.filterForm.value as ApplicantapimodelsApplicantFilter;
    this.gridApi.setGridOption('loading', true);
    this.api.v1SpaceApplicantListCreate(filter, {observe: 'response'}).subscribe({
      next: (res) => {
        if (res.body?.data) {
          this.applicantsList = res.body?.data.map((applicant: ApplicantapimodelsApplicantView) => new ApplicantView(applicant));
          this.gridApi.setGridOption('rowData', this.applicantsList);
        }
        this.gridApi.setGridOption('loading', false);

      },
      error: (error) => {
        console.log(error);
        this.gridApi.setGridOption('loading', false);
      }
    })
  }

  getVacancyList(search: string) {
    const filter = {search} as VacancyapimodelsVacancyFilter;
    this.api.v1SpaceVacancyListCreate(filter, {observe: 'response'}).subscribe({
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

  setFormListeners() {
    this.searchVacancy.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((newValue) => {
        if (this.filterForm.controls.vacancy_id.value !== '')
          this.filterForm.controls.vacancy_id.setValue('');
        if (newValue && newValue.length > 3)
          this.getVacancyList(newValue);
        else
          this.vacancyList = [];
      });
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

    this.filterForm.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(() => {
        this.getApplicants()
      });
  }

  openRejectCandidateModal(applicants: ApplicantView | ApplicantView[]) {
    if (!Array.isArray(applicants))
      applicants = [applicants];
    this.modalService.rejectCandidateModal(applicants).subscribe(() =>
      this.getApplicants()
    );
  }

  openChangeStageModal(applicants: ApplicantView[]) {
    this.modalService.changeStageModal(applicants).subscribe(() =>
      this.getApplicants()
    );
  }

  openAddApplicantModal() {
    this.modalService.addCandidateModal().subscribe(() =>
      this.getApplicants()
    );
  }

  onSearch() {
    console.log(this.filterForm.value);
    this.filterForm.controls.search.setValue(this.searchValue);
  }

  onBack() {
    window.history.back();
  }

}
