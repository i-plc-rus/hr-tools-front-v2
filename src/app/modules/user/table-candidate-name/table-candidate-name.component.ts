import {Component, Input} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {NegotiationView} from '../../../models/Negotiation';

@Component({
  selector: 'app-table-candidate-name',
  templateUrl: './table-candidate-name.component.html',
  styleUrl: './table-candidate-name.component.scss'
})
export class TableCandidateNameComponent implements ICellRendererAngularComp {
  @Input() photo_url: string = '';
  @Input() fio: string = '';
  params?: ICellRendererParams<NegotiationView>;

  constructor() {}

  agInit(params: ICellRendererParams<NegotiationView>): void {
    this.params = params;
    this.photo_url = params.data?.photo_url || '';
    this.fio = params.data?.fio || '';
  }

  refresh(params?: ICellRendererParams): boolean {
    return true;
  }

}
