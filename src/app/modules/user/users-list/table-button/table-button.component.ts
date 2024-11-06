import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {SpaceUser as User} from '../../../../models/SpaceUser';


type Params = ICellRendererParams<User> & {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

@Component({
  selector: 'app-table-button',
  templateUrl: './table-button.component.html',
  styleUrl: './table-button.component.scss'
})
export class TableButtonComponent implements ICellRendererAngularComp {
  params!: Params;

  constructor() { }

  agInit(params: Params): void {
    this.params = params;
  }

  refresh(params?: ICellRendererParams): boolean {
    return true;
  }

  onEdit() {
    if (this.params.onEdit instanceof Function && this.params.data) {
      this.params.onEdit(this.params.data);
    }
  }

  onDelete() {
    if (this.params.onDelete instanceof Function && this.params.data) {
      this.params.onDelete(this.params.data);
    }
  }

}
