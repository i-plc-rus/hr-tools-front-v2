import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../api/Api';
import {CandidateModalService} from '../../../../services/candidate-modal.service';
import {
  ApplicantapimodelsMultiRejectRequest,
  ApplicantapimodelsRejectRequest,
  ModelsRejectInitiator,
  DictapimodelsRejectReasonFind,
  DictapimodelsRejectReasonView
} from '../../../../api/data-contracts';
import {ApplicantView, ApplicantViewExt} from '../../../../models/Applicant';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-reject-candidate-modal',
  templateUrl: './reject-candidate-modal.component.html',
  styleUrl: './reject-candidate-modal.component.scss',
})
export class RejectCandidateModalComponent implements OnInit {
  @Input() applicants?: ApplicantView[] | ApplicantViewExt[];
  onSubmit = new EventEmitter<boolean>();
  isLoading = false;

  rejectForm = new FormGroup({
    initiator: new FormControl<ModelsRejectInitiator>(ModelsRejectInitiator.ApplicantReject, [Validators.required]),
    reason: new FormControl('', [Validators.required]),
  });
  rejectInitiatorTypes = Object.values(ModelsRejectInitiator);
  rejectReasonList?: DictapimodelsRejectReasonView[];

  constructor(
    private modalService: CandidateModalService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getRejectList(this.rejectListBody);
    this.rejectForm.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.getRejectList(this.rejectListBody);
      });
  }

  submit() {
    if (!this.rejectForm.valid || !this.applicants) return;
    this.isLoading = true;
    const reject = this.rejectForm.value as ApplicantapimodelsRejectRequest;
    let observable;
    if (this.applicants.length === 1)
      observable = this.api.v1SpaceApplicantRejectUpdate(this.applicants[0].id, reject, {observe: 'response'});
    else {
      const multiReject: ApplicantapimodelsMultiRejectRequest = {
        ids: this.applicants.map((a) => a.id),
        reject,
      };
      observable = this.api.v1SpaceApplicantMultiActionsRejectUpdate(multiReject, {observe: 'response'});
    }

    observable.subscribe({
      next: () => {
        this.onSubmit.emit(true);
        this.isLoading = false;
        this.modalService.closeModal();
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    })
  }

  closeModal() {
    this.modalService.closeModal();
  }

  getRejectList(body: DictapimodelsRejectReasonFind) {
    this.api.v1DictRejectReasonFindCreate(body, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.rejectReasonList = data.body.data;
        }
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

  get rejectListBody(): DictapimodelsRejectReasonFind {
    return {
      initiator: this.rejectForm.controls.initiator.value || undefined,
      search: this.rejectForm.controls.reason.value || '',
    }
  }

}
