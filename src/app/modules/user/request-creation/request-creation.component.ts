import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api/Api';
import { DictapimodelsCompanyStructView, DictapimodelsCompanyView, DictapimodelsDepartmentView, ModelsEmployment, ModelsExperience, ModelsSchedule, ModelsVRSelectionType, ModelsVRType, ModelsVRUrgency } from '../../../api/data-contracts';
import { Observable, forkJoin, map, startWith } from 'rxjs';
import { DictapimodelsCityView } from '../../../api/data-contracts';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request-creation',
  templateUrl: './request-creation.component.html',
  styleUrl: './request-creation.component.scss'
})
export class RequestCreationComponent implements OnInit {
@ViewChild('stepper') stepper! : MatStepper
@ViewChild('saveDraftDialog') saveDraftDialog!: TemplateRef<any>;
@ViewChild('draftDialog') draftDialog!: TemplateRef<any>;
showForm: boolean = false;
isLastStep: boolean = false;
users: any = []
ModelsVRSelectionType = ModelsVRSelectionType

expiriences: {name: string; value: ModelsExperience}[] =[
  {name: 'Не имеет значения', value: ModelsExperience.ExperienceNoMatter},
  {name: 'Более года', value: ModelsExperience.ExperienceMoreThan1},
  {name: 'Более 3 лет', value: ModelsExperience.ExperienceMoreThan3},
  {name: 'Болеее 5 лет', value: ModelsExperience.ExperienceMoreThan5},
  {name: 'Болеее 10 лет', value: ModelsExperience.ExperienceMoreThan10},
]

urgencys: {name: string; value: ModelsVRUrgency}[] = [
  {name: 'Срочно', value: ModelsVRUrgency.VRTypeUrgent},
  {name: 'В плановом порядке', value: ModelsVRUrgency.VRTypeNonUrgent}
]


request_types: {name: string; value: ModelsVRType}[] = [
  {name: 'Новая позиция', value: ModelsVRType.VRTypeNew},
  {name: 'Замена', value: ModelsVRType.VRTypeReplace}
]

employments: {name: string; value: ModelsEmployment}[] = [
  {name: 'Временная', value: ModelsEmployment.EmploymentTemporary},
  {name: 'Постоянная', value: ModelsEmployment.EmploymentFull},
  {name: 'Стажировка', value: ModelsEmployment.EmploymentInternship},
  {name: 'Частичная', value: ModelsEmployment.EmploymentPartial}
]

schedules: {name: string; value: ModelsSchedule}[] = [
  {name: 'Гибкий', value: ModelsSchedule.ScheduleFlexible},
  {name: 'Сменный', value: ModelsSchedule.ScheduleFlyInFlyOut},
  {name: 'Неполный день', value: ModelsSchedule.SchedulePartTime},
  {name: 'Полный день', value: ModelsSchedule.ScheduleFullDay},
  {name: 'Вахта', value: ModelsSchedule.ScheduleShift}
]
 
form = new FormGroup({
  company_name: new FormControl('', [Validators.required]),
  vacancy_name: new FormControl('', [Validators.required]),
  department_id: new FormControl('', [Validators.required]),
  company_struct_id: new FormControl('', [Validators.required]),
  job_title_id: new FormControl('', [Validators.required]),
  place_of_work: new FormControl(''),
  chief_fio: new FormControl('', [Validators.required]),
  cityId: new FormControl<DictapimodelsCityView | null>(null, [Validators.required]),
  opened_positions: new FormControl(null,  [Validators.required]),
  urgency: new FormControl<ModelsVRUrgency | undefined>(undefined),
  request_type: new FormControl<ModelsVRType | undefined>(undefined),
  requirements: new FormControl(''),
  employment: new FormControl<ModelsEmployment | undefined>(undefined, [Validators.required]),
  expirience: new FormControl<ModelsExperience | undefined>(undefined, [Validators.required]),
  schedule: new FormControl<ModelsSchedule | undefined>(undefined, [Validators.required]),
  selection_type: new FormControl<ModelsVRSelectionType | undefined>(undefined),
  interviewers: new FormArray([
    new FormGroup({
      space_user_id: new FormControl('', [Validators.required]),
      stage: new FormControl(1)
    })
  ]),

})

editorConfig = {
  toolbar: [
    ['bold', 'italic', 'underline'], 
    [{ 'list': 'ordered'}, { 'list': 'bullet' }] 
  ]
};

city: DictapimodelsCityView[] = []
filteredCity$!: Observable<DictapimodelsCityView[]>; 
companyStructureArray: DictapimodelsCompanyStructView[] = []
companyDepartmentArray: DictapimodelsDepartmentView[] = []
companyJobsNamesArray: DictapimodelsCompanyView[] = []

constructor(private api: ApiService,
  private dialog: MatDialog) {}


ngOnInit(): void {
  forkJoin({
    companyStructure: this.api.v1DictCompanyStructFindCreate({}),
    city: this.api.v1DictCityFindCreate({}),
    user: this.api.v1UsersListCreate({})
  }).subscribe({
    next: ({ companyStructure, city, user }:any) => {
      this.companyStructureArray = companyStructure.body.data;
      this.city = city.body.data;
      this.users = user.body.data
      this.initializeCityAutocomplete();
    },
    error: (err) => {
      console.error('Ошибка при загрузке данных:', err);
    }
  });


  this.form.get('company_struct_id')?.valueChanges.subscribe((value) => {
    this.form.get('department_id')?.reset()
    this.api.v1DictDepartmentFindCreate({company_struct_id: String(value)}).subscribe({
      next: (response: any) => {
        this.companyDepartmentArray = response.body.data
      }
    })
  })

  this.form.get('department_id')?.valueChanges.subscribe((value) => {
    this.form.get('job_title_id')?.reset()
    this.api.v1DictJobTitleFindCreate({department_id: String(value)}).subscribe({
      next: (response: any) => {
        this.companyJobsNamesArray = response.body.data
      }
    })
  })
}

get interviewers(): FormArray {
  return this.form.get('interviewers') as FormArray;
}

addInterviewer(): void {
  this.interviewers.push(
    new FormGroup({
      space_user_id: new FormControl('', [Validators.required]),
      stage: new FormControl(this.interviewers.length + 1)
    })
  );
}


removeInterviewer(index: number): void {
  if (this.interviewers.length > 1) { 
    this.interviewers.removeAt(index);
  }
}

updateStepNumbers() {
  this.interviewers.controls.forEach((control, index) => {
    control.get('stage')?.setValue(index + 1);
  });
}


initializeCityAutocomplete(): void {
  this.filteredCity$ = this.form.controls['cityId'].valueChanges.pipe(
    startWith(''),
    map(value => typeof value === 'string' ? value : value?.address),
    map(address => address ? this._filterCities(address) : this.city.slice())
  );
}

private _filterCities(address: string): DictapimodelsCityView[] {
  const filterValue = address.toLowerCase();
  return this.city.filter(city => city.address?.toLowerCase().includes(filterValue));
}

displayCityName(city: DictapimodelsCityView): string {
  return city && city.address ? city.address : '';
}

startForm(value: ModelsVRSelectionType) {
  this.form.get('selection_type')?.setValue(value);
  const dialogRef = this.dialog.open(this.draftDialog);

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'useDraft') {
      this.useDraft();
    } else if (result === 'newRequest') {
      this.newRequest();
    }
  });
}

useDraft(): void {
  const draft = localStorage.getItem('draftFormData');
  if (draft) {
    const draftData = JSON.parse(draft);
    this.form.patchValue(draftData); 
    this.showForm = true;
  } else {
    console.error('Нет данных черновика для загрузки.');
  }
  this.dialog.closeAll()
}

newRequest(): void {
  this.showForm = true; 
  this.dialog.closeAll()
}

goToNextStep() {
  this.stepper.next()
}

onStepChange(event: any) {
  this.isLastStep = event.selectedIndex === this.stepper.steps.length - 1;
}

openSaveDraftDialog(): void {
  this.dialog.open(this.saveDraftDialog);
}

closeDialog(): void {
  this.dialog.closeAll();
}

saveDraftAndExit(): void {
    localStorage.setItem('draftFormData', JSON.stringify(this.form.value));
    console.log("Форма сохранена как черновик");
    this.closeDialog(); 
}

goBack() {
  this.showForm = false
}

onSubmit() {
  const requestData = {
    company_name: this.form.controls.company_name.value || undefined,
    vacancy_name: this.form.controls.vacancy_name.value || undefined,
    department_id: this.form.controls.department_id.value || undefined,
    company_struct_id: this.form.controls.company_struct_id.value || undefined,
    job_title_id: this.form.controls.job_title_id.value || undefined,
    city_id: this.form.controls.cityId.value?.id || undefined,
    place_of_work: this.form.controls.place_of_work.value || undefined,
    chief_fio: this.form.controls.chief_fio.value || undefined,
    opened_positions: Number(this.form.controls.opened_positions.value) || undefined,
    urgency: this.form.controls.urgency.value || undefined,
    request_type: this.form.controls.request_type.value || undefined,
    requirements: this.form.controls.requirements.value || undefined,
    employment: this.form.controls.employment.value || undefined,
    expirience: this.form.controls.expirience.value || undefined,
    schedule: this.form.controls.schedule.value || undefined,
    selection_type: this.form.controls.selection_type.value || undefined,
    
    approval_stages: this.form.controls.interviewers.value?.map(interviewer => ({
      space_user_id: interviewer.space_user_id !== null ? interviewer.space_user_id : undefined,
      stage: interviewer.stage || undefined
  })) || []
  };

  if(this.form.valid) {
  this.api.v1SpaceVacancyRequestCreate(requestData).subscribe(res => console.log(res))
  } else {
    console.log('Не заполнены обязательные параметры')
  }
 
}

}
