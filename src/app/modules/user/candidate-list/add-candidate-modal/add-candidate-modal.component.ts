import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../api/Api';
import {ApplicantView, ApplicantViewExt} from '../../../../models/Applicant';
import {CandidateModalService} from '../../../../services/candidate-modal.service';
import {
  ApplicantapimodelsApplicantData,
  FilesapimodelsFileView,
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
export class AddCandidateModalComponent implements OnInit {
  @Input() applicant?: ApplicantView | ApplicantViewExt;
  onSubmit = new EventEmitter<boolean>();
  isEdit = false;
  isLoading = false;

  applicantForm = new FormGroup({
    address: new FormControl(''),
    birth_date: new FormControl(''),
    citizenship: new FormControl(''),
    comment: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    middle_name: new FormControl(''),
    gender: new FormControl<ModelsGenderType | ''>('', Validators.required),
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
    phone: new FormControl('', Validators.required),
    relocation: new FormControl<ModelsRelocationType | ''>(''),
    salary: new FormControl<number | undefined>(undefined),
    source: new FormControl<ModelsApplicantSource>(ModelsApplicantSource.ApplicantSourceManual, Validators.required),
    total_experience: new FormControl<number | undefined>(undefined),
    vacancy_id: new FormControl('', Validators.required),
  });
  driverLicenseTypes = Object.values(ModelsDriverLicenseType);
  genderTypes: {label: string, value: ModelsGenderType}[] = [
    {label: 'Мужской', value: ModelsGenderType.GenderTypeM},
    {label: 'Женский', value: ModelsGenderType.GenderTypeF},
  ];
  educationTypes: {label: string, value: ModelsEducationType}[] = [
    {label: 'Среднее', value: ModelsEducationType.EducationTypeSecondary},
    {label: 'Среднее профессиональное', value: ModelsEducationType.EducationTypeSpecialSecondary},
    {label: 'Незаконченное высшее', value: ModelsEducationType.EducationTypeUnfinishedHigher},
    {label: 'Высшее', value: ModelsEducationType.EducationTypeHigher},
    {label: 'Бакалавр', value: ModelsEducationType.EducationTypeBachelor},
    {label: 'Магистр', value: ModelsEducationType.EducationTypeMaster},
    {label: 'Кандидат наук', value: ModelsEducationType.EducationTypeCandidate},
    {label: 'Доктор наук', value: ModelsEducationType.EducationTypeDoctor},
  ];
  employmentTypes: {label: string, value: ModelsEmployment}[] = [
    {label: 'Полная занятость', value: ModelsEmployment.EmploymentFull},
    {label: 'Частичная занятость', value: ModelsEmployment.EmploymentPartial},
    {label: 'Временная занятость', value: ModelsEmployment.EmploymentTemporary},
    {label: 'Интернатура', value: ModelsEmployment.EmploymentInternship},
    {label: 'Стажировка', value: ModelsEmployment.EmploymentProbation},
    {label: 'Волонтерство', value: ModelsEmployment.EmploymentVolunteer},
  ];
  scheduleTypes: {label: string, value: ModelsSchedule}[] = [
    {label: 'Полный день', value: ModelsSchedule.ScheduleFullDay},
    {label: 'Неполная занятость', value: ModelsSchedule.SchedulePartTime},
    {label: 'Гибкий график', value: ModelsSchedule.ScheduleFlexible},
    {label: 'Сменный график', value: ModelsSchedule.ScheduleShift},
    {label: 'Вахтовый метод', value: ModelsSchedule.ScheduleFlyInFlyOut},
  ];
  searchStatusTypes: {label: string, value: ModelsSearchStatusType}[] = [
    {label: 'Активно ищет работу', value: ModelsSearchStatusType.SearchStatusActive},
    {label: 'Рассматривает предложения', value: ModelsSearchStatusType.SearchStatusLookingForOffers},
    {label: 'Не ищет работу', value: ModelsSearchStatusType.SearchStatusNotLookingForJob},
    {label: 'Предложили работу, решает', value: ModelsSearchStatusType.SearchStatusHasJobOffer},
    {label: 'Вышел на новое место', value: ModelsSearchStatusType.SearchStatusAcceptedJobOffer},
  ];
  tripReadinessTypes: {label: string, value: ModelsTripReadinessType}[] = [
    {label: 'Готов к командировкам', value: ModelsTripReadinessType.TripReadinessReady},
    {label: 'Иногда готов к командировкам', value: ModelsTripReadinessType.TripReadinessSometimes},
    {label: 'Не готов к командировкам', value: ModelsTripReadinessType.TripReadinessNever},
  ];
  languageLevelTypes: {label: string, value: ModelsLanguageLevelType}[] = [
    {label: 'A1 - Начальный', value: ModelsLanguageLevelType.LanguageLevelA1},
    {label: 'A2 - Элементарный', value: ModelsLanguageLevelType.LanguageLevelA2},
    {label: 'B1 - Средний', value: ModelsLanguageLevelType.LanguageLevelB1},
    {label: 'B2 - Средне-продвинуый', value: ModelsLanguageLevelType.LanguageLevelB2},
    {label: 'C1 - Продвинутый', value: ModelsLanguageLevelType.LanguageLevelC1},
    {label: 'C2 - В совершенстве', value: ModelsLanguageLevelType.LanguageLevelC2},
    {label: 'Родной язык', value: ModelsLanguageLevelType.LanguageLevelL1},
  ];
  relocationTypes: {label: string, value: ModelsRelocationType}[] = [
    {label: 'Не готов к переезду', value: ModelsRelocationType.RelocationTypeNo},
    {label: 'Могу переехать', value: ModelsRelocationType.RelocationTypeYes},
    {label: 'Хочу переехать', value: ModelsRelocationType.RelocationTypeWant},
  ];

  vacancyList: VacancyView[] = [];
  docList: FilesapimodelsFileView[] = [];
  newResumeFile?: File;
  currentResumeFile?: FilesapimodelsFileView;
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

      this.getDocList(this.applicant.id);
    }
    this.getVacancyList();
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
      phone: this.applicantForm.controls.phone.value || undefined,
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

    this.api.v1SpaceApplicantCreate(newApplicant, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data && this.newResumeFile) {
          this.uploadResume(data.body.data);
        }
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

    this.api.v1SpaceApplicantUpdate(applicantId, updatedApplicant, {observe: 'response'}).subscribe({
      next: () => {
        if (this.newResumeFile) {
          this.uploadResume(applicantId);
        }
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

  getVacancyList() {
    this.isLoading = true;
    const filter = {} as VacancyapimodelsVacancyFilter;
    this.api.v1SpaceVacancyListCreate(filter, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.vacancyList = data.body.data.map((vacancy: VacancyapimodelsVacancyView) => new VacancyView(vacancy));
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.newResumeFile = target.files?.[0];
    console.log(this.newResumeFile);
  }

  getDocList(id: string) {
    this.isLoading = true;
    this.api.v1SpaceApplicantDocListDetail(id, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.docList = data.body.data;
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    })
  }

  uploadResume(applicantId: string) {
    if (!this.newResumeFile) return;
    this.isLoading = true;
    this.api.v1SpaceApplicantUploadResumeCreate(applicantId, {resume: this.newResumeFile}, {observe: 'response', headers: {'Content-Type': 'multipart/form-data'}})
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.getDocList(applicantId);
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      })
  }

  get params() {
    return this.applicantForm.controls.params as FormGroup;
  }

  get languages() {
    return this.params.controls['languages'] as FormArray<LanguageFormControls>;
  }

}
