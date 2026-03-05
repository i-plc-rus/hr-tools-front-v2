import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api/Api';
import {
  DictapimodelsCompanyData,
  DictapimodelsCompanyStructView,
  DictapimodelsCompanyView,
  DictapimodelsDepartmentView,
  ModelsEmployment,
  ModelsExperience,
  ModelsSchedule,
  ModelsVRSelectionType,
  ModelsVRStatus,
  ModelsVRType,
  ModelsVRUrgency, SpaceapimodelsSpaceUser,
  VacancyapimodelsVacancyRequestCreateData,
} from '../../../api/data-contracts';
import {Observable, forkJoin, map, startWith, switchMap, of, Subject} from 'rxjs';
import { DictapimodelsCityView } from '../../../api/data-contracts';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import {employmentTypes, experienceTypes, scheduleTypes} from '../user-consts';
import { Router } from '@angular/router';
import {VacancyModalService} from '../../../services/vacancy-modal.service';
import {SnackBarService} from '../../../services/snackbar.service';
import {MatSelect} from '@angular/material/select';
import {takeUntil} from 'rxjs/operators';

export enum StepForm {
  Step1 = 'step1',
  Step2 = 'step2',
  Step3 = 'step3',
}
export enum Step1Fields {
  CompanyName = 'company_name',
  VacancyName = 'vacancy_name',
  CompanyStructId = 'company_struct_id',
  DepartmentId = 'department_id',
  JobTitleId = 'job_title_id',
  PlaceOfWork = 'place_of_work',
  RemoteWork = 'remote_work',
  ChiefFio = 'chief_fio',
  Probation = 'probation',
  Schedule = 'schedule',
  Employment = 'employment',
  Salary = 'salary',
  Bonus = 'bonus',
}

export enum Step2Fields {
  Requirements = 'requirements',
  Skills = 'skills',
  AdditionalInformation = 'additionalInformation',
}

export enum Step3Fields {
  // OpenedPositions = 'opened_positions',
  // Urgency = 'urgency',
  // RequestType = 'request_type',
  // Experience = 'experience',
  Interviewers = 'interviewers',
}

// export enum Step4Fields {
//   Interviewers = 'interviewers',
// }

@Component({
  selector: 'app-request-creation',
  templateUrl: './request-creation.component.html',
  styleUrl: './request-creation.component.scss',
})
export class RequestCreationComponent implements OnInit, OnDestroy {
  StepForm = StepForm;
  Step1Fields = Step1Fields;
  Step2Fields = Step2Fields;
  Step3Fields = Step3Fields;

  @ViewChild('saveDraftDialog') saveDraftDialog!: TemplateRef<any>;
  @ViewChild('draftDialog') draftDialog!: TemplateRef<any>;
  showForm: boolean = false;
  users: any = [];
  organizationName: string = '';
  ModelsVRSelectionType = ModelsVRSelectionType;

  experiences = experienceTypes;

  urgencys: {name: string; value: ModelsVRUrgency}[] = [
    {name: 'Срочно', value: ModelsVRUrgency.VRTypeUrgent},
    {name: 'В плановом порядке', value: ModelsVRUrgency.VRTypeNonUrgent}
  ]

  request_types: { name: string; value: ModelsVRType }[] = [
    { name: 'Новая позиция', value: ModelsVRType.VRTypeNew },
    { name: 'Замена', value: ModelsVRType.VRTypeReplace },
  ];

  employments = employmentTypes;
  schedules = scheduleTypes;
  form = new FormGroup({
    [StepForm.Step1]: new FormGroup({
      // [Step1Fields.CompanyName]: new FormControl<DictapimodelsCompanyData | null>(null, [Validators.required]),
      [Step1Fields.VacancyName]: new FormControl('', [Validators.required]),
      [Step1Fields.CompanyStructId]: new FormControl('', [Validators.required]),
      [Step1Fields.DepartmentId]: new FormControl('', [Validators.required]),
      [Step1Fields.JobTitleId]: new FormControl('', [Validators.required]),
      [Step1Fields.PlaceOfWork]: new FormControl(''),
      [Step1Fields.RemoteWork]: new FormControl(false),
      [Step1Fields.ChiefFio]: new FormControl('', [Validators.required]),
      [Step1Fields.Probation]: new FormControl('', [Validators.required]),
      [Step1Fields.Schedule]: new FormControl<ModelsSchedule | undefined>(undefined, [Validators.required]),
      [Step1Fields.Employment]: new FormControl<ModelsEmployment | undefined>(undefined, [Validators.required]),
      [Step1Fields.Salary]: new FormControl(''),
      [Step1Fields.Bonus]: new FormControl(''),
    }),

    [StepForm.Step2]: new FormGroup({
      // [Step2Fields.CityId]: new FormControl<DictapimodelsCityView | null>(null, [Validators.required]),
      [Step2Fields.Requirements]: new FormControl('', [Validators.required]),
      [Step2Fields.Skills]: new FormControl(''),
      [Step2Fields.AdditionalInformation]: new FormControl(''),
    }),

    [StepForm.Step3]: new FormGroup({
      // [Step3Fields.OpenedPositions]: new FormControl(null, [Validators.required, Validators.min(1)]),
      // [Step3Fields.Urgency]: new FormControl<ModelsVRUrgency | undefined>(undefined, [Validators.required]),
      // [Step3Fields.RequestType]: new FormControl<ModelsVRType | undefined>(undefined, [Validators.required]),
      // [Step3Fields.Experience]: new FormControl<ModelsExperience | undefined>(undefined, [Validators.required]),
      [Step3Fields.Interviewers]: new FormArray([
        new FormGroup({
          space_user_id: new FormControl('', [Validators.required]),
          stage: new FormControl(1),
        }),
      ])
    }),

    description: new FormControl(''),
    selection_type: new FormControl<ModelsVRSelectionType | undefined>(ModelsVRSelectionType.VRSelectionTypePersonal),
  });



  city: DictapimodelsCityView[] = [];
  filteredCity$!: Observable<DictapimodelsCityView[]>;
  companyNameArray: DictapimodelsCompanyData[] = [];
  filteredCompany$!: Observable<DictapimodelsCompanyData[]>;
  companyStructureArray: DictapimodelsCompanyStructView[] = [];
  companyDepartmentArray: DictapimodelsDepartmentView[] = [];
  companyJobsNamesArray: DictapimodelsCompanyView[] = [];

  @ViewChild('userSelect') userSelect!: MatSelect;

  searchUser = new FormControl<string | null>('');

  private destroy$ = new Subject<void>();

  errorText:string = 'Поле не может быть пустым';

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private router: Router,
    private vacancyModal: VacancyModalService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    forkJoin({
      companyName: this.api.v1DictCompanyFindCreate({}),
      companyStructure: this.api.v1DictCompanyStructFindCreate({}),
      city: this.api.v1DictCityFindCreate({}),
      user: this.fetchAllUsers(),
      profile: this.api.v1SpaceProfileList()
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: ({ companyName, companyStructure, city, user, profile }: any) => {
        this.companyNameArray = companyName.body.data;
        this.companyStructureArray = companyStructure.body.data;
        this.city = city.body.data;
        this.users = user.body.data || [];
        this.organizationName = profile.body.data?.organization_name;

        this.initializeCityAutocomplete();
        this.initializeCompanyAutocomplete();
        
        if (this.organizationName) {
          const step1 = this.form.get(StepForm.Step1) as FormGroup;
          step1.get(Step1Fields.CompanyName)?.setValue(this.organizationName);
          step1.get(Step1Fields.CompanyName)?.disable();
        }
      },
      error: (err) => {
        console.error('Ошибка при загрузке данных:', err);
      },
    });

    const step1 = this.form.get(StepForm.Step1) as FormGroup;

    step1.get(Step1Fields.CompanyStructId)?.valueChanges
      .pipe(
        switchMap((value: string | null) => {
          const company_struct_id = value ? String(value) : '';
          step1.get(Step1Fields.DepartmentId)?.reset();

          return company_struct_id
            ? this.api.v1DictDepartmentFindCreate({ company_struct_id })
            : of({ body: { data: [] } });
        })
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.companyDepartmentArray = response.body.data;
        },
        error: (err) => {
          console.error('Ошибка при загрузке подразделений:', err);
        },
      });

    step1.get(Step1Fields.DepartmentId)?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        switchMap((value: string | null) => {
          const department_id = value ? String(value) : '';
          step1.get(Step1Fields.JobTitleId)?.reset();

          return department_id
            ? this.api.v1DictJobTitleFindCreate({ department_id })
            : of({ body: { data: [] } });
        })
      )
      .subscribe({
        next: (response: any) => {
          this.companyJobsNamesArray = response.body.data;
        },
        error: (err) => {
          console.error('Ошибка при загрузке должностей:', err);
        },
      });


  }

  ngAfterViewInit() {
    this.startForm();
  }

  get interviewers(): FormArray {
    return this.form.get(`${StepForm.Step3}.${Step3Fields.Interviewers}`) as unknown as FormArray;
  }

 /** Загружает всех пользователей постранично (бэкенд отдаёт не более 100 за запрос). */
 private fetchAllUsers(): Observable<{ body: { data: SpaceapimodelsSpaceUser[] } }> {
  const pageSize = 100;
  return this.api
    .v1UsersListCreate(
      { page: 1, limit: pageSize, sort: { fio_desc: false } },
      { observe: 'response' }
    )
    .pipe(
      switchMap((firstRes: any) => {
        const firstData = firstRes.body?.data || [];
        const rowCount = firstRes.body?.row_count ?? firstData.length;
        if (firstData.length >= rowCount || firstData.length < pageSize) {
          return of({ body: { data: firstData } });
        }
        const totalPages = Math.ceil(rowCount / pageSize);
        const otherPages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
        return forkJoin(
          otherPages.map((page) =>
            this.api.v1UsersListCreate(
              { page, limit: pageSize, sort: { fio_desc: false } },
              { observe: 'response' }
            )
          )
        ).pipe(
          map((responses: any[]) => {
            const rest = responses.flatMap((r) => r.body?.data || []);
            return { body: { data: [...firstData, ...rest] } };
          })
        );
      })
    );
}

  addInterviewer(): void {
    this.interviewers.push(
      new FormGroup({
        space_user_id: new FormControl('', [Validators.required]),
        stage: new FormControl(this.interviewers.length + 1),
      }),
    );
  }

  removeInterviewer(index: number): void {
    if (this.interviewers.length > 1) {
      this.interviewers.removeAt(index);
      for (let i = index; i < this.interviewers.length; i++) {
        this.interviewers.at(i)?.get('stage')?.setValue(i + 1);
      }
    }
  }

  initializeCityAutocomplete(): void {
    const step2 = this.form.get(StepForm.Step2) as FormGroup;

    // this.filteredCity$ = step2.get(Step2Fields.CityId)!.valueChanges.pipe(
    //   takeUntil(this.destroy$),
    //   startWith(''),
    //   map((value) => (typeof value === 'string' ? value : value?.address)),
    //   map((address) =>
    //     address ? this._filterCities(address) : this.city.slice(),
    //   ),
    // );
  }


  private _filterCities(address: string): DictapimodelsCityView[] {
    const filterValue = address.toLowerCase();
    return this.city.filter((city) =>
      city.address?.toLowerCase().includes(filterValue),
    );
  }

  displayCityName(city: DictapimodelsCityView): string {
    return city && city.address ? city.address : '';
  }

  initializeCompanyAutocomplete(): void {
    const step1 = this.form.get(StepForm.Step1) as FormGroup;

    this.filteredCompany$ = step1.get(Step1Fields.CompanyName)!.valueChanges.pipe(
      takeUntil(this.destroy$),
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value?.name)),
      map((name) =>
        name ? this._filterCompanies(name) : this.companyNameArray.slice(),
      ),
    );
  }

  private _filterCompanies(name: string): DictapimodelsCompanyData[] {
    const filterValue = name.toLowerCase();
    return this.companyNameArray.filter((company) =>
      company.name?.toLowerCase().includes(filterValue),
    );
  }

  displayCompanyName(company: DictapimodelsCompanyData): string {
    return company && company.name ? company.name : '';
  }

  startForm(): void {
    this.dialog.open(this.draftDialog, {
      hasBackdrop: true,
      disableClose: false
    });
  }

  useDraft(): void {
    const draft = localStorage.getItem('draftFormData');

    if (!draft) {
      this.snackBarService.snackBarMessageError('Нет данных черновика для загрузки.')
      this.dialog.closeAll();
      return;
    }

    const draftData = JSON.parse(draft);

    this.form.patchValue(draftData);

    const step1 = this.form.get(StepForm.Step1) as FormGroup<any>;
    const step3 = this.form.get(StepForm.Step3) as FormGroup<any>;

    if (draftData[StepForm.Step1]?.[Step1Fields.CompanyStructId]) {
      step1.get(Step1Fields.DepartmentId)?.setValue(draftData[StepForm.Step1][Step1Fields.DepartmentId]);
    }

    if (draftData[StepForm.Step1]?.[Step1Fields.DepartmentId]) {
      step1.get(Step1Fields.JobTitleId)?.setValue(draftData[StepForm.Step1][Step1Fields.JobTitleId]);
    }

    const companyRaw = draftData[StepForm.Step1]?.[Step1Fields.CompanyName];
    if (typeof companyRaw === 'string') {
      step1.get(Step1Fields.CompanyName)?.setValue({ name: companyRaw, id: null });
    }

    const interviewersArray = step3.get(Step3Fields.Interviewers) as FormArray;
    interviewersArray.clear();

    draftData[StepForm.Step3]?.[Step3Fields.Interviewers]?.forEach(
      (interviewer: { space_user_id: string | null; stage: number | null }, index: number) => {
        interviewersArray.push(
          new FormGroup({
            space_user_id: new FormControl(interviewer.space_user_id ?? '', [Validators.required]),
            stage: new FormControl(interviewer.stage ?? index + 1),
          })
        );
      }
    );

    this.showForm = true;
    this.snackBarService.snackBarMessageSuccess('Загружен черновик')
    this.dialog.closeAll();
  }

  onOptionChange(event: any, index: number): void {
    const selectedValue = event.value;
    const controlToUpdate = this.interviewers.at(index);
      
    controlToUpdate.patchValue({
      space_user_id: selectedValue,
    })
  }

  getAvailableUsers(excludedInterviewerIndex: number): SpaceapimodelsSpaceUser[] {
    const selectedIds = new Set<string>();
    for (let i = 0; i < this.interviewers.length; i++) {
      if (i === excludedInterviewerIndex) continue;
      const id = this.interviewers.at(i)?.get('space_user_id')?.value;
      if (id) selectedIds.add(String(id));
    }
    return (this.users as SpaceapimodelsSpaceUser[]).filter(u => !selectedIds.has(String(u.id)));
  }

  hasDraft(): boolean {
    const draft = localStorage.getItem('draftFormData');
    return !!draft;
  }

  newRequest(): void {
    this.showForm = true;
    this.dialog.closeAll();
  }


  openSaveDraftDialog(): void {
    this.dialog.open(this.saveDraftDialog);
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  saveDraftAndExit(): void {
    localStorage.setItem('draftFormData', JSON.stringify(this.form.value));
    this.closeDialog();
    this.router.navigate(['/user/request/list'])
  }

  goBack(): void {
    this.router.navigate(['/user/request/list'])
  }

  /** Форматирует число в строку с пробелами как разделитель тысяч (400000 → "400 000"). */
  private formatThousands(value: string | number | null | undefined): string | undefined {
    if (value == null || value === '') return undefined;
    const digits = String(value).replace(/\D/g, '');
    if (!digits) return undefined;
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  onSubmit(): void {
    const step1 = (this.form.get(StepForm.Step1) as FormGroup)?.getRawValue();
    const step2 = this.form.get(StepForm.Step2)?.value;
    const step3 = this.form.get(StepForm.Step3)?.value;

    const company = step1?.company_name;
    const companyName = typeof company === 'object' && company?.name
      ? company.name
      : String(company);

    const requestData: /*VacancyapimodelsVacancyRequestCreateData*/ any  = {
      company_name: companyName || undefined,
      vacancy_name: step1?.vacancy_name || undefined,
      department_id: step1?.department_id || undefined,
      company_struct_id: step1?.company_struct_id || undefined,
      job_title_id: step1?.job_title_id || undefined,
      remote_work: step1?.remote_work || false,
      chief_fio: step1?.chief_fio || undefined,
      employment: step1?.employment as ModelsEmployment,
      schedule: step1?.schedule as ModelsSchedule,
      place_of_work: step1?.place_of_work || undefined,
      probation: step1?.probation || undefined,
      salary: this.formatThousands(step1?.salary),
      bonus: this.formatThousands(step1?.bonus),
      requirements: step2?.requirements || undefined,
      skills: step2?.skills || undefined,
      additionalInformation: step2?.additionalInformation || undefined,
      approval_stages: step3?.interviewers?.map(
        (interviewer: { space_user_id: string | null; stage: number | null }) => ({
          assignee_user_id: interviewer.space_user_id || undefined,
        })
      ) || [],
      // city_id: step2?.cityId?.id || undefined,
      // opened_positions: Number(step3?.opened_positions) || undefined,
      // urgency: step3?.urgency as ModelsVRUrgency,
      // request_type: step3?.request_type as ModelsVRType,
      // experience: step3?.experience as ModelsExperience,
      
    };

    // if (this.form.valid) {
    //   this.api.v1SpaceVacancyRequestCreate(requestData)
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe({
    //     next: (res) => {
    //       this.router.navigate(['/user/request/list']);
    //     },
    //     error: (err) => {
    //       console.error('Ошибка при создании заявки:', err);
    //     },
    //   });
    // } else {
    //   this.snackBarService.snackBarMessageError('Не все обязательные поля заполнены');
    // }
    console.log(requestData)
  }

    openGenerateCommentModal(): void {
    this.vacancyModal.openGenerateModal(this.form.controls['description'] as FormControl);
  }

  getControl(step: StepForm, field: string): FormControl<any> {
    const control = this.form.get(`${step}.${field}`);

    if (control instanceof FormControl) {
      return control as FormControl<any>;
    } else {
      console.warn(`Control ${step}.${field} is not a FormControl`);
      return new FormControl();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

