import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {ModelsNegotiationStatus} from '../../../../api/data-contracts';
import {StatusTag} from '../../../../models/StatusTag';
import {NegotiationView} from '../../../../models/Negotiation';

type Params = ICellRendererParams<NegotiationView> & {
  onChange: (id: string, status: ModelsNegotiationStatus) => void;
};

@Component({
  selector: 'app-negotiation-status',
  templateUrl: './negotiation-status.component.html',
  styleUrl: './negotiation-status.component.scss'
})
export class NegotiationStatusComponent implements ICellRendererAngularComp, OnChanges {
  @Input() negotiation?: NegotiationView;
  @Output() onChange = new EventEmitter<{id: string, status: ModelsNegotiationStatus}>();
  params?: Params;
  className: StatusTag = 'info';
  status?: ModelsNegotiationStatus;
  id: string = '';
  statuses: {className: StatusTag, value: ModelsNegotiationStatus}[] = [
    {className: 'warning', value: ModelsNegotiationStatus.NegotiationStatusWait},
    {className: 'success', value: ModelsNegotiationStatus.NegotiationStatusAccepted},
    {className: 'danger', value: ModelsNegotiationStatus.NegotiationStatusRejected}
  ];

  constructor() { }

  agInit(params: Params): void {
    this.params = params;
    this.status = params.value;
    this.className = params.node.data?.statusClass || 'info';
    this.id = params.node.data?.id || '';
  }

  refresh(params?: ICellRendererParams): boolean {
    return true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['negotiation']) {
      this.status = this.negotiation?.negotiation_status;
      this.className = this.negotiation?.statusClass || 'info';
      this.id = this.negotiation?.id || '';
    }
  }

  changeStatus(status: ModelsNegotiationStatus) {
    if (this.params && this.params.onChange instanceof Function) {
      this.params.onChange(this.id, status);
    }
    else {
      this.onChange.emit({id: this.id, status});
    }
  }
}
