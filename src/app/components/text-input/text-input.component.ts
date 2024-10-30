import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {NgxMaskDirective} from 'ngx-mask';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgxMaskDirective
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    }
  ]
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() value: string = '';
  @Input() type: string = 'text';
  @Input() class: string = '';
  @Input() mask?: string;
  @Input() prefix?: string;
  @Input() label?: string;
  @Input() disabled?: boolean;
  @Input() clear?: boolean;
  @Input() showError?: boolean;
  // Отключить смену цвета бордеров и лейбла
  @Input() skipEffects?: boolean;

  onChanged(_: any) {}
  onTouched(_: any) {}

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  changeInputValue(event: any) {
    this.onChanged(event.target.value);
  }
}
