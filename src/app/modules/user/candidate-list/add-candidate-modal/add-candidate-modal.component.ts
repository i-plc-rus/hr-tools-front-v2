import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../api/Api';
import {ApplicantView, ApplicantViewExt} from '../../../../models/Applicant';
import {CandidateModalService} from '../../../../services/candidate-modal.service';
import {
  ApplicantapimodelsApplicantData,
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
import {forkJoin, of, switchMap} from 'rxjs';

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
  @Input() photo?: string;
  @Input() resumeName?: string;
  onSubmit = new EventEmitter<boolean>();
  isEdit = false;
  isLoading = false;

  applicantForm = new FormGroup({
    address: new FormControl(''),
    birth_date: new FormControl(''),
    citizenship: new FormControl(''),
    comment: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    middle_name: new FormControl(''),
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
    phone: new FormControl('', Validators.required),
    relocation: new FormControl<ModelsRelocationType | ''>(''),
    salary: new FormControl<number | undefined>(undefined),
    source: new FormControl<ModelsApplicantSource>(ModelsApplicantSource.ApplicantSourceManual, Validators.required),
    total_experience: new FormControl<number | undefined>(undefined),
    vacancy_id: new FormControl('', Validators.required),
  });
  driverLicenseTypes = Object.values(ModelsDriverLicenseType);
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

  @ViewChild('resumeUpload') resumeUpload?: ElementRef;

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
    ).subscribe({
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

    this.api.v1SpaceApplicantUpdate(applicantId, updatedApplicant, {observe: 'response'}).subscribe({
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

  onResumeSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) return;
    if (this.isEdit && this.applicant && this.applicant.id) {
      this.isLoading = true;
      this.uploadResume(this.applicant.id, target.files[0]).subscribe({
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
      this.uploadPhoto(this.applicant.id, target.files[0]).subscribe({
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
      return;
    }
    if (!this.applicant || !this.applicant.id) return;

    this.isLoading = true;
    this.api.v1SpaceApplicantPhotoDelete(this.applicant.id, {observe: 'response'})
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

}
