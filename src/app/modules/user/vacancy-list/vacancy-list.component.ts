import {Component, OnInit} from '@angular/core';
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
  VacancyapimodelsVacancyView
} from '../../../api/data-contracts';
import {VacancyModalService} from '../../../services/vacancy-modal.service';
import {ApiService} from '../../../api/Api';
import {VacancyView} from '../../../models/Vacancy';
import {SpaceUser} from '../../../models/SpaceUser';
import {vacancyStatuses} from '../user-consts';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrl: './vacancy-list.component.scss'
})
export class VacancyListComponent implements OnInit {
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
  isLoading: boolean = false;
  vacancyList: VacancyView[] = [];
  favoritesCount: number = 0;

  constructor(
    private modalService: VacancyModalService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getVacancyList();
    this.getDepartments();
    this.getUsers();
    this.setFormListeners();
  }

  getVacancyList() {
    this.isLoading = true;
    const filter: VacancyapimodelsVacancyFilter = this.filterForm.value as VacancyapimodelsVacancyFilter;
    this.api.v1SpaceVacancyListCreate(filter, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.favoritesCount = 0;
          this.vacancyList = data.body.data.map((vacancy: VacancyapimodelsVacancyView) => {
            if (vacancy.selection_stages)
              vacancy.selection_stages = vacancy.selection_stages.sort((a, b) => (a.stage_order || 0) - (b.stage_order || 0));
            if (vacancy.favorite)
              this.favoritesCount++;
            return new VacancyView(vacancy);
          });

          if (this.category.value === 'favorites' && this.favoritesCount === 0) {
            this.category.setValue('all');
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }


  changeStatus(id: string, status: ModelsVacancyStatus) {
    this.api.v1SpaceVacancyChangeStatusUpdate(id, {status}, {observe: 'response'}).subscribe({
      next: () => {
        this.getVacancyList();
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  toggleFavorite(id: string, set: boolean) {
    this.api.v1SpaceVacancyFavoriteUpdate(id, {set}, {observe: 'response'}).subscribe({
      next: () => {
        if (!set && this.category.value === 'favorites' && this.favoritesCount === 1) {
          this.category.setValue('all');
        }
        this.getVacancyList();
      },
      error: (error) => {
        console.log(error);
      },
    })
  }


  togglePin(id: string, set: boolean) {
    this.api.v1SpaceVacancyPinUpdate(id, {set}, {observe: 'response'}).subscribe({
      next: () => {
        this.getVacancyList();
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  setFormListeners() {
    this.category.valueChanges
      .subscribe((category) => {
        if (!category)
          category = 'all';
        const isFavorite = category === 'favorites' ? true : false;
        const isMyVacancies = category === 'my' ? true : false;
        this.filterForm.controls.favorite.setValue(isFavorite);
        this.filterForm.controls.author_id.setValue(isMyVacancies ? this.userId : '');
      });

    this.searchCity.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((newValue) => {
        if (this.filterForm.controls.city_id.value !== '')
          this.filterForm.controls.city_id.setValue('');
        if (newValue && newValue.length > 0)
          this.getCities(newValue);
        else
          this.cities = [];
      });

    this.searchAuthor.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((newValue) => {
        if (this.filterForm.controls.author_id.value !== '')
          this.filterForm.controls.author_id.setValue('');
        if (newValue && newValue.length > 3)
          this.authors = this.users.filter(user => user.fullName.toLowerCase().includes(newValue.toLowerCase()));
        else
          this.authors = [];
      });

    this.searchRequestAuthor.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((newValue) => {
        if (this.filterForm.controls.request_author_id.value !== '')
          this.filterForm.controls.request_author_id.setValue('');
        if (newValue && newValue.length > 3)
          this.requestAuthors = this.users.filter(user => user.fullName.toLowerCase().includes(newValue.toLowerCase()));
        else
          this.requestAuthors = [];
      });

    this.filterForm.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe(() => {
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

  openComment(comment: string) {
    this.modalService.openCommentModal(comment);
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

  getDepartments() {
    this.api.v1DictDepartmentFindCreate({}, {observe: 'response'}).subscribe({
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
    this.api.v1UsersListCreate({}).subscribe({
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
}
