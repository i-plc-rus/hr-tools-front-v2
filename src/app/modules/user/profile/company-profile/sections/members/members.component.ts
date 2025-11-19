import {computed, Component, DestroyRef, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ColDef, GridApi, GridOptions, GridReadyEvent} from 'ag-grid-community';
import {ApiService} from '../../../../../../api/Api';
import {SpaceapimodelsSpaceUser} from '../../../../../../api/data-contracts';
import {UsersModalService} from '../../../../../../services/users-modal.service';
import {LoaderComponent} from '../../../../../../components/loader/loader.component';
import {CellMemberAvatarComponent} from './ag-grid-cells/cell-member-avatar/cell-member-avatar.component';
import {CellMemberContactsComponent} from './ag-grid-cells/cell-member-contacts/cell-member-contacts.component';
import {TableButtonComponent} from '../../../../users-list/table-button/table-button.component';
import {SpaceUser as User} from '../../../../../../models/SpaceUser';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {FilterStateService} from '../../../services/filter-state.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {
  private gridApi!: GridApi<SpaceapimodelsSpaceUser>;

  participants: SpaceapimodelsSpaceUser[] = [];
  searchControl = new FormControl<string>('');
  private searchValue = '';
  filterStateService = inject(FilterStateService);
  isFilterOpened = computed(() => this.filterStateService.getFilterOpenedSignal()());

  colDefs: ColDef<SpaceapimodelsSpaceUser>[] = [

    {
      headerName: 'ФИО',
      headerClass: 'font-medium custom-sort-header',
      width: 368,
      cellRenderer: CellMemberAvatarComponent,
      sortable: true,
      comparator: (valueA, valueB, nodeA, nodeB) => {
        const userA = nodeA.data;
        const userB = nodeB.data;

        const lastNameA = userA?.last_name || '';
        const lastNameB = userB?.last_name || '';

        const lastNameComparison = lastNameA.localeCompare(lastNameB, 'ru');

        if (lastNameComparison === 0) {
          const firstNameA = userA?.first_name || '';
          const firstNameB = userB?.first_name || '';
          return firstNameA.localeCompare(firstNameB, 'ru');
        }

        return lastNameComparison;
      }
    },
    {
      headerName: 'Контакты',
      headerClass: 'font-medium',
      cellRenderer: CellMemberContactsComponent,
      sortable: false,
    },
    {
      headerName: 'Роль',
      headerClass: 'font-medium',
      field: 'role',
      sortable: false,
    },
    {
      headerName: 'Должность',
      headerClass: 'font-medium',
      field: 'job_title_name',
      sortable: false,
    },
    {
      headerName: '',
      cellClass: 'flex justify-center items-center',
      width: 150,
      sortable: false,
      cellRenderer: TableButtonComponent,
      cellRendererParams: {
        onEdit: this.openEditMemberModal.bind(this),
        onDelete: this.openDeleteMemberModal.bind(this),
      }
    }
  ];

  gridOptions: GridOptions = {
    onGridReady: this.onGridReady.bind(this),
    columnDefs: this.colDefs,
    rowData: this.participants,
    overlayNoRowsTemplate: '<span class="text-[32px] leading-10">Кандидаты отсутствуют</span>',
    loadingOverlayComponent: LoaderComponent,
    loading: true,
    suppressScrollOnNewData: true,
    rowHeight: 72,
    headerHeight: 48,
    suppressMovableColumns: true,
    suppressMenuHide: false,
    unSortIcon: true
  };

  rowCount= 0
  private currentPage = 1;
  private pageSize = 50;
  private loading = false;
  private allDataLoaded = false;


  private destroyRef = inject(DestroyRef);


  constructor(
    private api: ApiService,
    private modalService: UsersModalService
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        this.searchValue = (value ?? '').trim();
        this.getParticipants(false, true);
      });
  }

  onFilterToggle(checked: boolean): void {
    this.filterStateService.setFilterOpened(checked);
  }

  onSearch(): void {
    const currentValue = this.searchControl.value;
    this.searchValue = (currentValue ?? '').trim();
    this.getParticipants(false, true);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.addEventListener('bodyScroll', this.onGridScroll.bind(this));
    this.getParticipants();
  }

  onGridScroll = (event: any) => {
    if (this.loading || this.allDataLoaded) return;

    const api = event.api;
    const lastVisibleRow = api.getLastDisplayedRowIndex();
    const rowCount = api.getDisplayedRowCount();

    if (lastVisibleRow >= rowCount - 5) {
      this.getParticipants(true);
    }
  }

  getParticipants(loadMore = false, force = false): void {
    if (this.loading && !force) return;
    if (loadMore && this.allDataLoaded) return;

    this.loading = true;

    if (!loadMore) {
      this.currentPage = 1;
      this.participants = [];
      this.allDataLoaded = false;
      if (this.gridApi) {
        this.gridApi.setGridOption('rowData', []);
        this.gridApi.setGridOption('loading', true);
      }
    }

    const currentSearch = this.searchValue;

    this.api.v1UsersListCreate({
      page: this.currentPage,
      limit: this.pageSize,
      search: currentSearch || undefined
    }).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: (res: any) => {
        if (this.searchValue !== currentSearch) {
          this.loading = false;
          if (this.gridApi) {
            this.gridApi.setGridOption('loading', false);
          }
          return;
        }

        if (res.body?.data) {
          const newParticipants = res.body.data;
          this.participants = [...this.participants, ...newParticipants];
          if (this.gridApi) {
            this.gridApi.setGridOption('rowData', this.participants);
          }

          this.rowCount = res.body?.row_count ?? this.rowCount;

          if (newParticipants.length < this.pageSize) {
            this.allDataLoaded = true;
          } else {
            this.currentPage++;
          }
        }

        if (this.gridApi) {
          this.gridApi.setGridOption('loading', false);
        }
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        if (this.gridApi) {
          this.gridApi.setGridOption('loading', false);
        }
        this.loading = false;
      }
    });
  }

  openAddMemberModal(): void {
    this.modalService.addMemberModal()
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((newUser: SpaceapimodelsSpaceUser | undefined) => {
      if (newUser) {
        this.participants = [newUser, ...this.participants];
        this.gridApi.setGridOption('rowData', [...this.participants]);
      }
    });
  }


  openEditMemberModal(user: SpaceapimodelsSpaceUser): void {
    this.modalService.editMemberModal(user.id!).subscribe((updatedUser: SpaceapimodelsSpaceUser | undefined) => {
      if (updatedUser) {
        console.log('Пользователь отредактирован!', updatedUser);

        const index = this.participants.findIndex(p => p.id === updatedUser.id);
        if (index !== -1) {
          this.participants[index] = updatedUser;

          this.gridApi.setGridOption('rowData', [...this.participants]);
        }
      } else {
        console.log('Редактирование отменено или не сохранено.');
      }
    });
  }

  openDeleteMemberModal(user: SpaceapimodelsSpaceUser): void {
    const wrappedUser = new User(user);
    this.modalService.deleteUserModal(wrappedUser)
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.getParticipants();
    });
  }

  openLicenseExtensionModal(): void {
    this.modalService.openLicenseExtensionModal()
      .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((formData: any) => {
      if (formData) {
        console.log('Получены данные формы:', formData);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.gridApi && !this.gridApi.isDestroyed()) {
      this.gridApi.removeEventListener('bodyScroll', this.onGridScroll);
    }
  }
}
