import { Component, EventEmitter } from '@angular/core';
import { CallHrModalService } from '../../../../../services/call-hr-modal.service';

@Component({
  selector: 'app-call-hr-modal',
  templateUrl: './call-hr-modal.component.html',
  styleUrl: './call-hr-modal.component.scss'
})
export class CallHrModalComponent {
  onSubmit = new EventEmitter<boolean>();

  constructor(private modalService: CallHrModalService) { }

  closeModal() {
    this.modalService.closeModal();
  }

  submit() {
    this.modalService.closeModal();
    this.modalService.openSuccessModal();
  }
}
