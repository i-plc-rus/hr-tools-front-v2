import {Component} from '@angular/core';
import type {ILoadingOverlayComp, ILoadingOverlayParams} from 'ag-grid-community';

@Component({
  selector: 'app-table-spinner',
  templateUrl: './table-spinner.component.html',
  styleUrl: './table-spinner.component.scss',
})
export class TableSpinnerComponent implements ILoadingOverlayComp {
  eGui!: HTMLElement;

  agInit(params: ILoadingOverlayParams): void {
    this.eGui = document.createElement('div');
  }

  getGui(): HTMLElement {
    return this.eGui;
  }

}