import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScreenWidthService} from '../../../services/screen-width.service';
import {VacancyRequestView} from '../../../models/VacancyRequest';
import {ApiService} from '../../../api/Api';
import {
  DictapimodelsCityView,
  ModelsVRSelectionType,
  ModelsVRStatus,
  SpaceapimodelsSpaceUser,
  VacancyapimodelsSearchPeriod,
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
import {Subject, Subscription, switchMap} from 'rxjs';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss'
})
export class RequestListComponent implements OnInit, OnDestroy {
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
  category = new FormControl<ModelsVRStatus | 'favorites' | ''>('');
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
  isLoading = false;
  requestList: VacancyRequestView[] = [];
  favoritesCount: number = 0;
  private searchSubscription: Subscription = new Subscription();

  private destroy$ = new Subject<void>();


  constructor(
    public screen: ScreenWidthService,
    private modalService: VacancyModalService,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRequests();
    this.getUsers();
    this.setFormListeners();
  }

  getRequests() {
    this.isLoading = true;
    const filter: VacancyapimodelsVrFilter = this.filterForm.value as VacancyapimodelsVrFilter;
    if (filter.search_from)
      filter.search_from = dayjs(filter.search_from).format('DD.MM.YYYY');
    if (filter.search_to)
      filter.search_to = dayjs(filter.search_to).format('DD.MM.YYYY');
    this.api.v1SpaceVacancyRequestListCreate(filter, {observe: 'response'}).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.favoritesCount = 0;
          this.requestList = data.body.data.map((request: VacancyapimodelsVacancyRequestView) => {
            if (request.favorite)
              this.favoritesCount++;
            return new VacancyRequestView(request)
          });
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    })
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
      .pipe(debounceTime(700),
        distinctUntilChanged(),
        takeUntil(this.destroy$))
      .subscribe(() => {
        this.getRequests();
      });


     this.searchValue.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        switchMap(value => {
          this.filterForm.controls.search.setValue(value);
          return [];
        })
      )
       .subscribe();
  }

  openComment(comment: string) {
    this.modalService.openCommentModal(comment);
  }

  changeStatus(id: string, status: ModelsVRStatus) {
    let observable;
    switch (status) {
      case ModelsVRStatus.VRStatusAccepted:
        observable = this.api.v1SpaceVacancyRequestApproveUpdate(id, {});
        break;
      case ModelsVRStatus.VRStatusNotAccepted:
        observable = this.api.v1SpaceVacancyRequestRejectUpdate(id, {});
        break;
      case ModelsVRStatus.VRStatusCanceled:
        observable = this.api.v1SpaceVacancyRequestCancelUpdate(id, {});
        break;
      case ModelsVRStatus.VRStatusUnderAccepted:
        observable = this.api.v1SpaceVacancyRequestOnApprovalUpdate(id, {});
        break;
      case ModelsVRStatus.VRStatusUnderRevision:
        observable = this.api.v1SpaceVacancyRequestToRevisionUpdate(id, {});
        break;
    }
    console.log(id, status);
    if (observable)
      observable.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.getRequests();
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  toggleFavorite(id: string, set: boolean) {
    this.api.v1SpaceVacancyRequestFavoriteUpdate(id, {set}, {observe: 'response'}).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.getRequests();
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  togglePin(id: string, set: boolean) {
    this.api.v1SpaceVacancyRequestPinUpdate(id, {set}, {observe: 'response'}).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.getRequests();
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}
