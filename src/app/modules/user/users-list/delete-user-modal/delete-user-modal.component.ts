import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UsersModalService} from '../../../../services/users-modal.service';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-delete-add-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrl: './delete-user-modal.component.scss'
})
export class DeleteUserModalComponent {
  @Input() user?: User;
  @Output() onSubmit = new EventEmitter<boolean>();
  isLoading = false;

  constructor(private modalService: UsersModalService) { }

  deleteUser() {
    if (this.user?.id) {
      this.isLoading = true;
      // this.apiService.deleteUser(this.user.id).subscribe(() => {
      this.onSubmit.emit(true);
      this.isLoading = false;
      this.modalService.closeModal();
      // });
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
