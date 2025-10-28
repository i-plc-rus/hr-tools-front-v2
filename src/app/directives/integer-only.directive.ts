import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[integerOnly]', // Selector to apply the directive
})
export class IntegerOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const initialValue = this.el.nativeElement.value;
    // Remove any non-digit characters
    const newValue = initialValue.replace(/[^0-9]/g, '');

    if (initialValue !== newValue) {
      this.el.nativeElement.value = newValue;
      // Optionally, trigger a change event if using ngModel
      // this.el.nativeElement.dispatchEvent(new Event('input'));
    }
  }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData;
    if (clipboardData) {
      const pastedText = clipboardData.getData('text');
      if (/[^0-9]/.test(pastedText)) {
        event.preventDefault(); // Prevent pasting if non-digits are present
      }
    }
  }
}
