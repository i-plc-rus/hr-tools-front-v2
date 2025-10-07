import { Component, EventEmitter } from '@angular/core';
import { CallHrModalService } from '../../../../../../services/call-hr-modal.service';

@Component({
  selector: 'app-success-send-modal',
  templateUrl: './success-send-modal.component.html',
  styleUrl: './success-send-modal.component.scss',
})
export class SuccessSendModalComponent {
  onSubmit = new EventEmitter<boolean>();
  
  constructor(private modalService: CallHrModalService) {}

  closeModal() {
    this.modalService.closeModal();
  }
}
