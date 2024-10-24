import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.scss'
})
export class TextInputComponent {
  @Input() class: string = '';
  @Input() label?: string;
  @Input() disabled?: boolean;
  @Input() clear?: boolean;
  @Input() formControl?: FormControl;
  // Отключить смену цвета бордеров и лейбла
  @Input() skipEffects?: boolean;
  @Input() change: (e: Event) => void = () => {};
}
