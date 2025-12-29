import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-comment-renderer',
  template: `
    <div class="flex flex-col py-2 leading-tight">
      <div #textContainer
           [class.whitespace-normal]="params.data?._isExpanded" 
           [class.truncate]="!params.data?._isExpanded">
        {{ params.value }}
      </div>
      
      <button 
        [class.hidden]="!shouldShowButton"
        (click)="toggleExpand($event)" 
        class="text-[var(--link-default)] text-[14px] text-left mt-1 cursor-pointer focus:outline-none hover:underline pointer-events-auto">
        {{ params.data?._isExpanded ? 'Скрыть' : 'Показать полностью' }}
      </button>
    </div>
  `,
})
export class CommentRendererComponent implements ICellRendererAngularComp, AfterViewInit {
  params!: ICellRendererParams;
  shouldShowButton = false;

  @ViewChild('textContainer') textContainer!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  agInit(params: ICellRendererParams): void {
    this.params = params;
    if (this.params.data && this.params.data._isExpanded === undefined) {
      this.params.data._isExpanded = false;
    }
  }

  ngAfterViewInit() {
    this.checkOverflow();
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    this.checkOverflow();
    return true;
  }

  checkOverflow() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!this.textContainer) return;
        const el = this.textContainer.nativeElement;       
        const isTruncated = el.scrollWidth > el.clientWidth;
        const hasNewLines = String(this.params.value || '').includes('\n');        
        const isLongText = String(this.params.value || '').length > 60;
        this.shouldShowButton = isTruncated || hasNewLines || isLongText;        
        this.cdr.detectChanges();
      });
    });
  }

  toggleExpand(event: MouseEvent) {
    event.stopPropagation();
    this.params.data._isExpanded = !this.params.data._isExpanded;
    this.params.api.onRowHeightChanged();
    this.checkOverflow();
  }
}