import {AfterViewInit, Component, DestroyRef, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {
  VacancyapimodelsVacancyFilter,
  VacancyapimodelsVacancySort,
  DictapimodelsCityView,
  DictapimodelsDepartmentView,
  ModelsVacancyStatus,
  ModelsVRSelectionType,
  ModelsVRType,
  ModelsVRUrgency,
  SpaceapimodelsSpaceUser,
  VacancyapimodelsVacancyView,
} from '../../../api/data-contracts';
import {VacancyModalService} from '../../../services/vacancy-modal.service';
import {ApiService} from '../../../api/Api';
import {VacancyView} from '../../../models/Vacancy';
import {SpaceUser} from '../../../models/SpaceUser';
import {vacancyStatuses} from '../user-consts';
import {Subscription} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrl: './vacancy-list.component.scss'
})
export class VacancyListComponent implements OnInit, AfterViewInit, OnDestroy {
  // фильтр
  sortByDesc = true;
  filterForm = new FormGroup({
    search: new FormControl(''),
    author_id: new FormControl('', {nonNullable: true}),
    city_id: new FormControl('', {nonNullable: true}),
    department_id: new FormControl(''),
    favorite: new FormControl(false),
    request_author_id: new FormControl('', {nonNullable: true}),
    request_id: new FormControl(''),
    request_type: new FormControl<ModelsVRType | undefined>(undefined),
    selection_type: new FormControl<ModelsVRSelectionType | undefined>(undefined),
    sort: new FormControl<VacancyapimodelsVacancySort>({created_at_desc: this.sortByDesc}, {nonNullable: true}),
    statuses: new FormControl<ModelsVacancyStatus[]>([]),
    urgency: new FormControl<ModelsVRUrgency | undefined>(undefined),
  });
  category = new FormControl<'all' | 'favorites' | 'my'>('all');
  searchCity = new FormControl('');
  searchAuthor = new FormControl('');
  searchRequestAuthor = new FormControl('');
  searchValue = new FormControl('');

  // справочники
  requestTypes = Object.values(ModelsVRType);
  selectionTypes = Object.values(ModelsVRSelectionType);
  urgencies = Object.values(ModelsVRUrgency);
  statuses = vacancyStatuses;
  cities: DictapimodelsCityView[] = [];
  departments: DictapimodelsDepartmentView[] = [];
  users: SpaceUser[] = [];
  requestAuthors: SpaceUser[] = [];
  authors: SpaceUser[] = [];
  userId = localStorage.getItem('userId') || '';

  // вакансии
  isLoading: boolean = true;
  vacancyList: VacancyView[] = [];
  favoritesCount: number = 0;
  private searchSubscription: Subscription = new Subscription();

  @ViewChild('vacancyContainer', { static: false }) vacancyContainer!: ElementRef;

  private currentPage = 1;
  private pageSize = 50;
  private loading = false;
  private allDataLoaded = false;

  private destroyRef = inject(DestroyRef);


  constructor(
    private modalService: VacancyModalService,
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.getVacancyList();
    this.getDepartments();
    this.getUsers();
    this.setFormListeners();
  }

  ngAfterViewInit(): void {
    if (this.vacancyContainer && this.vacancyContainer.nativeElement) {
      this.vacancyContainer.nativeElement.addEventListener('scroll', this.onScroll);
    }
  }

  onScroll = (event: Event) => {
    if (this.loading || this.allDataLoaded) return;

    const element = event.target as HTMLElement;
    const scrollPosition = element.scrollTop;
    const totalHeight = element.scrollHeight;
    const viewportHeight = element.clientHeight;

    if (scrollPosition + viewportHeight > totalHeight * 0.8) {
      const currentScrollPosition = element.scrollTop;
      this.getVacancyList(true);
      setTimeout(() => {
        element.scrollTop = currentScrollPosition;
      });
    }
  };


  getVacancyList(loadMore = false) {

    this.loading = true;

    if (!loadMore) {
      this.currentPage = 1;
      this.vacancyList = [];
      this.allDataLoaded = false;
      this.favoritesCount = 0;
    }

    const filter: VacancyapimodelsVacancyFilter = this.filterForm.value as VacancyapimodelsVacancyFilter;
    filter.page = this.currentPage;
    filter.limit = this.pageSize;

    this.api.v1SpaceVacancyListCreate(filter, {observe: 'response'})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: (data) => {
        if (data.body?.data) {
          const newVacancies = data.body.data.map((vacancy: VacancyapimodelsVacancyView) => {
            if (vacancy.selection_stages)
              vacancy.selection_stages = vacancy.selection_stages.sort((a, b) => (a.stage_order || 0) - (b.stage_order || 0));
            if (vacancy.favorite)
              this.favoritesCount++;
            return new VacancyView(vacancy);
          });

          this.vacancyList = [...this.vacancyList, ...newVacancies];

          if (newVacancies.length < this.pageSize) {
            this.allDataLoaded = true;
          } else {
            this.currentPage++;
          }
        }
        this.loading = false;
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }


  changeStatus(id: string, status: ModelsVacancyStatus) {
    this.api.v1SpaceVacancyChangeStatusUpdate(id, {status}, {observe: 'response'})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: () => {
        this.getVacancyList();
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  toggleFavorite(id: string, set: boolean) {
    this.api.v1SpaceVacancyFavoriteUpdate(id, {set}, {observe: 'response'})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: () => {
        if (!set && this.category.value === 'favorites' && this.favoritesCount === 1) {
          this.category.setValue('all');
        }
        const index = this.vacancyList.findIndex(item => item.id === id);
        this.vacancyList[index].favorite = set; 
        // this.getVacancyList();
      },
      error: (error) => {
        console.log(error);
      },
    })
  }


  togglePin(id: string, set: boolean) {
    this.api.v1SpaceVacancyPinUpdate(id, {set}, {observe: 'response'})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: () => {
        const index = this.vacancyList.findIndex(item => item.id === id);
        this.vacancyList[index].pinned = set; 
        // this.getVacancyList();
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  setFormListeners() {
    this.category.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((category) => {
        if (!category)
          category = 'all';
        const isFavorite = category === 'favorites' ? true : false;
        const isMyVacancies = category === 'my' ? true : false;
        this.filterForm.controls.favorite.setValue(isFavorite);
        this.filterForm.controls.author_id.setValue(isMyVacancies ? this.userId : '');
      });

    this.searchCity.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef),debounceTime(200), distinctUntilChanged())
      .subscribe((newValue) => {
        if (this.filterForm.controls.city_id.value !== '')
          this.filterForm.controls.city_id.setValue('');
        if (newValue && newValue.length > 0)
          this.getCities(newValue);
        else
          this.cities = [];
      });

    this.searchAuthor.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef),debounceTime(700), distinctUntilChanged())
      .subscribe((newValue) => {
        if (this.filterForm.controls.author_id.value !== '')
          this.filterForm.controls.author_id.setValue('');
        if (newValue && newValue.length > 3)
          this.authors = this.users.filter(user => user.fullName.toLowerCase().includes(newValue.toLowerCase()));
        else
          this.authors = [];
      });

    this.searchRequestAuthor.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef),debounceTime(700), distinctUntilChanged())
      .subscribe((newValue) => {
        if (this.filterForm.controls.request_author_id.value !== '')
          this.filterForm.controls.request_author_id.setValue('');
        if (newValue && newValue.length > 3)
          this.requestAuthors = this.users.filter(user => user.fullName.toLowerCase().includes(newValue.toLowerCase()));
        else
          this.requestAuthors = [];
      });

    this.filterForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef),debounceTime(200), distinctUntilChanged())
      .subscribe(() => {
        this.allDataLoaded = false;
        this.loading = false;
        this.currentPage = 1;
        this.vacancyList = [];
        this.getVacancyList();
      });

    this.searchSubscription = this.searchValue.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        this.filterForm.controls.search.setValue(value);
        this.allDataLoaded = false;
        this.currentPage = 1;
        this.vacancyList = [];
        this.getVacancyList();
      });
  }

  search() {
    this.filterForm.controls.search.setValue(this.searchValue.value);
  }

  reset() {
    this.searchValue.reset();
    this.category.setValue('all');
    this.searchCity.reset();
    this.searchAuthor.reset();
    this.searchRequestAuthor.reset();

    this.filterForm.reset();

    this.filterForm.controls.sort.setValue({created_at_desc: this.sortByDesc});
  }


  sort() {
    this.sortByDesc = !this.sortByDesc;
    this.filterForm.controls.sort.setValue({created_at_desc: this.sortByDesc});
  }

  openComment(vacancyId: string) {
    this.modalService.openCommentModal(vacancyId, false);
  }

  getCities(address: string) {
    this.api.v1DictCityFindCreate({address}, {observe: 'response'})
      .pipe(takeUntilDestroyed(this.destroyRef))
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

  getDepartments() {
    this.api.v1DictDepartmentFindCreate({}, {observe: 'response'})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.departments = data.body.data;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUsers() {
    this.api.v1UsersListCreate({})
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
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

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    if (this.vacancyContainer && this.vacancyContainer.nativeElement) {
      this.vacancyContainer.nativeElement.removeEventListener('scroll', this.onScroll);
    } else {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

}
