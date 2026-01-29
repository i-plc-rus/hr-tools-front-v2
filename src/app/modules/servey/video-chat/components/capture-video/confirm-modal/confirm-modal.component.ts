import { Component, EventEmitter } from '@angular/core';
import { SecureModalService } from '../../../../../../services/secure-modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  onSubmit = new EventEmitter<boolean>();

  constructor(private modalService: SecureModalService) {}

  stopInterview() {
    this.onSubmit.emit(true);
    this.modalService.closeModal();
  }

  continueInterview() {
    this.modalService.closeModal();
  }
}
