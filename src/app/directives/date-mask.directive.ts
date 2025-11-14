import { Directive, ElementRef, HostListener, Optional } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';

@Directive({
  selector: 'input[appDateMask]',
  standalone: true,
})
export class DateMaskDirective {
  // Inject the element reference and optionally the MatDatepickerInput
  constructor(
    private el: ElementRef,
    @Optional() private datepickerInput: MatDatepickerInput<any>
  ) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Apply your masking logic here
    const maskedValue = this.applyMask(value); 
    this.el.nativeElement.value = maskedValue;

    // Manually notify the MatDatepickerInput of the change
    if (this.datepickerInput) {
      // The _onInput method is private, but calling it is a common workaround.
      // Alternatively, check if a public method like _onValueChange exists or simulate a native 'change' event.
      this.datepickerInput._onInput(maskedValue);
    }
  }

  // Add other HostListeners as needed (e.g., 'blur', 'focus')

  private applyMask(value: string): string {
    // Implement your date masking logic (e.g., DD.MM.YYYY)
    // Example: remove non-numeric characters, add slashes in appropriate places
    let cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 2) {
      cleaned = cleaned.substring(0, 2) + '.' + cleaned.substring(2);
    }
    if (cleaned.length > 5) {
      cleaned = cleaned.substring(0, 5) + '.' + cleaned.substring(5, 9);
    }
    return cleaned;
  }
}