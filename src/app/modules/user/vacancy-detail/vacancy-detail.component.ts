import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../api/Api';
import { VacancyView } from '../../../models/Vacancy';
import {
  GptmodelsGenVacancyDescRequest,
  ModelsEmployment,
  ModelsExperience,
  ModelsSchedule,
  ModelsVacancyStatus,
  ModelsVRSelectionType,
  ModelsVRType,
  ModelsVRUrgency,
} from '../../../api/data-contracts';
import { vacancyStatuses } from '../user-consts';
import { UsersModalService } from '../../../services/users-modal.service';

type VacancyDetailCategory =
  | 'description'
  | 'publication'
  | 'stages'
  | 'integrations'
  | 'team';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrl: './vacancy-detail.component.scss',
})
export class VacancyDetailComponent implements OnInit {
  category = new FormControl<VacancyDetailCategory>('description');
  isNewVacancy = false;
  vacancy?: VacancyView;
  vacancyForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    chief_fio: new FormControl('', Validators.required),
    city_id: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    company_id: new FormControl(''),
    company_name: new FormControl('', Validators.required),
    company_struct_id: new FormControl('', Validators.required),
    company_struct_name: new FormControl('', Validators.required),
    department_id: new FormControl('', Validators.required),
    department_name: new FormControl('', Validators.required),
    job_title_id: new FormControl('', Validators.required),
    job_title_name: new FormControl('', Validators.required),
    opened_positions: new FormControl(1, Validators.required),
    place_of_work: new FormControl('', Validators.required),
    requirements: new FormControl(
      '<strong>Требования:</strong><br/><br/><strong>Обязанности:</strong><br/><br/><strong>Условия работы:</strong><br/><br/>',
      Validators.required
    ),
    vacancy_name: new FormControl('', Validators.required),
    request_type: new FormControl<ModelsVRType | undefined>(
      undefined,
      Validators.required
    ),
    urgency: new FormControl<ModelsVRUrgency | undefined>(
      undefined,
      Validators.required
    ),
    salary: new FormGroup(
      {
        by_result: new FormControl<Number | undefined>(undefined),
        from: new FormControl<Number | undefined>(undefined),
        to: new FormControl<Number | undefined>(undefined),
        in_hand: new FormControl<Number | undefined>(undefined),
      },
      Validators.required
    ),
    employment: new FormControl<ModelsEmployment | undefined>(undefined),
    experience: new FormControl<ModelsExperience | undefined>(undefined),
    schedule: new FormControl<ModelsSchedule | undefined>(undefined),
    selection_type: new FormControl<ModelsVRSelectionType | undefined>(
      undefined
    ),
  });
  statuses = vacancyStatuses;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private modalService: UsersModalService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.getVacancyById(params['id']);
      } else this.isNewVacancy = true;
    });
  }

  getVacancyById(id: string) {
    this.api.v1SpaceVacancyDetail(id, { observe: 'response' }).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.vacancy = new VacancyView(data.body.data);
          const stages = this.vacancy.selection_stages || [];
          this.vacancy.selection_stages = stages.sort(
            (a, b) => (a.stage_order || 0) - (b.stage_order || 0)
          );
          this.vacancyForm.patchValue(this.vacancy);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  changeStatus(id: string, status: ModelsVacancyStatus) {
    this.api
      .v1SpaceVacancyChangeStatusUpdate(id, { status }, { observe: 'response' })
      .subscribe({
        next: () => {
          this.getVacancyById(id);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onBack() {
    if (!this.vacancy || this.isNewVacancy)
      this.router.navigate(['user', 'vacancy', 'list']);
    else
      this.router.navigate(['user', 'vacancy', this.vacancy.id, 'candidates']);
  }

  generateSurvey() {
    this.modalService.openGenerateSurveyModal().subscribe((confirmedData: any | undefined) => {
      if (confirmedData) {
        const newBlank: GptmodelsGenVacancyDescRequest = {
            text: JSON.stringify(confirmedData),
          };
      // this.api.v1GptGenerateVacancyDescriptionCreate(newBlank).subscribe({
      //   next: () => {
      //     this.modalService.closeModal();
      //   },
      //   error: (error) => {
      //     console.log(error);
      //   }
      // });
      console.log('Получены данные формы:', newBlank, '/////////');
      } else {
        this.modalService.closeModal();
      }
    });
  }
}
