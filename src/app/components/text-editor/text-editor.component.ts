import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import {QuillEditorComponent, QuillModules} from 'ngx-quill'
import Quill from 'quill';

@Component({
  selector: 'app-text-editor',
  standalone: true,
  imports: [
    QuillEditorComponent,
    MatIcon,
    FormsModule,
  ],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditorComponent),
      multi: true,
    }
  ]
})
export class TextEditorComponent implements ControlValueAccessor, OnInit {
  @Input() value: string = '';
  @Input() height: string = '160px';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() actionBtnDisabled: boolean = false;
  @Output() onActionBtnClick = new EventEmitter();
  modules: QuillModules = {}

  onChanged(_: any) { }
  onTouched(_: any) { }

  ngOnInit() {
    //убираем стандартные иконки
    const icons: any = Quill.import('ui/icons');
    if (icons) {
      icons.header = undefined;
      icons.bold = undefined;
      icons.italic = undefined;
    }
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  changeEditorValue(event: any) {
    this.onChanged(event.html);
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  actionBtnClicked() {
    this.onActionBtnClick.emit();
  }
}
