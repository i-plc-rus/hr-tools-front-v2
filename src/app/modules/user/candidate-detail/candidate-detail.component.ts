import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiService} from '../../../api/Api';
import {ActivatedRoute} from '@angular/router';
import {ApplicantViewExt} from '../../../models/Applicant';
import {CandidateModalService} from '../../../services/candidate-modal.service';
import {
  ApplicantapimodelsApplicantHistoryFilter,
  ApplicantapimodelsApplicantHistoryView,
  FilesapimodelsFileView,
  VacancyapimodelsSelectionStageView
} from '../../../api/data-contracts';
import {ApplicantHistoryView} from '../../../models/ApplicantHistory';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrl: './candidate-detail.component.scss',
})
export class CandidateDetailComponent implements OnInit, OnChanges {
  @Input() applicantId: string = '';
  @Output() onClose = new EventEmitter();
  isLoading = false;
  isVacancyCard = false;
  applicant?: ApplicantViewExt;
  stages?: VacancyapimodelsSelectionStageView[];
  changesLog?: ApplicantHistoryView[];
  changesCommentsOnly = new FormControl<boolean>(false);
  comment = new FormControl('');

  constructor(
    private modalService: CandidateModalService,
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applicantId'] && this.applicantId !== '') {
      this.getApplicantById(this.applicantId);
      this.isVacancyCard = true;
    }
  }

  ngOnInit(): void {
    if (this.applicantId === '') {
      this.activatedRoute.params.subscribe(params => {
        this.getApplicantById(params['id']);
      })
    }
    this.changesCommentsOnly.valueChanges.subscribe((value) =>
      this.getChangesLog(!!value)
    );
  }

  getApplicantById(id: string) {
    this.isLoading = true;
    this.api.v1SpaceApplicantDetail(id, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.applicant = new ApplicantViewExt(data.body.data);
          this.comment.setValue(this.applicant.comment);
          if (this.applicant.vacancy_id)
            this.getStages(this.applicant.vacancy_id);
          this.getChangesLog(!!this.changesCommentsOnly.value);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  getChangesLog(comments_only: boolean = false) {
    if (!this.applicant) return;
    const filter = {comments_only} as ApplicantapimodelsApplicantHistoryFilter;
    this.api.v1SpaceApplicantChangesUpdate(this.applicant.id, filter, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          let dataChanges = data.body.data as ApplicantapimodelsApplicantHistoryView[];
          dataChanges = dataChanges.reverse();
          this.changesLog = dataChanges.map((change) => new ApplicantHistoryView(change));
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getStages(vacancyId: string) {
    this.api.v1SpaceVacancyStageListCreate(vacancyId, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          const dataStages = data.body.data as VacancyapimodelsSelectionStageView[];
          this.stages = dataStages.sort((a, b) => (a.stage_order || 0) - (b.stage_order || 0));
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  changeStage(stage_id?: string) {
    if (!this.applicant || !stage_id) return;
    const id = this.applicant.id;
    this.api.v1SpaceApplicantChangeStageUpdate(id, {stage_id}).subscribe({
      next: () => {
        this.getApplicantById(id);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  openEditModal() {
    if (!this.applicant) return;
    const id = this.applicant.id;
    this.modalService.editCandidateModal(this.applicant).subscribe(() =>
      this.getApplicantById(id)
    );
  }

  openRejectModal() {
    if (!this.applicant) return;
    const id = this.applicant.id;
    this.modalService.rejectCandidateModal([this.applicant]).subscribe(() =>
      this.getApplicantById(id)
    );
  }

  openCommentModal() {
    if (!this.applicant) return;
    this.modalService.openCommentModal(this.applicant.id).subscribe(() =>
      this.getChangesLog(!!this.changesCommentsOnly.value)
    );
  }

  addTag(tag: string) {
    if (!this.applicant || tag === '') return;
    const id = this.applicant.id;
    this.api.v1SpaceApplicantTagUpdate(id, {tag}).subscribe({
      next: () => {
        this.getApplicantById(id);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  removeTag(tag: string) {
    if (!this.applicant) return;
    const id = this.applicant.id;
    this.api.v1SpaceApplicantTagDelete(id, {tag}).subscribe({
      next: () => {
        this.getApplicantById(id);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  saveComment() {
    if (!this.applicant) return;
    const id = this.applicant.id;
    const comment = this.comment.value || '';
    const applicant = {...this.applicant, comment};
    this.isLoading = true;
    this.api.v1SpaceApplicantUpdate(id, applicant).subscribe({
      next: () => {
        this.getApplicantById(id);
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }

  closeDetail() {
    this.onClose.emit();
  }

  onBack() {
    window.history.back();
  }
}