import { Component } from '@angular/core';
import {ICellRendererParams} from 'ag-grid-community';
import {SpaceapimodelsSpaceUser} from '../../../../../../../../api/data-contracts';
import {NgxMaskPipe} from 'ngx-mask';

@Component({
  selector: 'app-cell-member-contacts',
  standalone: true,
  imports: [
    NgxMaskPipe
  ],
  templateUrl: './cell-member-contacts.component.html',
  styleUrl: './cell-member-contacts.component.scss'
})
export class CellMemberContactsComponent {
  phone: string = '';
  email: string = '';
  params?: ICellRendererParams<SpaceapimodelsSpaceUser>;

  constructor() {}

  agInit(params: ICellRendererParams<SpaceapimodelsSpaceUser>): void {
    this.params = params;
    this.phone = params.data?.phone_number || 'Не указан';
    this.email = params.data?.email || '';
  }

  refresh(params?: ICellRendererParams): boolean {
    return true;
  }
}
