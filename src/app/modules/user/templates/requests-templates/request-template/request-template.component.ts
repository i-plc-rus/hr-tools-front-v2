import { Component, inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../../../api/Api';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  ],
  templateUrl: './request-template.component.html',
  styleUrl: './request-template.component.scss'
})
export class RequestTemplateComponent implements OnInit, OnChanges {
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

  employments: { name: string; value: ModelsEmployment }[] = [
    { name: 'Временная', value: ModelsEmployment.EmploymentTemporary },
    { name: 'Постоянная', value: ModelsEmployment.EmploymentFull },
    { name: 'Стажировка', value: ModelsEmployment.EmploymentInternship },
    { name: 'Частичная', value: ModelsEmployment.EmploymentPartial },
  ];

  schedules: { name: string; value: ModelsSchedule }[] = [
    { name: 'Гибкий', value: ModelsSchedule.ScheduleFlexible },
    { name: 'Сменный', value: ModelsSchedule.ScheduleFlyInFlyOut },
    { name: 'Неполный день', value: ModelsSchedule.SchedulePartTime },
    { name: 'Полный день', value: ModelsSchedule.ScheduleFullDay },
    { name: 'Вахта', value: ModelsSchedule.ScheduleShift },
  ];

  form = new FormGroup({
    company_id: new FormControl(''),
    company_name: new FormControl('', [Validators.required]),
    vacancy_name: new FormControl('', [Validators.required]),
    department_id: new FormControl('', [Validators.required]),
    company_struct_id: new FormControl('', [Validators.required]),
    job_title_id: new FormControl('', [Validators.required]),
    place_of_work: new FormControl(''),
    chief_fio: new FormControl('', [Validators.required]),
    city_id: new FormControl<DictapimodelsCityView | null>(null, [Validators.required]),
    opened_positions: new FormControl(null, [Validators.required, Validators.min(1)]),
    urgency: new FormControl<ModelsVRUrgency | undefined>(undefined),
    request_type: new FormControl<ModelsVRType | undefined>(undefined),
    requirements: new FormControl(''),
    employment: new FormControl<ModelsEmployment | undefined>(undefined, [Validators.required]),
    experience: new FormControl<ModelsExperience | undefined>(undefined, [Validators.required]),
    schedule: new FormControl<ModelsSchedule | undefined>(undefined, [Validators.required]),
    selection_type: new FormControl<ModelsVRSelectionType | undefined>(undefined),
    description: new FormControl(''),
    approval_stages: new FormArray([]),
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

    this.initializeApprovalStages();

    if (companyStructId) {
      this.api
        .v1DictDepartmentFindCreate({
          company_struct_id: String(companyStructId),
        })
        .pipe(
          switchMap((departmentResponse: any) => {
            this.companyDepartmentArray = departmentResponse.body.data || [];
            
            if (departmentId) {
              this.form.patchValue({ department_id: departmentId });
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
                this.form.patchValue({ job_title_id: jobTitleId });
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
    this.filteredCity$ = this.form.controls['city_id'].valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value?.address)),
      map((address) => (address ? this._filterCities(address) : this.city.slice()))
    );
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

  get approvalStages(): FormArray {
    return this.form.get('approval_stages') as FormArray;
  }

  initializeApprovalStages(): void {
    const approvalStagesArray = this.approvalStages;
    approvalStagesArray.clear();

    if (this.approvalsList && this.approvalsList.length > 0) {
      this.approvalsList.forEach((task: any, index: number) => {
        approvalStagesArray.push(
          new FormGroup({
            space_user_id: new FormControl(task.assignee_user_id || '', [Validators.required]),
            stage: new FormControl(index + 1),
          })
        );
      });
    } else {
      approvalStagesArray.push(
        new FormGroup({
          space_user_id: new FormControl('', [Validators.required]),
          stage: new FormControl(1),
        })
      );
    }
  }

  addInterviewer(): void {
    this.approvalStages.push(
      new FormGroup({
        space_user_id: new FormControl('', [Validators.required]),
        stage: new FormControl(this.approvalStages.length + 1),
      })
    );
  }

  removeInterviewer(index: number): void {
    if (this.approvalStages.length > 1) {
      this.approvalStages.removeAt(index);
      for (let i = index; i < this.approvalStages.length; i++) {
        this.approvalStages.at(i)?.get('stage')?.setValue(i + 1);
      }
    }
  }

  onOptionChange(event: any, index: number) {
    const selectedValue = event.value;
    const controlToUpdate = this.approvalStages.at(index);

    controlToUpdate.patchValue({
      space_user_id: selectedValue,
    });
  }

  goToNextStep() {
    this.stepper.next();
  }

  goBack() {
    this.router.navigate(['/user/request/list'])
  }

  getAvailableUsers(excludedInterviewerIndex: number): SpaceapimodelsSpaceUser[] {
    const selectedIds = new Set<string>();
    for (let i = 0; i < this.approvalStages.length; i++) {
      if (i === excludedInterviewerIndex) continue;
      const id = this.approvalStages.at(i)?.get('space_user_id')?.value;
      if (id) selectedIds.add(String(id));
    }
    return this.users.filter((u) => !selectedIds.has(String(u.id)));
  }

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

  getFormData(): VacancyapimodelsVacancyRequestEditData {
    const formValue = this.form.value;

    return {
      company_name: formValue.company_name || undefined,
      company_id: formValue.company_id || undefined,
      vacancy_name: formValue.vacancy_name || undefined,
      department_id: formValue.department_id || undefined,
      company_struct_id: formValue.company_struct_id || undefined,
      job_title_id: formValue.job_title_id || undefined,
      city_id:
        typeof formValue.city_id === 'object' && formValue.city_id?.id
          ? formValue.city_id.id
          : typeof formValue.city_id === 'string'
            ? formValue.city_id
            : undefined,
      place_of_work: formValue.place_of_work || undefined,
      chief_fio: formValue.chief_fio || undefined,
      opened_positions: formValue.opened_positions ? Number(formValue.opened_positions) : undefined,
      urgency: formValue.urgency || undefined,
      request_type: formValue.request_type || undefined,
      requirements: formValue.requirements || undefined,
      employment: formValue.employment || undefined,
      experience: formValue.experience || undefined,
      schedule: formValue.schedule || undefined,
      selection_type: formValue.selection_type || undefined,
      description: formValue.description || undefined,
      approval_stages:
        this.approvalStages.value.map(
          (stage: { space_user_id: string | null; stage: number | null }) => ({
            assignee_user_id: stage.space_user_id || undefined,
          })
        ) || [],
    };
  }
}
