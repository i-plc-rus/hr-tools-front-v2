import {Component, Input} from '@angular/core';
import {StatusTag} from '../../models/StatusTag';

@Component({
  selector: 'app-status-tag',
  standalone: true,
  imports: [],
  templateUrl: './status-tag.component.html',
  styleUrl: './status-tag.component.scss'
})
export class StatusTagComponent {
  @Input() status: StatusTag = 'success';

  constructor() {
  }

}
