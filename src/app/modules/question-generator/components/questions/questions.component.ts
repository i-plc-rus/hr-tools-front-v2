import { Component } from '@angular/core';
import { CallHrModalService } from '../../../../services/call-hr-modal.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  constructor(private modalService: CallHrModalService) {}

  openCallHrModal() {
    this.modalService.openCallHrModal();
  }
}
