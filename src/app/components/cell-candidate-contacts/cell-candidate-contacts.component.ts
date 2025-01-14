import {Component, Input} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {NegotiationView} from '../../models/Negotiation';
import {ApplicantView} from '../../models/Applicant';

@Component({
  selector: 'app-cell-candidate-contacts',
  templateUrl: './cell-candidate-contacts.component.html',
  styleUrl: './cell-candidate-contacts.component.scss'
})
export class CellCandidateContactsComponent implements ICellRendererAngularComp {
  @Input() phone: string = '';
  @Input() email: string = '';
  params?: ICellRendererParams<NegotiationView | ApplicantView>;

  constructor() {}

  agInit(params: ICellRendererParams<NegotiationView | ApplicantView>): void {
    this.params = params;
    this.phone = params.data?.phone || '';
    this.email = params.data?.email || '';
  }

  refresh(params?: ICellRendererParams): boolean {
    return true;
  }

}
