import {Component, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersModalService} from '../../../../../../services/users-modal.service';
import {SnackBarService} from '../../../../../../services/snackbar.service';

@Component({
  selector: 'app-license-extension-modal',
  templateUrl: './license-extension-modal.component.html',
  styleUrl: './license-extension-modal.component.scss'
})
export class LicenseExtensionModalComponent {
  onSubmit = new EventEmitter<any>();
  isLoading = false;

  extensionForm = new FormGroup({
    company: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required])
  });

  constructor(private modalService: UsersModalService, private snackBarService: SnackBarService) {
  }
  submit() {
    if (!this.extensionForm.valid) return;

    this.isLoading = true;
    const formData = {
      company: this.extensionForm.controls.company.value,
      comment: this.extensionForm.controls.comment.value
    };


    this.onSubmit.emit(formData);
    this.snackBarService.snackBarMessageSuccess('Заявка успешно отправлена!')
    this.modalService.closeModal();
    this.isLoading = false;
  }

  cancel() {
    this.onSubmit.emit(undefined);
    this.modalService.closeModal();
    this.extensionForm.reset();
  }

}
