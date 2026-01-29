import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-secure-text',
  standalone: true,
  template: `
    <div [attr.aria-label]="text" role="text" class="secure-container">
      <div #source class="source-render" [class.hidden]="isReady">
        <ng-content></ng-content>
      </div>

      <div #container class="canvas-wrapper"></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .source-render {
        position: absolute;
        left: -9999px;
        width: 720px;
        font-size: 22px;
        line-height: 28px;
        text-align: center;
        color: black;
        margin: 0;
        padding: 0;
      }

      .canvas-wrapper {
        display: flex;
        justify-content: center;
        margin-top: -8px;
        transform: translateY(-2px);
        line-height: 0;
      }

      .canvas-wrapper canvas {
        display: block;
        max-width: 100%;
        height: auto;
      }
    `,
  ],
})
export class SecureTextComponent implements AfterViewInit, OnChanges {
  @Input() text: string = '';
  @ViewChild('source') source!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  isReady = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['text'] && !changes['text'].firstChange) {
      this.generateImage();
    }
  }

  ngAfterViewInit() {
    this.generateImage();
  }

  async generateImage() {
    if (!this.text) return;
    this.container.nativeElement.innerHTML = '';

    setTimeout(async () => {
      const canvas = await html2canvas(this.source.nativeElement, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        x: -5,
        y: 0,
        width: this.source.nativeElement.offsetWidth + 10,
        height: this.source.nativeElement.offsetHeight + 10,
      });

      this.container.nativeElement.appendChild(canvas);
      this.source.nativeElement.innerText = '';
      this.cdr.detectChanges();
    }, 50);
  }
}
