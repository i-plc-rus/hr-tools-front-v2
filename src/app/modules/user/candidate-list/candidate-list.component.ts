import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApplicantapimodelsApplicantFilter, ApplicantapimodelsApplicantView, ModelsVRSelectionType, ModelsVRType, ModelsVRUrgency} from '../../../api/data-contracts';
import {ApiService} from '../../../api/Api';
import {ColDef, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, RowClickedEvent, ValueFormatterParams, ValueGetterParams} from 'ag-grid-community';
import {LoaderComponent} from '../../../components/loader/loader.component';
import {TableCandidateNameComponent} from '../table-candidate-name/table-candidate-name.component';
import {ApplicantView} from '../../../models/Applicant';
import {CandidateModalService} from '../../../services/candidate-modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
})
export class СandidateListComponent {
  // фильтр
  filterForm = new FormGroup({
    education: new FormControl(''),
    skills: new FormControl(''),
    experience: new FormControl('')
  });
  educationTypes = Object.values(ModelsVRType);
  skillsTypes = Object.values(ModelsVRSelectionType);
  experienceTypes = Object.values(ModelsVRUrgency);
  searchSkill = new FormControl('');
  searchValue: string = '';

  //кандидаты
  private gridApi!: GridApi<ApplicantView>;
  applicantsList: ApplicantView[] = [];
  colDefs: ColDef<ApplicantView>[] = [
    {
      headerName: 'Кандидаты',
      headerClass: 'font-medium',
      width: 320,
      minWidth: 200,
      cellRenderer: TableCandidateNameComponent,
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
    onRowClicked: this.onRowClicked.bind(this),
    columnDefs: this.colDefs,
    rowData: this.applicantsList,
    overlayNoRowsTemplate: '<span class="text-[32px] leading-10">Кандидаты отсутствуют</span>',
    loadingOverlayComponent: LoaderComponent,
    loading: true,
    suppressMovableColumns: true,
  }

  constructor(
    private modalService: CandidateModalService,
    private api: ApiService,
    private router: Router,
  ) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getApplicants();
  }

  onRowClicked(params: RowClickedEvent) {
    this.router.navigate([`user/candidates/${params.data?.id}`]);
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

  openAddApplicantModal() {
    this.modalService.addCandidateModal().subscribe(() =>
      this.getApplicants()
    );
  }

  onSearch() {
    console.log(this.filterForm.value);
  }

  onBack() {
    window.history.back();
  }


}
