import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../../../api/Api';
import {CandidateModalService} from '../../../../services/candidate-modal.service';
import {
  ApplicantapimodelsMultiChangeStageRequest,
  VacancyapimodelsSelectionStageView,
} from '../../../../api/data-contracts';
import {ApplicantView, ApplicantViewExt} from '../../../../models/Applicant';

@Component({
  selector: 'app-change-stage-modal',
  templateUrl: './change-stage-modal.component.html',
  styleUrl: './change-stage-modal.component.scss',
})
export class ChangeStageModalComponent implements OnInit {
  @Input() applicants?: ApplicantView[] | ApplicantViewExt[];
  onSubmit = new EventEmitter<boolean>();
  isLoading = false;
  vacancyId: string = '';

  stage_id = new FormControl<string>('', [Validators.required]);
  stages?: VacancyapimodelsSelectionStageView[];

  constructor(
    private modalService: CandidateModalService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.vacancyId = this.applicants?.[0]?.vacancy_id || '';
    this.getStageList();
  }

  submit() {
    this.isLoading = true;
    const ids = this.applicants?.map((a) => a.id);
    const changeStage: ApplicantapimodelsMultiChangeStageRequest = {
      ids,
      stage_id: this.stage_id.value || '',
    };
    this.api.v1SpaceApplicantMultiActionsChangeStageUpdate(changeStage, {observe: 'response'}).subscribe({
      next: () => {
        this.onSubmit.emit(true);
        this.isLoading = false;
        this.modalService.closeModal();
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }

  closeModal() {
    this.modalService.closeModal();
  }

  getStageList() {
    this.isLoading = true;
    this.api.v1SpaceVacancyStageListCreate(this.vacancyId, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          const dataStages = data.body.data as VacancyapimodelsSelectionStageView[];
          this.stages = dataStages.sort((a, b) => (a.stage_order || 0) - (b.stage_order || 0));
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    })
  }
}
