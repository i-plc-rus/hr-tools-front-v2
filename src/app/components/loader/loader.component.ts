import {Component} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import type {ILoadingOverlayComp, ILoadingOverlayParams} from 'ag-grid-community';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements ILoadingOverlayComp {
  eGui!: HTMLElement;

  agInit(params: ILoadingOverlayParams): void {
    this.eGui = document.createElement('div');
  }

  getGui(): HTMLElement {
    return this.eGui;
  }

}