import {Component, EventEmitter, Input} from '@angular/core';
import {SpaceUser as User} from '../../../../../../models/SpaceUser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {matchValidator} from '../../../../../../validators/match';
import {UsersModalService} from '../../../../../../services/users-modal.service';
import {ApiService} from '../../../../../../api/Api';
import {SnackBarService} from '../../../../../../services/snackbar.service';
import {
  SpaceapimodelsCreateUser,
  SpaceapimodelsSpaceUser,
  SpaceapimodelsUpdateUser,
  ModelsUserRole
} from '../../../../../../api/data-contracts';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrl: './add-member-modal.component.scss'
})
export class AddMemberModalComponent {
  @Input() user?: User;
  onSubmit = new EventEmitter<SpaceapimodelsSpaceUser>();

  roles: {name: string, value: ModelsUserRole}[] = [
    {name: 'Администратор', value: ModelsUserRole.AdminRole},
    {name: 'HR', value: ModelsUserRole.HRRole},
    {name: 'Менеджер', value: ModelsUserRole.ManagerRole},
    {name: 'Специалист', value: ModelsUserRole.SpecialistRole},
    {name: 'Супер администратор', value: ModelsUserRole.UserRoleSuperAdmin},
    {name: 'Все роли', value: ModelsUserRole.AllRoles},
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
    role: new FormControl<ModelsUserRole | null>(null, [Validators.required]),
  });
  spaceId: string;
  constructor(
    private modalService: UsersModalService,
    private api: ApiService,
    private snackBar: SnackBarService,
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
      role: this.userForm.controls.role.value || undefined
    };

    if (!this.spaceId) {
      this.snackBar.snackBarMessageError('Отсутствует ID пространства');
      this.isLoading = false;
      return;
    }

    this.api.v1UsersCreate(newUser).subscribe({
      next: (res:any) => {
        const mockCreatedUser: SpaceapimodelsSpaceUser = {
          id: res.body.data,
          email: this.userForm.controls.email.value || '',
          first_name: this.userForm.controls.first_name.value || '',
          last_name: this.userForm.controls.last_name.value || '',
          phone_number: this.userForm.controls.phone_number.value?.replace(/[^0-9]/g, '') || '',
          role: this.userForm.controls.role.value || undefined
        };
        this.onSubmit.emit(mockCreatedUser);
        this.snackBar.snackBarMessageSuccess('Участник успешно создан');
        this.modalService.closeModal();
        this.isLoading = false;
      },
      error: (error) => {
        let errorMessage = 'Ошибка при создании пользователя';

        try {
          const errorObj = JSON.parse(error.message);
          errorMessage = errorObj.error?.message || errorObj.message || errorMessage;
        } catch (e) {
          if (error.message) errorMessage = error.message;
        }

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
      next: (res:any) => {
        const updatedUserData = res.body?.data;
        if (updatedUserData) {
          this.onSubmit.emit(updatedUserData);
        }
        this.snackBar.snackBarMessageSuccess('Пользователь успешно обновлен');
        this.modalService.closeModal();
        this.isLoading = false;
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
