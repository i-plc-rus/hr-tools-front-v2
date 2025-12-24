import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api/Api';
import { VacancyModalService } from '../../../services/vacancy-modal.service';
import { SnackBarService } from '../../../services/snackbar.service';
import { Observable, forkJoin, map, startWith, switchMap } from 'rxjs';
import {
  DictapimodelsCityView,
  DictapimodelsCompanyStructView,
  DictapimodelsCompanyView,
  DictapimodelsDepartmentView,
  ModelsEmployment,
  ModelsExperience,
  ModelsSchedule,
  ModelsVRSelectionType,
  ModelsVRType,
  ModelsVRUrgency,
  VacancyapimodelsVacancyRequestView,
} from '../../../api/data-contracts';
import { MatStepper } from '@angular/material/stepper';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-approval',
  templateUrl: './request-approval.component.html',
  styleUrl: './request-approval.component.scss',
})
export class RequestApprovalComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  id!: string;
  requestForm!: VacancyapimodelsVacancyRequestView;
  isLoading: boolean = false;
  /*последний шаг формы*/
  isLastStep: boolean = false;
  /*название компании*/
  companyName: string = '';
  /*cтатус заявки */
  status: string = '';
  // isResponsible: boolean = false;
  userId: string = '';
  userApproval: any = null;

  experiences: { name: string; value: ModelsExperience }[] = [
    { name: 'Не имеет значения', value: ModelsExperience.ExperienceNoMatter },
    { name: 'Более года', value: ModelsExperience.ExperienceMoreThan1 },
    { name: 'Более 3 лет', value: ModelsExperience.ExperienceMoreThan3 },
    { name: 'Болеее 5 лет', value: ModelsExperience.ExperienceMoreThan5 },
    { name: 'Болеее 10 лет', value: ModelsExperience.ExperienceMoreThan10 },
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
    city_id: new FormControl<DictapimodelsCityView | null>(null, [
      Validators.required,
    ]),
    opened_positions: new FormControl(null, [Validators.required, Validators.min(1)]),
    urgency: new FormControl<ModelsVRUrgency | undefined>(undefined),
    request_type: new FormControl<ModelsVRType | undefined>(undefined),
    requirements: new FormControl(''),
    employment: new FormControl<ModelsEmployment | undefined>(undefined, [
      Validators.required,
    ]),
    experience: new FormControl<ModelsExperience | undefined>(undefined, [
      Validators.required,
    ]),
    schedule: new FormControl<ModelsSchedule | undefined>(undefined, [
      Validators.required,
    ]),
    selection_type: new FormControl<ModelsVRSelectionType | undefined>(
      undefined,
    ),
    job_title_name: new FormControl(''),
    description: new FormControl(''),
  });

  companyStructureArray: DictapimodelsCompanyStructView[] = [];
  city: DictapimodelsCityView[] = [];
  filteredCity$!: Observable<DictapimodelsCityView[]>;
  companyDepartmentArray: DictapimodelsDepartmentView[] = [];
  companyJobsNamesArray: DictapimodelsCompanyView[] = [];
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private vacancyModalService: VacancyModalService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      forkJoin({
        vacancyDetails: this.api.v1SpaceVacancyRequestDetail(this.id),
        companyStructure: this.api.v1DictCompanyStructFindCreate({}),
        city: this.api.v1DictCityFindCreate({}),
        user: this.api.v1AuthMeList(),
        approvals: this.api.v1SpaceVacancyRequestApprovalsList(this.id, [])
      }).subscribe({
        next: (response: any) => {
          const { vacancyDetails, companyStructure, city, user, approvals } = response;
          this.userId = user.body.data.id;
          const approvalsList = approvals.body?.data || [];
          this.userApproval = approvalsList.find((approval: any) => approval.assignee_user_id === this.userId);
          const obj = {
            id: vacancyDetails.body.data.city_id,
            address: vacancyDetails.body.data.city,
          };
          this.companyName = vacancyDetails.body.data.company_name;
          this.status = vacancyDetails.body.data.status
          this.form.patchValue({ ...vacancyDetails.body.data, city_id: obj });
          this.form.disable();
          if(this.userApproval.state === 'PENDING') {
          this.form.controls.description.enable();
          }
          this.companyStructureArray = companyStructure?.body?.data || [];
          this.city = city?.body?.data || [];
          this.isLoading = true;

          this.api
            .v1DictDepartmentFindCreate({
              company_struct_id: String(this.form.value.company_struct_id),
            })
            .pipe(
              switchMap((departmentResponse: any) => {
                this.companyDepartmentArray = departmentResponse.body.data;

                return this.api.v1DictJobTitleFindCreate({
                  department_id: String(this.form.value.department_id),
                });
              }),
            )
            .subscribe({
              next: (response: any) => {
                this.companyJobsNamesArray = response.body.data;
              },
            });
          this.initializeFormValueChanges();
          this.initializeCityAutocomplete();
        },
        error: (err) => {
          console.error('Ошибка при выполнении одного из запросов:', err);
        },
      });
    });
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
        }),
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
        }),
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
      map((address) =>
        address ? this._filterCities(address) : this.city.slice(),
      ),
    );
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

  onStepChange(event: any) {
    this.isLastStep = event.selectedIndex === this.stepper.steps.length - 1;
  }

  goToNextStep() {
    this.stepper.next();
  }

  goBack() {
    this.router.navigate(['/user/request/list'])
  }

  objectFormation() {
    // if(this.companyName !== this.form.controls.company_name.value) {
    //   this.form.controls.company_id.setValue(null)
    // }
    const requestData = {
      company_name: this.form.controls.company_name.value || undefined,
      company_id: this.form.controls.company_id.value || undefined,
      vacancy_name: this.form.controls.vacancy_name.value || undefined,
      department_id: this.form.controls.department_id.value || undefined,
      company_struct_id:
        this.form.controls.company_struct_id.value || undefined,
      job_title_id: this.form.controls.job_title_id.value || undefined,
      city_id: this.form.controls.city_id.value?.id || undefined,
      place_of_work: this.form.controls.place_of_work.value || undefined,
      chief_fio: this.form.controls.chief_fio.value || undefined,
      opened_positions:
        Number(this.form.controls.opened_positions.value) || undefined,
      urgency: this.form.controls.urgency.value || undefined,
      request_type: this.form.controls.request_type.value || undefined,
      requirements: this.form.controls.requirements.value || undefined,
      employment: this.form.controls.employment.value || undefined,
      experience: this.form.controls.experience.value || undefined,
      schedule: this.form.controls.schedule.value || undefined,
      selection_type: this.form.controls.selection_type.value || undefined,
      description: this.form.controls.description.value || undefined
    };

    return requestData;
  }


  rejectClaim() { 
    const comment = this.form.controls['description'].value || '';
    
    if (!this.userApproval || !this.userApproval.id) {
      this.snackBarService.snackBarMessageError('Не найдена задача согласования для текущего пользователя');
      return;
    }
    
    (this.api.v1SpaceVacancyRequestApprovalsRejectCreate as any)(this.id, this.userApproval.id, { comment }).subscribe({
      next: (res: any) => {
        console.log(res)
        this.snackBarService.snackBarMessageSuccess('Заявка отклонена');
        this.router.navigate(['/user/request/list'])
      },
      error: (error: any) => {
        let errorMessage = 'Произошла ошибка при отклонении заявки';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          try {
            const parsedError = JSON.parse(error.message);
            errorMessage = parsedError.error?.message || errorMessage;
          } catch {
            errorMessage = error.message;
          }
        }
        
        this.snackBarService.snackBarMessageError(errorMessage);
      }
    })
  }

  approveClaim() {
    if (!this.userApproval || !this.userApproval.id) {
      this.snackBarService.snackBarMessageError('Не найдена задача согласования для текущего пользователя');
      return;
    }
    
    this.api.v1SpaceVacancyRequestApprovalsApproveCreate(this.id, this.userApproval.id).subscribe({
      next: (res) => {
        this.snackBarService.snackBarMessageSuccess('Заявка согласована');
        this.router.navigate(['/user/request/list'])
      },
      error: (error) => {
        console.error('Ошибка при согласовании заявки:', error);
        let errorMessage = 'Произошла ошибка при согласовании заявки';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.message) {
          try {
            const parsedError = JSON.parse(error.message);
            errorMessage = parsedError.error?.message || errorMessage;
          } catch {
            errorMessage = error.message;
          }
        }
        
        this.snackBarService.snackBarMessageError(errorMessage);
      }
    })
  }

  createVacancy() {
    const companyName = this.form.controls.company_name.value || this.companyName;
    const vacancyName = this.form.controls.vacancy_name.value || '';
    
    const companyStructId = this.form.controls.company_struct_id.value;
    const departmentId = this.form.controls.department_id.value;
    const jobTitleId = this.form.controls.job_title_id.value;
    
    const companyStructName = companyStructId 
      ? this.companyStructureArray.find(s => s.id === companyStructId)?.name || ''
      : '';
    const departmentName = departmentId
      ? this.companyDepartmentArray.find(d => d.id === departmentId)?.name || ''
      : '';
    const jobTitleName = jobTitleId
      ? this.companyJobsNamesArray.find(j => j.id === jobTitleId)?.name || ''
      : '';
    
    this.vacancyModalService.openCreateVacancyModal(
      this.id, 
      companyName, 
      vacancyName,
      companyStructName,
      departmentName,
      jobTitleName
    ).subscribe((result) => {
      if (result) {
        this.router.navigate(['/user/vacancy/list']);
      }
    });
  }
}
