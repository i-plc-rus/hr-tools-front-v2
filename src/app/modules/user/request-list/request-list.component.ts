import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ScreenWidthService} from '../../../services/screen-width.service';
import {VacancyRequestView} from '../../../models/VacancyRequest';
import {ApiService} from '../../../api/Api';
import {
  DictapimodelsCityView,
  ModelsVRSelectionType,
  ModelsVRStatus,
  SpaceapimodelsSpaceUser,
  VacancyapimodelsSearchPeriod, VacancyapimodelsVacancyRequestData,
  VacancyapimodelsVacancyRequestView,
  VacancyapimodelsVrFilter,
  VacancyapimodelsVrSort
} from '../../../api/data-contracts';
import {VacancyModalService} from '../../../services/vacancy-modal.service';
import {StatusTag} from '../../../models/StatusTag';
import {FormControl, FormGroup} from '@angular/forms';
import {SpaceUser} from '../../../models/SpaceUser';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import dayjs from 'dayjs';
import { Router } from '@angular/router';
import {forkJoin, Subject, Subscription, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {SnackBarService} from '../../../services/snackbar.service';
// import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
// import { DateAdapterRus, RUS_DATE_FORMATS } from '../../../adapters/ru-date.adapter';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss',
//   providers: [
//     {
//         provide: DateAdapter, useClass: DateAdapterRus
//     },
//     {
//         provide: MAT_DATE_FORMATS, useValue: RUS_DATE_FORMATS
//     },
//  ]
})
export class RequestListComponent implements OnInit, AfterViewInit, OnDestroy {
  // фильтр
  sortByDesc = true;
  filterForm = new FormGroup({
    search: new FormControl(''),
    author_id: new FormControl('', {nonNullable: true}),
    city_id: new FormControl('', {nonNullable: true}),
    favorite: new FormControl<boolean | undefined>(undefined),
    search_from: new FormControl(''),
    search_to: new FormControl(''),
    search_period: new FormControl<VacancyapimodelsSearchPeriod | undefined>(undefined),
    selection_type: new FormControl<ModelsVRSelectionType | undefined>(undefined),
    sort: new FormControl<VacancyapimodelsVrSort>({created_at_desc: this.sortByDesc}, {nonNullable: true}),
    statuses: new FormControl<ModelsVRStatus[]>([]),
  })
  category = new FormControl<ModelsVRStatus | '' | 'favorites'>('');
  searchValue = new FormControl('');
  searchCity = new FormControl('');
  searchRequestAuthor = new FormControl('');

  // справочники
  statuses: {className: StatusTag; value: ModelsVRStatus}[] = [
    {className: 'info', value: ModelsVRStatus.VRStatusCreated},
    {className: 'warning', value: ModelsVRStatus.VRStatusUnderRevision},
    {className: 'warning', value: ModelsVRStatus.VRStatusUnderAccepted},
    {className: 'success', value: ModelsVRStatus.VRStatusAccepted},
    {className: 'danger', value: ModelsVRStatus.VRStatusCanceled},
    {className: 'danger', value: ModelsVRStatus.VRStatusNotAccepted},
  ];
  selectionTypes = Object.values(ModelsVRSelectionType);
  searchPeriodTypes: {label: string, value: VacancyapimodelsSearchPeriod}[] = [
    {label: 'За сегодня', value: VacancyapimodelsSearchPeriod.SearchByToday},
    {label: 'За 3 дня', value: VacancyapimodelsSearchPeriod.SearchBy3Days},
    {label: 'За неделю', value: VacancyapimodelsSearchPeriod.SearchByWeek},
    {label: 'За 30 дней', value: VacancyapimodelsSearchPeriod.SearchByMonth},
    {label: 'За период', value: VacancyapimodelsSearchPeriod.SearchByPeriod},
  ];
  cities: DictapimodelsCityView[] = [];
  users: SpaceUser[] = [];
  requestAuthors: SpaceUser[] = [];

  // вакансии
  isLoading = true;
  requestList: VacancyRequestView[] = [];
  favoritesCount: number = 0;
  private searchSubscription: Subscription = new Subscription();
  
  statusCounts: { [key: string]: number } = {
    'Создана': 0,
    'На доработке': 0,
    'На согласовании': 0,
    'Согласована': 0,
    'Не согласована': 0,
    'Отменена': 0
  };
  
  // Общее количество всех заявок
  totalRequestsCount: number = 0;

  private destroy$ = new Subject<void>();

  private currentPage = 1;
  private pageSize = 50;
  private loading = false;
  private allDataLoaded = false;

  @ViewChild('requestContainer') requestContainer!: ElementRef;

  constructor(
    public screen: ScreenWidthService,
    private modalService: VacancyModalService,
    private api: ApiService,
    private router: Router,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.getRequests();
    this.loadAllCounts();
    this.getUsers();
    this.setFormListeners();
  }

  ngAfterViewInit(): void {
    if (this.requestContainer && this.requestContainer.nativeElement) {
      this.requestContainer.nativeElement.addEventListener('scroll', this.onScroll);
    }
  }

  onScroll = (event: Event) => {
    if (this.loading || this.allDataLoaded) return;

    const element = event.target as HTMLElement;
    const scrollPosition = element.scrollTop;
    const totalHeight = element.scrollHeight;
    const viewportHeight = element.clientHeight;

    if (scrollPosition + viewportHeight > totalHeight * 0.8) {
      this.getRequests(true);
    }
  };


  getRequests(loadMore = false): void {

    this.loading = true;

    if (!loadMore) {
      this.currentPage = 1;
      this.requestList = [];
      this.allDataLoaded = false;
    }

    const formValues = this.filterForm.getRawValue();

    const isPeriodSearch = formValues.search_period === VacancyapimodelsSearchPeriod.SearchByPeriod;

    if (isPeriodSearch && (!formValues.search_from || !formValues.search_to)) {
      this.snackBarService.snackBarMessageError('Пожалуйста, укажите начало и конец периода');
      return;
    }
    const filter: VacancyapimodelsVrFilter = {
      author_id: formValues.author_id ?? '',
      city_id: formValues.city_id ?? '',
      favorite: formValues.favorite ?? undefined,
      search: formValues.search ?? '',
      search_period: formValues.search_period ?? undefined,
      selection_type: formValues.selection_type ?? undefined,
      sort: formValues.sort ?? {created_at_desc: this.sortByDesc},
      statuses: formValues.statuses ?? [],
      page: this.currentPage,
      limit: this.pageSize,
    };

    if (isPeriodSearch) {
      filter.search_from = formValues.search_from ? dayjs(formValues.search_from).format('DD.MM.YYYY') : '';
      filter.search_to = formValues.search_to ? dayjs(formValues.search_to).format('DD.MM.YYYY') : '';
    } else {
      filter.search_from = '';
      filter.search_to = '';
    }

    this.api.v1SpaceVacancyRequestListCreate(filter, { observe: 'response' })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.body?.data) {
            const newRequests = data.body.data.map((request: VacancyapimodelsVacancyRequestView) => new VacancyRequestView(request));

            this.requestList = [...this.requestList, ...newRequests];

            if (newRequests.length < this.pageSize) {
              this.allDataLoaded = true;
            } else {
              this.currentPage++;
            }
          }
          this.isLoading = false;
          this.loading = false;
        },
        error: (error) => {
          console.error('Ошибка при получении списка заявок:', error);
          this.loading = false;
        },
      });
  }
  setFormListeners() {
    this.category.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => {
        this.sortByDesc = true;
        this.filterForm.reset();
        if (!category)
          this.filterForm.controls.statuses.setValue([]);
        else if (category === 'favorites')
          this.filterForm.controls.favorite.setValue(true);
        else
          this.filterForm.controls.statuses.setValue([category]);
      });

    this.searchCity.valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )      .subscribe((newValue) => {
        if (this.filterForm.controls.city_id.value !== '')
          this.filterForm.controls.city_id.setValue('');
        if (newValue && newValue.length > 0)
          this.getCities(newValue);
        else
          this.cities = [];
      });


    this.searchRequestAuthor.valueChanges
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((newValue) => {
        if (this.filterForm.controls.author_id.value !== '')
          this.filterForm.controls.author_id.setValue('');
        if (newValue && newValue.length > 3)
          this.requestAuthors = this.users.filter(user => user.fullName.toLowerCase().includes(newValue.toLowerCase()));
        else
          this.requestAuthors = [];
      });

    this.filterForm.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe(() => {
        this.allDataLoaded = false;
        this.loading = false;
        this.currentPage = 1;
        this.requestList = [];
        this.getRequests();
      });



    this.searchValue.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.filterForm.controls.search.setValue(value);
        // this.allDataLoaded = false;
        // this.currentPage = 1;
        // this.requestList = [];
        // this.getRequests();
      });

    // this.filterForm.get('search_period')!.valueChanges
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(value => {
    //     if (value !== VacancyapimodelsSearchPeriod.SearchByPeriod) {
    //       this.filterForm.patchValue({
    //         search_from: '',
    //         search_to: ''
    //       }, { emitEvent: false });
    //     }

    //   });

    this.filterForm.get('search_from')!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        console.log(value)
        if (value) {
          if (this.filterForm.get('search_period')!.value !== VacancyapimodelsSearchPeriod.SearchByPeriod) {
            this.filterForm.get('search_period')!.setValue(VacancyapimodelsSearchPeriod.SearchByPeriod);
          }
        }
      });

    this.filterForm.get('search_to')!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value) {
          if (this.filterForm.get('search_period')!.value !== VacancyapimodelsSearchPeriod.SearchByPeriod) {
            this.filterForm.get('search_period')!.setValue(VacancyapimodelsSearchPeriod.SearchByPeriod);
          }
        }
      });

  }

  onSearchPeriodClick(value: VacancyapimodelsSearchPeriod) {
    const current = this.filterForm.get('search_period')!.value;
    const currentFrom = this.filterForm.get('search_from')!.value;
    const currentTo = this.filterForm.get('search_to')!.value;
    let isValidDate = false;

    if (value === VacancyapimodelsSearchPeriod.SearchByPeriod) {
      const dateObjectFrom = new Date(currentFrom!);
      const dateObjectTo = new Date(currentTo!);
      isValidDate = (dateObjectFrom instanceof Date && !isNaN(dateObjectFrom.getTime())) || (dateObjectTo instanceof Date && !isNaN(dateObjectTo.getTime()));
      if (isValidDate) {
        this.filterForm.patchValue({
          search_from: '',
          search_to: ''
        });
        this.filterForm.get('search_period')!.setValue(undefined);
      } 
    } else {
      // console.log('Is valid date:', this.filterForm.get('search_period')!.value);
      this.filterForm.patchValue({ 
        search_from: '',
        search_to: ''
      });
      if (current === value) {
        this.filterForm.get('search_period')!.setValue(value);
      }
    }
  }


  openComment(requestId: string) {
    this.modalService.openCommentModal(requestId, true).subscribe(data => {
        const foundRequest = this.requestList.findIndex(request => requestId === request.id);
        if (!this.requestList[foundRequest].comments) {
          this.requestList[foundRequest].comments = [];
        }
        this.requestList[foundRequest].comments.push(data);
      }
    );
  }

  changeStatus(id: string, status: ModelsVRStatus) {
    const request = this.requestList.find(item => item.id === id);
    if (!request) return;

    const body: VacancyapimodelsVacancyRequestData = {
      vacancy_name: request.vacancy_name,
      opened_positions: request.opened_positions,
      urgency: request.urgency,
      selection_type: request.selection_type,
      city_id: request.city_id,
      company_id: request.company_id,
      job_title_id: request.job_title_id,
      schedule: request.schedule,
      employment: request.employment,
      request_type: request.request_type,
      description: request.description,
      requirements: request.requirements,
      short_info: request.short_info,
      department_id: request.department_id,
      company_struct_id: request.company_struct_id,
      chief_fio: request.chief_fio,
      confidential: request.confidential,
      place_of_work: request.place_of_work,
      in_interaction: request.in_interaction,
      out_interaction: request.out_interaction,
      interviewer: request.interviewer,
    };

    let observable;
    switch (status) {
      case ModelsVRStatus.VRStatusAccepted:
        observable = this.api.v1SpaceVacancyRequestApproveUpdate(id, body, {observe: 'response'});
        break;
      case ModelsVRStatus.VRStatusNotAccepted:
        observable = this.api.v1SpaceVacancyRequestRejectUpdate(id, body, {observe: 'response'});
        break;
      case ModelsVRStatus.VRStatusCanceled:
        observable = this.api.v1SpaceVacancyRequestCancelUpdate(id, {observe: 'response'});
        break;
      case ModelsVRStatus.VRStatusUnderAccepted:
        observable = this.api.v1SpaceVacancyRequestOnApprovalUpdate(id,  {observe: 'response'});
        break;
      case ModelsVRStatus.VRStatusUnderRevision:
        observable = this.api.v1SpaceVacancyRequestToRevisionUpdate(id,  {observe: 'response'});
        break;
    }

    if (observable) {
      observable.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.currentPage = 1;
          this.allDataLoaded = false;
          this.requestList = [];
          this.getRequests();
          this.loadAllCounts();
        },
        error: (error) => {
          this.snackBarService.snackBarMessageError(JSON.parse(error.message).error.message)
        }
      });
    }
  }

  toggleFavorite(id: string, set: boolean) {
    this.api.v1SpaceVacancyRequestFavoriteUpdate(id, {set}, {observe: 'response'}).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        if (!set && this.category.value === 'favorites' && this.favoritesCount === 1) {
          this.category.setValue('');
        }
        const index = this.requestList.findIndex(item => item.id === id);
        this.requestList[index].favorite = set; 
        if (set) {
          this.favoritesCount++;
        } else {
          this.favoritesCount--;
        }
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  togglePin(id: string, set: boolean) {
    this.api.v1SpaceVacancyRequestPinUpdate(id, {set}, {observe: 'response'}).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        // this.getRequests();
        const index = this.requestList.findIndex(item => item.id === id);
        this.requestList[index].pinned = set; 
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  search() {
    this.filterForm.controls.search.setValue(this.searchValue.value);
  }

  reset() {
    this.searchValue.reset();
    this.category.setValue('');
    this.searchCity.reset();
    this.searchRequestAuthor.reset();
  }

  sort() {
    this.sortByDesc = !this.sortByDesc;
    this.filterForm.controls.sort.setValue({created_at_desc: this.sortByDesc});
  }


  getCities(address: string) {
    this.api.v1DictCityFindCreate({address}, {observe: 'response'}).pipe(takeUntil(this.destroy$)).subscribe({
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

  publishVacancy(id: string) {
    this.api.v1SpaceVacancyRequestPublishUpdate(id, {observe: 'response'}).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.getRequests();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getUsers() {
    this.api.v1UsersListCreate({}).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res: any) => {
        if (res.body.data) {
          this.users = res.body.data.map((user: SpaceapimodelsSpaceUser) => new SpaceUser(user));
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  show(id: string): void {
    this.router.navigate(['/user/request', id, 'approval'])
   }

  private loadAllCounts() {
    const statuses = [
      { key: 'Создана', value: ModelsVRStatus.VRStatusCreated },
      { key: 'На доработке', value: ModelsVRStatus.VRStatusUnderRevision },
      { key: 'На согласовании', value: ModelsVRStatus.VRStatusUnderAccepted },
      { key: 'Согласована', value: ModelsVRStatus.VRStatusAccepted },
      { key: 'Не согласована', value: ModelsVRStatus.VRStatusNotAccepted },
      { key: 'Отменена', value: ModelsVRStatus.VRStatusCanceled }
    ];

    // Создаем массив запросов для всех счетчиков
    const requests = [
      // Общее количество всех заявок
      this.api.v1SpaceVacancyRequestListCreate({
        page: 1,
        limit: 1,
        author_id: '',
        city_id: '',
        search: '',
        sort: { created_at_desc: this.sortByDesc }
      }, { observe: 'response' }),
      
      // Количество избранных заявок
      this.api.v1SpaceVacancyRequestListCreate({
        favorite: true,
        page: 1,
        limit: 1,
        author_id: '',
        city_id: '',
        search: '',
        statuses: [],
        sort: { created_at_desc: this.sortByDesc }
      }, { observe: 'response' }),
      
      // Количество по каждому статусу
      ...statuses.map(({ value }) => 
        this.api.v1SpaceVacancyRequestListCreate({
          statuses: [value],
          page: 1,
          limit: 1,
          author_id: '',
          city_id: '',
          search: '',
          sort: { created_at_desc: this.sortByDesc }
        }, { observe: 'response' })
      )
    ];

    forkJoin(requests)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (responses) => {
          // Общее количество заявок
          const totalCount = (responses[0].body as any)?.row_count;
          this.totalRequestsCount = typeof totalCount === 'number' ? totalCount : 0;

          // Количество избранных заявок
          const favoritesCount = (responses[1].body as any)?.row_count;
          this.favoritesCount = typeof favoritesCount === 'number' ? favoritesCount : 0;

          // Количество по статусам
          statuses.forEach(({ key }, index) => {
            const statusCount = (responses[index + 2].body as any)?.row_count;
            this.statusCounts[key] = typeof statusCount === 'number' ? statusCount : 0;
          });
        },
        error: () => {
          this.totalRequestsCount = 0;
          this.favoritesCount = 0;
          Object.keys(this.statusCounts).forEach(key => {
            this.statusCounts[key] = 0;
          });
        }
      });
  }

  getStatusCount(status: string): number {
    return this.statusCounts[status] || 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.requestContainer && this.requestContainer.nativeElement) {
      this.requestContainer.nativeElement.removeEventListener('scroll', this.onScroll);
    }
  }

  trackByValue(index: number, item: { value: VacancyapimodelsSearchPeriod }) {
    return item.value;
  }

}
