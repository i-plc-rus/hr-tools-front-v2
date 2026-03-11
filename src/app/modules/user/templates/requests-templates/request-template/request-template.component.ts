import { Component, forwardRef, inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../../api/Api';
import { FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  DictapimodelsCityView,
  DictapimodelsCompanyStructView,
  DictapimodelsCompanyView,
  DictapimodelsDepartmentView,
  ModelsApprovalState,
  ModelsEmployment,
  ModelsExperience,
  ModelsSchedule,
  ModelsUserRole,
  ModelsVRSelectionType,
  ModelsVRStatus,
  ModelsVRType,
  ModelsVRUrgency,
  SpaceapimodelsSpaceUser,
  VacancyapimodelsApprovalTaskView,
  VacancyapimodelsVacancyRequestEditData,
  VacancyapimodelsVacancyRequestView
} from '../../../../../api/data-contracts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TextInputComponent } from '../../../../../components/text-input/text-input.component';
import { TextEditorComponent } from '../../../../../components/text-editor/text-editor.component';
import { CommonModule } from '@angular/common';
import { EMPTY, map, Observable, startWith, switchMap } from 'rxjs';
import { LoaderComponent } from '../../../../../components/loader/loader.component';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { employmentTypes, scheduleTypes } from '../../../user-consts';
import { MatSlideToggle } from '@angular/material/slide-toggle';

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

@Component({
  selector: 'app-request-template',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    TextInputComponent,
    TextEditorComponent,
    LoaderComponent,
    MatSlideToggle,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RequestTemplateComponent),
      multi: true // Позволяет регистрировать несколько аксессоров
    }
  ],
  templateUrl: './request-template.component.html',
  styleUrl: './request-template.component.scss'
})
export class RequestTemplateComponent implements OnInit, OnChanges {
  StepForm = StepForm;
  Step1Fields = Step1Fields;
  Step2Fields = Step2Fields;
  Step3Fields = Step3Fields;

  @Input() control!: FormControl;
  @Input() requestId!: string | null;
  @Input() formDisabled = false;
  @Input() commentDisabled? = false;
  @Input() vacancyDetails: VacancyapimodelsVacancyRequestView | null = null;
  @Input() companyStructure: DictapimodelsCompanyStructView[] = [];
  @Input() city: DictapimodelsCityView[] = [];
  @Input() user: SpaceapimodelsSpaceUser | null = null;
  @Input() users: SpaceapimodelsSpaceUser[] = [];
  @ViewChild('userSelect') userSelect!: MatSelect;
  @ViewChild('stepper') stepper!: MatStepper;

  selectedTabIndex = 0;

  private api = inject(ApiService);
  private router = inject(Router)

  isLoaded: boolean = false;
  /* последний таб (Согласование) */
  isLastStep: boolean = false;
  /* первый таб */
  get isFirstStep(): boolean {
    return this.selectedTabIndex === 0;
  }
  /* название компании*/
  companyName: string = '';
  /* cтатус заявки */
  status: string = '';
  /* массив согласующих по заявке (задачи согласования) */
  approvalsList: VacancyapimodelsApprovalTaskView[] = [];
  /* модели статусов */
  ModelsVRStatus = ModelsVRStatus;
  ModelsApprovalState = ModelsApprovalState;
  /* текст ошибки если оставили пустым поле согласующего */
  errorText: string = 'Поле не может быть пустым';

  companyStructureArray: DictapimodelsCompanyStructView[] = [];
  filteredCity$!: Observable<DictapimodelsCityView[]>;
  companyDepartmentArray: DictapimodelsDepartmentView[] = [];
  companyJobsNamesArray: DictapimodelsCompanyView[] = [];

  experiences: { name: string; value: ModelsExperience }[] = [
    { name: 'Не имеет значения', value: ModelsExperience.ExperienceNoMatter },
    { name: 'Более года', value: ModelsExperience.ExperienceMoreThan1 },
    { name: 'Более 3 лет', value: ModelsExperience.ExperienceMoreThan3 },
    { name: 'Более 5 лет', value: ModelsExperience.ExperienceMoreThan5 },
    { name: 'Более 10 лет', value: ModelsExperience.ExperienceMoreThan10 },
  ];

  urgencys: { name: string; value: ModelsVRUrgency }[] = [
    { name: 'Срочно', value: ModelsVRUrgency.VRTypeUrgent },
    { name: 'В плановом порядке', value: ModelsVRUrgency.VRTypeNonUrgent },
  ];

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

  ngOnInit(): void {
    this.initializeFormValueChanges();
  }

  ngOnChanges(): void {
    if (this.vacancyDetails && this.companyStructure && this.city && this.user && this.users) {
      this.initializeData();
    }
  }

  private initializeData(): void {
    if (!this.vacancyDetails) {
      return;
    }

    this.approvalsList = this.vacancyDetails.approval_tasks || [];
    const obj = {
      id: this.vacancyDetails.city_id,
      address: this.vacancyDetails.city,
    };
    this.companyName = this.vacancyDetails.company_name || '';
    this.status = this.vacancyDetails.status || '';
    
    const { opened_positions, department_id, job_title_id, ...rest } = this.vacancyDetails;
    const formData: any = { 
      ...rest, 
      city_id: obj,
      opened_positions: opened_positions !== undefined ? opened_positions : null
    };
    
    const companyStructId = formData.company_struct_id;
    const departmentId = department_id;
    const jobTitleId = job_title_id;
    
    this.form.patchValue(formData);
    this.companyStructureArray = this.companyStructure;

    // this.initializeApprovalStages();

    if (companyStructId) {
      this.api
        .v1DictDepartmentFindCreate({
          company_struct_id: String(companyStructId),
        })
        .pipe(
          switchMap((departmentResponse: any) => {
            this.companyDepartmentArray = departmentResponse.body.data || [];
            
            if (departmentId) {
              this.form.patchValue({  });
            }

            if (departmentId) {
              return this.api.v1DictJobTitleFindCreate({
                department_id: String(departmentId),
              });
            }
            this.companyJobsNamesArray = [];
            return EMPTY;
          })
        )
        .subscribe({
          next: (response: any) => {
            if (response && response.body) {
              this.companyJobsNamesArray = response.body.data || [];
              if (jobTitleId) {
                // this.form.patchValue({  });
              }
            }
            this.isLoaded = true;
            this.initializeCityAutocomplete();
          },
          error: (err) => {
            console.error('Ошибка при загрузке должностей:', err);
            this.isLoaded = true;
            this.initializeCityAutocomplete();
          }
        });
    } else {
      this.companyDepartmentArray = [];
      this.companyJobsNamesArray = [];
      this.isLoaded = true;
      this.initializeCityAutocomplete();
    }
  }

  initializeFormValueChanges(): void {
    this.form
      .get('company_struct_id')
      ?.valueChanges.pipe(
        switchMap((value) => {
          this.form.get('department_id')?.reset();
          return this.api.v1DictDepartmentFindCreate({
            company_struct_id: String(value),
          });
        })
      )
      .subscribe({
        next: (response: any) => {
          this.companyDepartmentArray = response.body.data;
          this.companyJobsNamesArray = [];
        },
      });
    this.form
      .get('department_id')
      ?.valueChanges.pipe(
        switchMap((value) => {
          return this.api.v1DictJobTitleFindCreate({
            department_id: String(value),
          });
        })
      )
      .subscribe({
        next: (response: any) => {
          this.companyJobsNamesArray = response.body.data;
        },
        error: (err) => {
          console.error('Ошибка при обновлении должностей:', err);
        },
      });
  }

  initializeCityAutocomplete(): void {
   const step2 = this.form.get(StepForm.Step2) as FormGroup;
  }

  private _filterCities(address: string): DictapimodelsCityView[] {
    const filterValue = address.toLowerCase();
    return this.city.filter((city) => city.address?.toLowerCase().includes(filterValue));
  }

  displayCityName(city: DictapimodelsCityView): string {
    return city && city.address ? city.address : '';
  }

  onStepChange(event: any): void {
    this.isLastStep = event.selectedIndex === this.stepper.steps.length - 1;
  }

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
    this.isLastStep = index === 2;
  }

  // get approvalStages(): FormArray {
  //   return this.form.get('approval_stages') as FormArray;
  // }

  // initializeApprovalStages(): void {
  //   const approvalStagesArray = this.approvalStages;
  //   approvalStagesArray.clear();

  //   if (this.approvalsList && this.approvalsList.length > 0) {
  //     this.approvalsList.forEach((task: any, index: number) => {
  //       approvalStagesArray.push(
  //         new FormGroup({
  //           space_user_id: new FormControl(task.assignee_user_id || '', [Validators.required]),
  //           stage: new FormControl(index + 1),
  //         })
  //       );
  //     });
  //   } else {
  //     approvalStagesArray.push(
  //       new FormGroup({
  //         space_user_id: new FormControl('', [Validators.required]),
  //         stage: new FormControl(1),
  //       })
  //     );
  //   }
  // }

  // addInterviewer(): void {
  //   this.approvalStages.push(
  //     new FormGroup({
  //       space_user_id: new FormControl('', [Validators.required]),
  //       stage: new FormControl(this.approvalStages.length + 1),
  //     })
  //   );
  // }

  // removeInterviewer(index: number): void {
  //   if (this.approvalStages.length > 1) {
  //     this.approvalStages.removeAt(index);
  //     for (let i = index; i < this.approvalStages.length; i++) {
  //       this.approvalStages.at(i)?.get('stage')?.setValue(i + 1);
  //     }
  //   }
  // }

  // onOptionChange(event: any, index: number) {
  //   const selectedValue = event.value;
  //   const controlToUpdate = this.approvalStages.at(index);

  //   controlToUpdate.patchValue({
  //     space_user_id: selectedValue,
  //   });
  // }

  goToNextStep() {
    this.stepper.next();
  }

  goBack() {
    this.router.navigate(['/user/request/list'])
  }

  // getAvailableUsers(excludedInterviewerIndex: number): SpaceapimodelsSpaceUser[] {
  //   const selectedIds = new Set<string>();
  //   for (let i = 0; i < this.approvalStages.length; i++) {
  //     if (i === excludedInterviewerIndex) continue;
  //     const id = this.approvalStages.at(i)?.get('space_user_id')?.value;
  //     if (id) selectedIds.add(String(id));
  //   }
  //   return this.users.filter((u) => !selectedIds.has(String(u.id)));
  // }

  getApprovalStateDisplayName(state: ModelsApprovalState | string | undefined): string {
    if (!state) return '';
    const stateMap: Record<string, string> = {
      [ModelsApprovalState.AStatePending]: 'Ожидает согласования',
      [ModelsApprovalState.AStateApproved]: 'Согласовано',
      [ModelsApprovalState.AStateRequestChanges]: 'Запрошены изменения',
      [ModelsApprovalState.AStateRejected]: 'Отклонено',
      [ModelsApprovalState.AStateRemoved]: 'Удалено',
    };
    return stateMap[state] ?? state;
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

  private formatThousands(value: string | number | null | undefined): string | undefined {
    if (value == null || value === '') return undefined;
    const digits = String(value).replace(/\D/g, '');
    if (!digits) return undefined;
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  getFormData(): /*VacancyapimodelsVacancyRequestEditData*/ any {
    const step1 = (this.form.get(StepForm.Step1) as FormGroup)?.getRawValue();
    const step2 = this.form.get(StepForm.Step2)?.value;
    const step3 = this.form.get(StepForm.Step3)?.value;
    

    return {
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
    };
  }
}
