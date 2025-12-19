import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersModalService} from '../../../../services/users-modal.service';
import {SpaceapimodelsCreateUser, SpaceapimodelsUpdateUser} from '../../../../api/data-contracts';
import {SpaceUser as User} from '../../../../models/SpaceUser';
import {ApiService} from '../../../../api/Api';
import {matchValidator} from '../../../../validators/match';
import {SnackBarService} from '../../../../services/snackbar.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss',
})
export class AddUserModalComponent implements OnInit {
  @Input() user?: User;
  onSubmit = new EventEmitter<boolean>();

  roles: {name: string, value: boolean}[] = [
    {name: 'Администратор', value: true},
    {name: 'Пользователь', value: false},
  ];
  isEdit = false;
  isLoading = false;

  userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), matchValidator('confirm_password', true)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(8), matchValidator('password')]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    is_admin: new FormControl<boolean>(false, [Validators.required]),
  });
  spaceId: string;
  constructor(
    private modalService: UsersModalService,
    private api: ApiService,
    private snackBar: SnackBarService
  ) {

    this.spaceId = localStorage.getItem('spaceId') || '';
  }

  ngOnInit(): void {
    if (this.user) {
      this.isEdit = true;
      this.userForm.patchValue(this.user);
      if (this.user.password)
        this.userForm.get('confirm_password')?.setValue(this.user.password);
      else {
        this.userForm.get('password')?.setValue('')
        this.userForm.get('password')?.removeValidators([Validators.required]);
        this.userForm.get('confirm_password')?.removeValidators([Validators.required]);
      }
    }
  }

  submit() {
    if (this.isEdit)
      this.editUser()
    else
      this.createUser();
  }

  createUser() {
    if (!this.userForm.valid) return;

    this.isLoading = true;
    const newUser: SpaceapimodelsCreateUser = {
      email: this.userForm.controls.email.value || undefined,
      password: this.userForm.controls.password.value || undefined,
      first_name: this.userForm.controls.first_name.value || undefined,
      last_name: this.userForm.controls.last_name.value || undefined,
      phone_number: this.userForm.controls.phone_number.value?.replace(/[^0-9]/g, '') || undefined,
      space_id: this.spaceId,
    };

    this.api.v1UsersCreate(newUser).subscribe({
      next: () => {
        this.onSubmit.emit(true);
        this.isLoading = false;
        this.snackBar.snackBarMessageSuccess('Пользователь успешно создан');
        this.modalService.closeModal();
      },
      error: (error) => {
        const errorMessage: string = JSON.parse(error.message).error.message;
        console.log(errorMessage);
        this.snackBar.snackBarMessageError(errorMessage);
        this.isLoading = false;
      }
    });
  }

  editUser() {
    if (!this.userForm.valid || !this.user || !this.user.id) return;

    this.isLoading = true;
    const updatedUser: SpaceapimodelsUpdateUser = {
      email: this.userForm.controls.email.value || undefined,
      password: this.userForm.controls.password.value || undefined,
      first_name: this.userForm.controls.first_name.value || undefined,
      last_name: this.userForm.controls.last_name.value || undefined,
      phone_number: this.userForm.controls.phone_number.value?.replace(/[^0-9]/g, '') || undefined,
    };

    this.api.v1UsersUpdate(this.user.id, updatedUser).subscribe({
      next: () => {
        this.onSubmit.emit(true);
        this.isLoading = false;
        this.snackBar.snackBarMessageSuccess('Пользователь успешно обновлен');
        this.modalService.closeModal();
      },
      error: (error) => {
        const errorMessage: string = JSON.parse(error.message).error.message;
        console.log(errorMessage);
        this.snackBar.snackBarMessageError(errorMessage);
        this.isLoading = false;
      }
    });
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
