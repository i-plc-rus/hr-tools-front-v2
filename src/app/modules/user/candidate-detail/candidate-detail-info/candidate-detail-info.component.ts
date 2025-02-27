import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApiService} from '../../../../api/Api';
import {ApplicantViewExt} from '../../../../models/Applicant';
import {CandidateModalService} from '../../../../services/candidate-modal.service';

@Component({
  selector: 'app-candidate-detail-info',
  templateUrl: './candidate-detail-info.component.html',
  styleUrl: './candidate-detail-info.component.scss',
})
export class CandidateDetailInfoComponent {
  @Input() applicant?: ApplicantViewExt;
  @Input() isVacancyCard = false;
  @Input() isComparisonPage = false;
  @Input() photo?: string;
  @Input() resume?: File;
  @Output() onSubmit = new EventEmitter();

  constructor(
    private modalService: CandidateModalService,
    private api: ApiService
  ) { }

  openEditModal() {
    if (!this.applicant) return;
    this.modalService.editCandidateModal(this.applicant, this.photo, this.resume ? this.resume.name : undefined).subscribe(() =>
      this.onSubmit.emit(true)
    );
  }

  addTag(tag: string) {
    if (!this.applicant || tag === '') return;
    const id = this.applicant.id;
    this.api.v1SpaceApplicantTagUpdate(id, {tag}).subscribe({
      next: () => {
        this.onSubmit.emit(true)
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
        this.onSubmit.emit(true);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}