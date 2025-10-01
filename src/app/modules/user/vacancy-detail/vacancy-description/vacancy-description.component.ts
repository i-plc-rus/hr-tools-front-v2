import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
  DictapimodelsCityView,
  DictapimodelsCompanyStructView,
  DictapimodelsCompanyView,
  DictapimodelsDepartmentView,
  ModelsVRSelectionType,
  ModelsVRType,
  ModelsVRUrgency,
  SpaceapimodelsSpaceUser,
  VacancyapimodelsVacancyData
} from '../../../../api/data-contracts';
import {VacancyModalService} from '../../../../services/vacancy-modal.service';
import {ApiService} from '../../../../api/Api';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {SpaceUser} from '../../../../models/SpaceUser';
import {Router} from '@angular/router';
import {employmentTypes, experienceTypes, scheduleTypes} from '../../user-consts';
import {SnackBarService} from '../../../../services/snackbar.service';

@Component({
  selector: 'app-vacancy-description',
  templateUrl: './vacancy-description.component.html',
  styleUrl: './vacancy-description.component.scss'
})
export class VacancyDescriptionComponent implements OnInit, OnChanges {
  @Input() isNewVacancy!: boolean;
  @Input() vacancyForm!: FormGroup;
  @Output() onUpdate = new EventEmitter<string>();
  isLoading = false;

  requestTypes = Object.values(ModelsVRType);
  urgencies = Object.values(ModelsVRUrgency);
  employmentTypes = employmentTypes;
  experienceTypes = experienceTypes;
  scheduleTypes = scheduleTypes;
  cities: DictapimodelsCityView[] = [];
  companies: DictapimodelsCompanyView[] = [];
  companyStructures: DictapimodelsCompanyStructView[] = [];
  departments: DictapimodelsDepartmentView[] = [];
  jobTitles: DictapimodelsCompanyView[] = [];
  users: SpaceUser[] = [];
  responsibleUsers: SpaceUser[] = [];

  constructor(
    private router: Router,
    private vacancyModal: VacancyModalService,
    private api: ApiService,
    private snackBarService: SnackBarService
  ) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.setFormListeners();
    if (!this.vacancyForm.get('department_id')?.value) {
      this.vacancyForm.get('job_title_name')?.disable();
      this.vacancyForm.get('company_struct_name')?.disable();
    }
    this.addSalaryValidation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isNewVacancy'] && this.isNewVacancy) {
      this.getCompanies('');
      this.getDepartments('');
    }
  }

  addSalaryValidation() {
    const salaryControls = ['in_hand', 'from', 'to', 'by_result'];

    salaryControls.forEach(control => {
      const formControl = this.vacancyForm.get(`salary.${control}`);
      if (formControl) {
        formControl.setValidators([
          Validators.min(1),
          Validators.pattern(/^[1-9]\d*$/)
        ]);
        if(!this.isNewVacancy) {
          formControl.setValidators([
            Validators.required
          ]);
        }
        formControl.updateValueAndValidity();
      }
    });
  }

  validateSalaryInput(event: any) {
    let value = event.target.value;

    if (/^-|^0+/.test(value)) {
      value = '';
    }

    event.target.value = value;
    this.vacancyForm.get(event.target.getAttribute('formControlName'))?.setValue(value);
  }


  setFormListeners() {
    this.vacancyForm.get('department_id')?.valueChanges.subscribe((departmentId) => {
      if (!departmentId) {
        this.vacancyForm.get('job_title_name')?.disable();
        this.vacancyForm.get('company_struct_name')?.disable();

        // Сбрасываем структуру, чтобы она не ограничивала поиск подразделений
        this.vacancyForm.get('company_struct_id')?.setValue(null);
        this.vacancyForm.get('company_struct_name')?.setValue(null);

        // Загружаем все подразделения заново
        this.getDepartments('');
      } else {
        this.vacancyForm.get('job_title_name')?.enable();
        this.vacancyForm.get('company_struct_name')?.enable();
      }
    });

    this.vacancyForm.get('city')?.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((newValue) => {
        if (newValue.length < 3) return;
        this.getCities(newValue);
      });

    this.vacancyForm.get('company_name')?.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((newValue) => {
        this.getCompanies(newValue);
      });

    this.vacancyForm.get('company_struct_name')?.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((newValue) => {
        this.getCompanyStructures(newValue);
      });

    this.vacancyForm.get('department_name')?.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((newValue) => {
        this.getDepartments(newValue);
      });

    this.vacancyForm.get('job_title_name')?.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((newValue) => {
        this.getJobTitles(newValue);
      });

    this.vacancyForm.get('chief_fio')?.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe((newValue) => {
        if (newValue && newValue.length > 3)
          this.responsibleUsers = this.users.filter(user => user.fullName.toLowerCase().includes(newValue.toLowerCase()));
        else
          this.responsibleUsers = [];
      });
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

  getCompanies(name: string) {
    this.api.v1DictCompanyFindCreate({name}, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.companies = data.body.data;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getCompanyStructures(name: string) {
    this.api.v1DictCompanyStructFindCreate({name}, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.companyStructures = data.body.data;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getDepartments(name: string) {
    const company_struct_id: string = this.vacancyForm.get('company_struct_id')?.value;
    this.api.v1DictDepartmentFindCreate({name, company_struct_id}, {observe: 'response'}).subscribe({
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

  getJobTitles(name: string) {
    const department_id: string = this.vacancyForm.get('department_id')?.value;
    this.api.v1DictJobTitleFindCreate({name, department_id}, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.jobTitles = data.body.data;
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

  autocompleteChange(fieldName: string, value?: string) {
    if (!value)
      this.vacancyForm.get(fieldName)?.reset();
    else
      this.vacancyForm.get(fieldName)?.setValue(value);
  }

  openGenerateModal() {
    this.vacancyModal.openGenerateModal(this.vacancyForm.controls['requirements'] as FormControl);
  }

  submitForm() {
    if (!this.isNewVacancy && !this.vacancyForm.value.id) {
      console.log('Отсутствует ID вакансии');
      return;
    }
    if (this.vacancyForm.invalid) {
      console.log('Не заполнены обязательные параметры');
      this.vacancyForm.markAllAsTouched();
      return;
    }
    ;

    const selection_type = this.vacancyForm.value.opened_positions > 1 ? ModelsVRSelectionType.VRSelectionTypeMass : ModelsVRSelectionType.VRSelectionTypePersonal;
    this.vacancyForm.controls['selection_type'].setValue(selection_type);

    this.isLoading = true;
    let observable = this.saveVacancy();
    if (!this.vacancyForm.controls['company_id'].value) {
      observable = this.createCompany().pipe(
        switchMap((res) => {
          if (res.body?.data)
            this.vacancyForm.controls['company_id'].setValue(res.body.data);
          return this.saveVacancy();
        })
      )
    }

    observable.subscribe({
      next: (data) => {
        if (data.status === 200) {
          const vacancyId = data.body?.data || this.vacancyForm.value.id;
          this.snackBarService.snackBarMessageSuccess('Данные успешно сохранены')

          if (this.isNewVacancy && vacancyId) {
            this.router.navigate(['/user/vacancy', vacancyId]);
          } else {
            this.onUpdate.emit();
          }
        } else {
          this.snackBarService.snackBarMessageError('Ошибка при отправке формы')
        }

        this.isLoading = false;
      },
      error: (error) => {
        this.snackBarService.snackBarMessageSuccess('Ошибка')
        this.isLoading = false;
      }
    });
  }
  createCompany() {
    return this.api.v1DictCompanyCreate({name: this.vacancyForm.value.company_name}, {observe: 'response'})
  }

  saveVacancy() {
    const vacancy = this.vacancyForm.value as VacancyapimodelsVacancyData;
    if (this.isNewVacancy)
      return this.api.v1SpaceVacancyCreate(vacancy, {observe: 'response'})
    else
      return this.api.v1SpaceVacancyUpdate(this.vacancyForm.value.id, vacancy, {observe: 'response'})
  }

}
