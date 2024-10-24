import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input, OnChanges, SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TemplatePortal} from '@angular/cdk/portal';

@Directive({
  selector: '[dropdown]',
  standalone: true
})
export class DropdownDirective implements OnChanges {
  // Условие при котором клик по элементу откроет выпадашку
  @Input() showOnClick: boolean = true;
  // Есть ли у выпадашки оверлей, клик по которому ее закроет
  @Input() dropdownBackdrop: boolean = true;
  // Состояние показа выпадашки
  @Input() showDropdown: boolean = false;
  // Параметры позиционирования выпадашки
  @Input() originX: 'start' | 'center' | 'end' = 'start';
  @Input() originY: 'top' | 'center' | 'bottom' = 'bottom';
  @Input() offsetX: number = 0;
  @Input() offsetY: number = 16;
  // Ссылка на контент выпадашки
  @Input() dropdownContentRef?: TemplateRef<any>;
  // Слушаем клики по элементу директивы, чтобы показать/скрыть выпадашку
  @HostListener('click', ['$event']) toggleDropdown() {
    if (!this.showOnClick) {
      return;
    }

    this.showDropdown = !this.showDropdown;

    if (this.showDropdown) {
      this.openDropdown();
    } else {
      this.closeDropdown();
    }
  }

  overlayRef?: OverlayRef;
  destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private el: ElementRef,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showDropdown']) {
      if (changes['showDropdown'].currentValue) {
        this.openDropdown();
      } else {
        this.closeDropdown();
      }
    }
  }

  openDropdown() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: this.dropdownBackdrop,
      backdropClass: 'bg-transparent',
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.el)
        .withPositions([
          {
            offsetX: this.offsetX,
            offsetY: this.offsetY,
            originX: this.originX,
            originY: this.originY,
            overlayX: 'start',
            overlayY: 'top',
          }
        ])
    });

    const portal = new TemplatePortal(this.dropdownContentRef!, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.overlayRef.backdropClick()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        console.log('CLICKKKK');
        this.overlayRef?.dispose();
      });
  }

  closeDropdown() {
    this.overlayRef?.dispose();
  }
}
