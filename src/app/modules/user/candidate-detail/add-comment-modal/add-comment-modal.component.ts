import {Component, EventEmitter, Input} from '@angular/core';
import {CandidateModalService} from '../../../../services/candidate-modal.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../api/Api';
import {ApplicantapimodelsApplicantNote} from '../../../../api/data-contracts';

@Component({
  selector: 'app-add-comment-modal',
  templateUrl: './add-comment-modal.component.html',
  styleUrl: './add-comment-modal.component.scss',
})
export class AddCommentModalComponent {
  @Input() applicantId: string = '';
  commentForm = new FormGroup({
    note: new FormControl('', Validators.required),
    is_private: new FormControl(false),
  });
  isLoading = false;
  onSubmit = new EventEmitter<boolean>();

  constructor(
    private modalService: CandidateModalService,
    private api: ApiService
  ) { }

  closeModal() {
    this.modalService.closeModal();
  }

  submit() {
    if (this.commentForm.invalid) return;
    this.isLoading = true;
    const note = this.commentForm.value as ApplicantapimodelsApplicantNote;
    this.api.v1SpaceApplicantNoteUpdate(this.applicantId, note).subscribe({
      next: () => {
        this.onSubmit.emit(true);
        this.isLoading = false;
        this.modalService.closeModal();
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });

  }

}
