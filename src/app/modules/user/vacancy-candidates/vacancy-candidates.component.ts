import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApplicantapimodelsApplicantFilter, ApplicantapimodelsApplicantView, ModelsVacancyStatus, ModelsVRSelectionType, ModelsVRType, ModelsVRUrgency} from '../../../api/data-contracts';
import {ApiService} from '../../../api/Api';
import {ApplicantView} from '../../../models/Applicant';
import {ColDef, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowClickedEvent, ValueFormatterParams, ValueGetterParams} from 'ag-grid-community';
import {LoaderComponent} from '../../../components/loader/loader.component';
import {CellCandidateNameComponent} from '../../../components/cell-candidate-name/cell-candidate-name.component';
import {ActivatedRoute} from '@angular/router';
import {VacancyView} from '../../../models/Vacancy';
import {vacancyStatuses} from '../user-consts';

@Component({
  selector: 'app-vacancy-candidates',
  templateUrl: './vacancy-candidates.component.html',
  styleUrl: './vacancy-candidates.component.scss',
})
export class VacancyСandidatesComponent implements OnInit {
  // фильтр
  filterForm = new FormGroup({
    education: new FormControl(''),
    skills: new FormControl(''),
    experience: new FormControl(''),
    vacancy_name: new FormControl(''),
  });
  educationTypes = Object.values(ModelsVRType);
  skillsTypes = Object.values(ModelsVRSelectionType);
  experienceTypes = Object.values(ModelsVRUrgency);
  statuses = vacancyStatuses;
  searchSkill = new FormControl('');
  searchValue: string = '';
  vacancy?: VacancyView;

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
      cellRenderer: (params: ICellRendererParams<ApplicantView>) => {
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
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.setFilterFormListeners();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
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
    this.filterForm.valueChanges.subscribe(() => this.getApplicants());
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

  getVacancyById(id: string) {
    this.api.v1SpaceVacancyDetail(id, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.vacancy = new VacancyView(data.body.data);
          this.filterForm.controls['vacancy_name'].patchValue(this.vacancy.vacancy_name);
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  onSearch() {
    console.log(this.filterForm.value);
  }

  onBack() {
    window.history.back();
  }


}
