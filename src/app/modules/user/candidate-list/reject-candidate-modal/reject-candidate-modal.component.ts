import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../../api/Api';
import {CandidateModalService} from '../../../../services/candidate-modal.service';
import {
  ApplicantapimodelsMultiRejectRequest,
  ApplicantapimodelsRejectReasons,
  ApplicantapimodelsRejectRequest,
  ModelsRejectInitiator,
} from '../../../../api/data-contracts';
import {ApplicantView, ApplicantViewExt} from '../../../../models/Applicant';

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
    initiator: new FormControl<ModelsRejectInitiator | undefined>(undefined, [Validators.required]),
    reason: new FormControl('', [Validators.required]),
  });
  rejectInitiatorTypes = Object.values(ModelsRejectInitiator);
  rejectReasonList?: ApplicantapimodelsRejectReasons;
  currentReasonList: string[] = [];

  constructor(
    private modalService: CandidateModalService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getRejectList();
    this.rejectForm.controls.initiator.valueChanges.subscribe((value) => {
      switch (value) {
        case ModelsRejectInitiator.HrReject:
          this.currentReasonList = this.rejectReasonList?.hr_reasons ?? [];
          break;
        case ModelsRejectInitiator.HeadReject:
          this.currentReasonList = this.rejectReasonList?.head_reasons ?? [];
          break;
        case ModelsRejectInitiator.ApplicantReject:
          this.currentReasonList = this.rejectReasonList?.applicant_reasons ?? [];
          break;
        default:
          this.currentReasonList = [];
          break;
      }
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

  getRejectList() {
    this.isLoading = true;
    this.api.v1SpaceApplicantRejectListCreate({observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.rejectReasonList = data.body.data;
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
