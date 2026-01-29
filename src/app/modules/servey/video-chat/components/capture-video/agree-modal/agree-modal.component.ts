import { Component, EventEmitter } from '@angular/core';
import { SecureModalService } from '../../../../../../services/secure-modal.service';

@Component({
  selector: 'app-agree-modal',
  templateUrl: './agree-modal.component.html',
  styleUrl: './agree-modal.component.scss',
})
export class AgreeModalComponent {
  onSubmit = new EventEmitter<boolean>();

  constructor(private modalService: SecureModalService) {}

  submit() {
    this.onSubmit.emit(true);
    this.modalService.closeModal();
  }
}
