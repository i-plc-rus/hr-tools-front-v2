import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UsersModalService} from '../../../../services/users-modal.service';
import {SpaceUser as User} from '../../../../models/SpaceUser';
import {ApiService} from '../../../../api/Api';

@Component({
  selector: 'app-delete-add-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrl: './delete-user-modal.component.scss'
})
export class DeleteUserModalComponent {
  @Input() user?: User;
  @Output() onSubmit = new EventEmitter<boolean>();
  isLoading = false;

  constructor(
    private modalService: UsersModalService,
    private api: ApiService,
  ) { }

  deleteUser() {
    if (this.user?.id) {
      this.isLoading = true;
      this.api.v1UsersDelete(this.user.id, {}).subscribe({
        next: () => {
          this.onSubmit.emit(true);
          this.isLoading = false;
          this.modalService.closeModal();
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        }
      });
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
