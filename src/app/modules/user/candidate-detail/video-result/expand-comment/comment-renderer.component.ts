import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-comment-renderer',
  template: `
    <div class="flex flex-col py-2 leading-tight">
      <div [class.whitespace-normal]="params.data._isExpanded" 
           [class.truncate]="!params.data._isExpanded">
        {{ params.value }}
      </div>
      <button 
        (click)="toggleExpand()" 
        class="text-[var(--link-default)] text-[14px] text-left mt-1 cursor-pointer focus:outline-none">
        {{ params.data._isExpanded ? 'Скрыть' : 'Показать полностью' }}
      </button>
    </div>
  `,
  
})
export class CommentRendererComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  toggleExpand() {
    this.params.data._isExpanded = !this.params.data._isExpanded;
    // Этот метод критически важен — он заставляет грид пересчитать высоту
    this.params.api.onRowHeightChanged();
  }
}