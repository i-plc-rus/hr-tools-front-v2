import {Component, OnInit} from '@angular/core';
import {UsersModalService} from '../../../services/users-modal.service';
import {ColDef, GridApi, GridOptions, GridReadyEvent, ICellRendererParams} from 'ag-grid-community';
import {TableButtonComponent} from './table-button/table-button.component';
import {TableSpinnerComponent} from './table-spinner/table-spinner.component';
import {User} from '../../../models/User';


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
      field: 'roleName',
      headerName: 'Роль',
      headerClass: 'font-medium',
      flex: 1
    },
    {
      field: 'is_active',
      headerName: 'Статус',
      headerClass: 'font-medium',
      flex: 1,
      cellRenderer: (params: ICellRendererParams<User>) => {
        if (params.value === true) {
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
    overlayNoRowsTemplate: 'Нет записей',
    loadingOverlayComponent: TableSpinnerComponent,
    loading: true,
  }

  constructor(private modalService: UsersModalService) { }

  ngOnInit() {
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.getUsers();
  }

  getUsers() {
    this.gridApi.setGridOption("loading", true);
    this.modalService.getUsers().subscribe((res) => {
      this.usersList = res;
      this.gridApi.setGridOption("rowData", this.usersList);
      this.gridApi.setGridOption("loading", false);
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
    this.gridApi.setGridOption("quickFilterText", this.searchValue);
  }

}