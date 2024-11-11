import {Component, Input} from '@angular/core';
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

  constructor() {
  }

}
