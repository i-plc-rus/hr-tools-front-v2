import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {ModelsApplicantStatus} from '../../../../api/data-contracts';
import {StatusTag} from '../../../../models/StatusTag';
import {ApplicantView} from '../../../../models/Applicant';

type Params = ICellRendererParams<ApplicantView> & {
  onChange: (applicant?: ApplicantView) => void;
};

@Component({
  selector: 'app-candidate-status',
  templateUrl: './candidate-status.component.html',
  styleUrl: './candidate-status.component.scss'
})
export class CandidateStatusComponent implements ICellRendererAngularComp, OnChanges {
  @Input() applicant?: ApplicantView;
  @Output() onChange = new EventEmitter<ApplicantView>();
  params?: Params;
  className: StatusTag = 'info';
  status?: ModelsApplicantStatus;
  id: string = '';
  statuses: {className: StatusTag, value: ModelsApplicantStatus}[] = [
    {className: 'danger', value: ModelsApplicantStatus.ApplicantStatusRejected},
  ];

  constructor() { }

  agInit(params: Params): void {
    this.params = params;
    this.status = params.value;
    this.applicant = params.data;
    this.className = params.node.data?.statusClass || 'info';
    this.id = params.node.data?.id || '';
  }

  refresh(params?: ICellRendererParams): boolean {
    return true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applicant']) {
      this.status = this.applicant?.status;
      this.className = this.applicant?.statusClass || 'info';
      this.id = this.applicant?.id || '';
    }
  }

  changeStatus(status: ModelsApplicantStatus) {
    if (this.params && this.params.onChange instanceof Function) {
      this.params.onChange(this.applicant);
    }
    else {
      this.onChange.emit(this.applicant);
    }
  }
}
