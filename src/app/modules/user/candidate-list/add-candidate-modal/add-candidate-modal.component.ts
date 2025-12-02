import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../api/Api';
import {ApplicantView, ApplicantViewExt} from '../../../../models/Applicant';
import {CandidateModalService} from '../../../../services/candidate-modal.service';
import {
  ApplicantapimodelsApplicantData,
  DictapimodelsCityView,
  DictapimodelsLangData,
  DictapimodelsLangView,
  ModelsApplicantSource,
  ModelsDriverLicenseType,
  ModelsEducationType,
  ModelsEmployment,
  ModelsGenderType,
  ModelsLanguageLevelType,
  ModelsRelocationType,
  ModelsSchedule,
  ModelsSearchStatusType,
  ModelsTripReadinessType,
  VacancyapimodelsVacancyFilter,
  VacancyapimodelsVacancyView
} from '../../../../api/data-contracts';
import {VacancyView} from '../../../../models/Vacancy';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  educationTypes,
  employmentTypes,
  genderTypes,
  languageLevelTypes,
  relocationTypes,
  scheduleTypes,
  searchStatusTypes,
  tripReadinessTypes
} from '../../user-consts';
import {forkJoin, of, Subject, switchMap} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {takeUntil} from 'rxjs/operators';
import { forbiddenPhoneNumberValidator } from '../../../../validators/phone';

class LanguageFormControls extends FormGroup {
  constructor() {
    super({
      name: new FormControl('', [Validators.required]),
      language_level: new FormControl<ModelsLanguageLevelType | ''>('', [Validators.required]),
    });
  }
}

@Component({
  selector: 'app-add-candidate-modal',
  templateUrl: './add-candidate-modal.component.html',
  styleUrl: './add-candidate-modal.component.scss',
})
export class AddCandidateModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() applicant?: ApplicantView | ApplicantViewExt;
  @Input() photo?: string;
  @Input() resumeName?: string;
  onSubmit = new EventEmitter<boolean>();
  isEdit = false;
  isLoading = false;
  private readonly allowedPattern = '^[a-zA-Zа-яА-Я\\s\\-]+$';
  errorMessage = 'Поле может содержать только буквы, пробелы и дефис';

  applicantForm = new FormGroup({
    address: new FormControl(''),
    birth_date: new FormControl(''),
    citizenship: new FormControl(''),
    comment: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    first_name: new FormControl('', [Validators.required, Validators.pattern(this.allowedPattern)]),
    last_name: new FormControl('', [Validators.required, Validators.pattern(this.allowedPattern)]),
    middle_name: new FormControl('', [Validators.required, Validators.pattern(this.allowedPattern)]),
    gender: new FormControl<ModelsGenderType | null>(null, Validators.required),

    params: new FormGroup({
      driver_license_types: new FormControl<ModelsDriverLicenseType[]>([]),
      education: new FormControl<ModelsEducationType | ''>(''),
      employments: new FormControl<ModelsEmployment[]>([]),
      have_additional_education: new FormControl<boolean | undefined>(undefined),
      languages: new FormArray<LanguageFormControls>([]),
      schedules: new FormControl<ModelsSchedule[]>([]),
      search_status: new FormControl<ModelsSearchStatusType | ''>(''),
      trip_readiness: new FormControl<ModelsTripReadinessType | ''>(''),
    }),
    phone: new FormControl('', [
        Validators.required,
        // Поскольку ngx-mask применяет формат, можно добавить только пользовательский валидатор
        forbiddenPhoneNumberValidator()
      ]),
    relocation: new FormControl<ModelsRelocationType | ''>(''),
    salary: new FormControl<number | undefined>(undefined),
    source: new FormControl<ModelsApplicantSource | undefined>(undefined, Validators.required),
    total_experience: new FormControl<number | undefined>(undefined),
    vacancy_id: new FormControl('', Validators.required),
  });
  driverLicenseTypes = Object.values(ModelsDriverLicenseType);
  sourceTypes = Object.values(ModelsApplicantSource);
  genderTypes = genderTypes;
  educationTypes = educationTypes;
  employmentTypes = employmentTypes;
  scheduleTypes = scheduleTypes;
  searchStatusTypes = searchStatusTypes;
  tripReadinessTypes = tripReadinessTypes;
  languageLevelTypes = languageLevelTypes;
  relocationTypes = relocationTypes;

  vacancyList: VacancyView[] = [];
  newCandidateResume?: File;
  newCandidatePhoto?: File;
  languagesList: DictapimodelsLangView[] = [];
  filteredLanguages: DictapimodelsLangView[] = [];
  citiesList: DictapimodelsCityView[] = [];
  filteredCitiesList: DictapimodelsCityView[] = []

  @ViewChild('resumeUpload') resumeUpload?: ElementRef;
  @ViewChild('photoUpload') photoUpload?: ElementRef;

  searchVacancy = new FormControl<string | null>('');
  isLoadingMoreVacancies = false;
  private vacancyCurrentPage = 1;
  private vacancyPageSize = 50;
  private vacancyAllDataLoaded = false;
  @ViewChild('vacancySelect') vacancySelect!: MatSelect;

  private destroy$ = new Subject<void>();

  minDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 100));
  maxDate: Date = new Date()

  constructor(
    private modalService: CandidateModalService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    if (this.applicant) {
      this.isEdit = true;
      dayjs.extend(customParseFormat);
      const birth_date = this.applicant.birth_date ? dayjs(this.applicant.birth_date, 'DD.MM.YYYY').toISOString() : '';
      this.applicantForm.patchValue(this.applicant);
      this.applicantForm.controls.birth_date.setValue(birth_date);
      this.applicant.params?.languages?.forEach(language => {
        this.languages.push(new FormGroup({
          name: new FormControl(language.name, Validators.required),
          language_level: new FormControl<ModelsLanguageLevelType | ''>(language.language_level || '', Validators.required),
        }))
      });
    }
    this.loadInitialVacancies();
    this.loadLanguages();
    this.loadCities();
  }

  ngAfterViewInit() {
    this.vacancySelect.openedChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(opened => {
      if (opened && this.vacancySelect.panel) {
        const panel = this.vacancySelect.panel.nativeElement;
        panel.addEventListener('scroll', this.onVacancyScroll.bind(this));
      }
    });
  }

  loadInitialVacancies() {
    this.vacancyCurrentPage = 1;
    this.vacancyList = [];
    this.vacancyAllDataLoaded = false;
    this.isLoading = true;

    const filter = {
      page: this.vacancyCurrentPage,
      limit: this.vacancyPageSize
    } as VacancyapimodelsVacancyFilter;

    this.api.v1SpaceVacancyListCreate(filter, {observe: 'response'})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (data) => {
        if (data.body?.data) {
          const newVacancies = data.body.data.map(
            (vacancy: VacancyapimodelsVacancyView) => new VacancyView(vacancy)
          );

          this.vacancyList = newVacancies;

          if (newVacancies.length < this.vacancyPageSize) {
            this.vacancyAllDataLoaded = true;
          } else {
            this.vacancyCurrentPage++;
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }

  loadLanguages() {
    this.api.v1DictLangFindCreate({
      name: '',
    } as DictapimodelsLangData, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.languagesList = data.body.data;
          this.filteredLanguages = this.languagesList.sort((a, b) => a.name?.localeCompare(b.name || '') || 0); // Инициализируем отфильтрованный список
        }
      }
    });
  }

   loadCities() {
    this.api.v1DictCityFindCreate({address: ''}, {observe: 'response'})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.body?.data) {
            this.citiesList = data.body.data;
            this.filteredCitiesList = this.citiesList.sort((a, b) => a.address?.localeCompare(b.address || '') || 0); // Инициализируем отфильтрованный список
          }
        },
      });
  }

  onVacancyScroll(event: any) {
    if (this.isLoadingMoreVacancies || this.vacancyAllDataLoaded) return;

    const panel = event.target;
    const scrollPosition = panel.scrollTop + panel.clientHeight;
    const scrollThreshold = panel.scrollHeight * 0.8;

    if (scrollPosition >= scrollThreshold) {
      this.loadMoreVacancies();
    }
  }

  loadMoreVacancies() {
    if (this.isLoadingMoreVacancies) return;

    this.isLoadingMoreVacancies = true;

    const filter = {
      search: this.searchVacancy.value || '',
      page: this.vacancyCurrentPage,
      limit: this.vacancyPageSize
    } as VacancyapimodelsVacancyFilter;

    this.api.v1SpaceVacancyListCreate(filter, {observe: 'response'})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (data) => {
        if (data.body?.data) {
          const newVacancies = data.body.data.map(
            (vacancy: VacancyapimodelsVacancyView) => new VacancyView(vacancy)
          );

          const existingIds = new Set(this.vacancyList.map(v => v.id));
          const uniqueNewVacancies = newVacancies.filter((v: VacancyView) => !existingIds.has(v.id));


          this.vacancyList = [...this.vacancyList, ...uniqueNewVacancies];

          if (newVacancies.length < this.vacancyPageSize) {
            this.vacancyAllDataLoaded = true;
          } else {
            this.vacancyCurrentPage++;
          }
        }
        this.isLoadingMoreVacancies = false;
      },
      error: (error) => {
        this.isLoadingMoreVacancies = false;
      }
    });
  }
  mapFormToApplicant(): ApplicantapimodelsApplicantData {
    const birth_date = this.applicantForm.controls.birth_date.value ? dayjs(this.applicantForm.controls.birth_date.value).format('DD.MM.YYYY') : '';
    const applicantData = {
      address: this.applicantForm.controls.address.value || undefined,
      birth_date: birth_date || undefined,
      citizenship: this.applicantForm.controls.citizenship.value || undefined,
      comment: this.applicantForm.controls.comment.value || undefined,
      email: this.applicantForm.controls.email.value || undefined,
      first_name: this.applicantForm.controls.first_name.value || undefined,
      last_name: this.applicantForm.controls.last_name.value || undefined,
      middle_name: this.applicantForm.controls.middle_name.value || undefined,
      gender: this.applicantForm.controls.gender.value || undefined,
      params: {
        driver_license_types: this.params.controls['driver_license_types'].value || undefined,
        education: this.params.controls['education'].value || undefined,
        employments: this.params.controls['employments'].value || undefined,
        have_additional_education: this.params.controls['have_additional_education'].value || undefined,
        languages: this.params.controls['languages'].value || undefined,
        schedules: this.params.controls['schedules'].value || undefined,
        search_status: this.params.controls['search_status'].value || undefined,
        trip_readiness: this.params.controls['trip_readiness'].value || undefined,
      },
      phone: this.applicantForm.controls.phone.value?.replace(/[^0-9]/g, '') || undefined,
      relocation: this.applicantForm.controls.relocation.value || undefined,
      salary: this.applicantForm.controls.salary.value || undefined,
      source: this.applicantForm.controls.source.value || undefined,
      total_experience: this.applicantForm.controls.total_experience.value || undefined,
      vacancy_id: this.applicantForm.controls.vacancy_id.value || undefined,
    };
    return applicantData;
  }

  addLanguage() {
    const languageForm = new FormGroup({
      name: new FormControl<string>('', [Validators.required]),
      language_level: new FormControl<ModelsLanguageLevelType | ''>('', [Validators.required]),
    })
    this.languages.push(languageForm);
  }

  submit() {
    if (this.isEdit)
      this.editApplicant()
    else
      this.createApplicant();
  }

  createApplicant() {
    if (!this.applicantForm.valid) return;

    this.isLoading = true;
    const newApplicant = this.mapFormToApplicant();

    this.api.v1SpaceApplicantCreate(newApplicant, {observe: 'response'}).pipe(
      switchMap((response) => {
        const observables = [];
        if (response.body?.data) {
          const applicantId = response.body.data;
          if (this.newCandidateResume)
            observables.push(this.uploadResume(applicantId, this.newCandidateResume));
          if (this.newCandidatePhoto)
            observables.push(this.uploadPhoto(applicantId, this.newCandidatePhoto));
        }
        if (observables.length === 0) {
          return of(null);
        }
        return forkJoin(observables);
      })
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: () => {
        this.onSubmit.emit(true);
        this.isLoading = false;
        this.modalService.closeModal();
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }

  editApplicant() {
    if (!this.applicantForm.valid || !this.applicant || !this.applicant.id) return;

    this.isLoading = true;
    const updatedApplicant = this.mapFormToApplicant();
    const applicantId = this.applicant.id;

    this.api.v1SpaceApplicantUpdate(applicantId, updatedApplicant, {observe: 'response'})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: () => {
        this.onSubmit.emit(true);
        this.isLoading = false;
        this.modalService.closeModal();
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },

    });
  }

  closeModal() {
    this.modalService.closeModal();
  }
  onResumeSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) return;
    if (this.isEdit && this.applicant && this.applicant.id) {
      this.isLoading = true;
      this.uploadResume(this.applicant.id, target.files[0])
        .pipe(takeUntil(this.destroy$))
        .subscribe({
        next: () => {
          this.isLoading = false;
          this.resumeName = target.files?.[0]?.name;
          this.onSubmit.emit(true);
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
    }
    else
      if (!this.isEdit)
        this.newCandidateResume = target.files[0];
  }

  onPhotoSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) return;
    if (this.isEdit && this.applicant && this.applicant.id) {
      this.isLoading = true;
      this.uploadPhoto(this.applicant.id, target.files[0])
        .pipe(takeUntil(this.destroy$))
        .subscribe({
        next: () => {
          this.isLoading = false;
          if (target.files?.[0])
            this.photo = URL.createObjectURL(target.files[0]);
          this.onSubmit.emit(true);
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
    }
    else
      if (!this.isEdit) {
        this.newCandidatePhoto = target.files[0];
        this.photo = URL.createObjectURL(target.files[0]);
      }
  }

  uploadPhoto(id: string, photo: File) {
    const formData = new FormData();
    formData.append("photo", photo, photo.name);
    return this.api.v1SpaceApplicantUploadPhotoCreate(id, formData as any, {observe: 'response'});
  }

  uploadResume(applicantId: string, resume: File) {
    const formData = new FormData();
    formData.append("resume", resume, resume.name);
    return this.api.v1SpaceApplicantUploadResumeCreate(applicantId, formData as any, {observe: 'response'});
  }

  deletePhoto() {
    if (!this.isEdit) {
      this.newCandidatePhoto = undefined;
      this.photo = undefined;

      if (this.photoUpload) {
        this.photoUpload.nativeElement.value = '';
      }

      return;
    }

    if (!this.applicant || !this.applicant.id) return;

    this.isLoading = true;
    this.api.v1SpaceApplicantPhotoDelete(this.applicant.id, {observe: 'response'})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.photo = undefined;
          this.onSubmit.emit(true);
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
  }


  deleteResume() {
    if (!this.isEdit) {
      this.newCandidateResume = undefined;
      if (this.resumeUpload) {
        this.resumeUpload.nativeElement.value = '';
      }
      return;
    }
    if (!this.applicant || !this.applicant.id) return;

    this.isLoading = true;
    this.api.v1SpaceApplicantResumeDelete(this.applicant.id, {observe: 'response'})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.resumeName = undefined;
          this.onSubmit.emit(true);
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
  }

  get params() {
    return this.applicantForm.controls.params as FormGroup;
  }

  get languages() {
    return this.params.controls['languages'] as FormArray<LanguageFormControls>;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.vacancySelect?.panel) {
      const panel = this.vacancySelect.panel.nativeElement;
      panel.removeEventListener('scroll', this.onVacancyScroll);
    }

    const matSelectElement = document.querySelector('mat-select[formControlName="vacancy_id"]');
    if (matSelectElement) {
      matSelectElement.removeEventListener('scroll', this.onVacancyScroll);
    }
  }

  trackByVacancyAndIndex(index: number, vacancy: VacancyView): string {
    return `${vacancy.id}_${index}`;
  }

 
  getLanguages(searchTerm: string) {
    if (searchTerm === '') {
      this.filteredLanguages = this.languagesList;
    } else {
      this.filteredLanguages = this.languagesList.filter(language =>
        language.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
      );
    }
  }

  onLanguageInput(event: any) {
    const searchTerm = event.target.value;
    this.getLanguages(searchTerm);
  }

  getCities(searchCity: string) {
    if (searchCity === '') {
      this.filteredCitiesList = this.citiesList;
    } else {
      this.filteredCitiesList = this.citiesList.filter(city =>
        city.address?.toLowerCase().includes(searchCity.toLowerCase()) || false
      );
    }
  }

  onCityInput(event: any) {
    const searchCity = event.target.value;
    this.getCities(searchCity);
  }

}
