import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {NegotiationView} from '../../../models/Negotiation';

@Component({
  selector: 'app-table-candidate-name',
  templateUrl: './table-candidate-name.component.html',
  styleUrl: './table-candidate-name.component.scss'
})
export class TableCandidateNameComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams<NegotiationView>;

  constructor() {}

  agInit(params: ICellRendererParams<NegotiationView>): void {
    this.params = params;
  }

  refresh(params?: ICellRendererParams): boolean {
    return true;
  }

}
