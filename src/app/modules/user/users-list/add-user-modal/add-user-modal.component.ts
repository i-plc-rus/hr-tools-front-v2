import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersModalService} from '../../../../services/users-modal.service';
import {ModelsUserRole} from '../../../../api/data-contracts';
import {User} from '../../../../models/User';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.scss',
})
export class AddUserModalComponent implements OnInit {
  @Input() user?: User;
  @Output() onSubmit = new EventEmitter<boolean>();

  roles: {name: string, value: ModelsUserRole}[] = [
    {name: 'Супер администратор', value: ModelsUserRole.UserRoleSuperAdmin},
    {name: 'Администратор', value: ModelsUserRole.UserRoleSuperAdmin},
    {name: 'Менеджер', value: ModelsUserRole.UserRoleSuperAdmin},
    {name: 'Пользователь', value: ModelsUserRole.UserRoleSuperAdmin},
  ];
  isEdit = false;
  isLoading = false;

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirm_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required]),
    role: new FormControl<ModelsUserRole | null>(null, [Validators.required]),
  });
  constructor(private modalService: UsersModalService) {
  }

  ngOnInit(): void {
    if (this.user) {
      this.isEdit = true;
      this.userForm.patchValue(this.user);
      if (this.user.password)
        this.userForm.get('confirm_password')?.setValue(this.user.password);
    }
  }

  isPasswordMatch() {
    return this.userForm.get('password')?.value === this.userForm.get('confirm_password')?.value;
  }

  submit() {
    this.isEdit ?
      this.editUser()
      :
      this.createUser();
  }

  createUser() {
    if (!this.userForm.valid || !this.isPasswordMatch()) return;

    this.isLoading = true;
    const newUser = new User({
      email: this.userForm.controls.email.value || undefined,
      password: this.userForm.controls.password.value || undefined,
      first_name: this.userForm.controls.first_name.value || undefined,
      last_name: this.userForm.controls.last_name.value || undefined,
      phone_number: this.userForm.controls.phone_number.value || undefined,
      role: this.userForm.controls.role.value || undefined
    });

    // this.apiService.addUser(newUser).subscribe(() => {
    console.log(newUser);
    this.onSubmit.emit(true);
    this.isLoading = false;
    this.modalService.closeModal();
    // });
  }

  editUser() {
    if (!this.userForm.valid || !this.isPasswordMatch() || !this.user) return;

    this.isLoading = true;
    const updatedUser = new User({
      email: this.userForm.controls.email.value || undefined,
      password: this.userForm.controls.password.value || undefined,
      first_name: this.userForm.controls.first_name.value || undefined,
      last_name: this.userForm.controls.last_name.value || undefined,
      phone_number: this.userForm.controls.phone_number.value || undefined,
      role: this.userForm.controls.role.value || undefined
    });

    // this.apiService.updateUser(this.user.id, updatedUser).subscribe(() => {
    console.log(this.user.id, updatedUser);
    this.onSubmit.emit(true);
    this.isLoading = false;
    this.modalService.closeModal();
    // });
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
