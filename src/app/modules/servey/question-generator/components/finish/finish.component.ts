import { Component, EventEmitter } from '@angular/core';
import { CallHrModalService } from '../../../../../services/call-hr-modal.service';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss',
})
export class FinishComponent {
  onSubmit = new EventEmitter<boolean>();
}
