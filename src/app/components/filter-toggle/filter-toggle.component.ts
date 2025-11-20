import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-filter-toggle',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './filter-toggle.component.html',
  styleUrl: './filter-toggle.component.scss'
})
export class FilterToggleComponent {
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onToggle(): void {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
