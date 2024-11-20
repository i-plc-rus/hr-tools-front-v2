import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    MatIcon,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true,
    }
  ]
})
export class SearchInputComponent implements ControlValueAccessor {
  @Input() value: string = '';
  @Input() class: string = '';
  @Input() placeholder: string = '';
  @Input() disabled?: boolean;
  @Output() onSearch = new EventEmitter();

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

  onSearchBtnPress() {
    this.onSearch.emit(this.value);
  }
}
