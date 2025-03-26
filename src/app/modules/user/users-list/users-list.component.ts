import {Component, OnInit} from '@angular/core';
import {UsersModalService} from '../../../services/users-modal.service';
import {ColDef, GridApi, GridOptions, GridReadyEvent, ICellRendererParams, ValueGetterParams} from 'ag-grid-community';
import {TableButtonComponent} from './table-button/table-button.component';
import {LoaderComponent} from '../../../components/loader/loader.component';
import {SpaceUser as User} from '../../../models/SpaceUser';
import {ApiService} from '../../../api/Api';
import {SpaceapimodelsSpaceUser} from '../../../api/data-contracts';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  private gridApi!: GridApi<User>;
  searchValue: string = '';

  usersList: User[] = [];
  colDefs: ColDef<User>[] = [
    {
      field: 'fullName',
      headerName: 'Имя',
      headerClass: 'font-medium',
      flex: 2
    },
    {
      field: 'email',
      headerName: 'Email',
      headerClass: 'font-medium',
      flex: 1
    },
    {
      headerName: 'Роль',
      headerClass: 'font-medium',
      flex: 1,
      valueGetter: (params: ValueGetterParams<User>) => {
        if (params.data?.is_admin === true) {
          return 'Администратор';
        } else {
          return 'Пользователь';
        }
      }
    },
    {
      // field: 'is_active',  //todo проверка на работает или уволен
      headerName: 'Статус',
      headerClass: 'font-medium',
      flex: 1,
      cellRenderer: (params: ICellRendererParams<User>) => {
        if (true) {
          return `<span class="bg-[var(--status-color-success-bg)] text-[var(--status-color-success-text)] text-[12px] leading-4 px-2 py-1 rounded-lg">Работает</span>`;
        } else {
          return `<span class="bg-[var(--status-color-danger-bg)] text-[var(--status-color-danger-text)] text-[12px] leading-4 px-2 py-1 rounded-lg">Уволен</span>`;
        }
      }
    },
    {
      headerName: '',
      cellClass: 'flex justify-center items-center',
      width: 150,
      sortable: false,
      cellRenderer: TableButtonComponent,
      cellRendererParams: {
        onEdit: this.openEditUserModal.bind(this),
        onDelete: this.openDeleteUserModal.bind(this),
      }
    }
  ];
  gridOptions: GridOptions = {
    onGridReady: this.onGridReady.bind(this),
    columnDefs: this.colDefs,
    rowData: this.usersList,
    overlayNoRowsTemplate: '<span class="text-[32px] leading-10">Пользователи отсутствуют</span>',
    loadingOverlayComponent: LoaderComponent,
    loading: true,
  }

  constructor(
    private modalService: UsersModalService,
    private api: ApiService
  ) { }

  ngOnInit() {
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getUsers();
  }

  getUsers() {
    this.gridApi.setGridOption('loading', true);
    this.api.v1UsersListCreate({}).subscribe({
      next: (res: any) => {
        if (res.body.data) {
          this.usersList = res.body.data.map((user: SpaceapimodelsSpaceUser) => new User(user));
          this.gridApi.setGridOption('rowData', this.usersList);
          this.gridApi.setGridOption('loading', false);
        }
        console.log(this.usersList)
      },
      error: (error) => {
        console.log(error);
        this.gridApi.setGridOption('loading', false);
      }
    });
  }

  openAddUserModal() {
    this.modalService.addUserModal().subscribe(() => {
      console.log('user added');
      this.getUsers();
    });
  }

  openEditUserModal(user: User) {
    this.modalService.editUserModal(user).subscribe(() => {
      console.log('user edited');
      this.getUsers();
    });
  }

  openDeleteUserModal(user: User) {
    this.modalService.deleteUserModal(user).subscribe(() => {
      console.log('user deleted');
      this.getUsers();
    });
  }

  onSearch() {
    this.gridApi.setGridOption('quickFilterText', this.searchValue);
  }

  onSearchChange(value: string) {
    this.searchValue = value;
    this.onSearch();
  }
}
