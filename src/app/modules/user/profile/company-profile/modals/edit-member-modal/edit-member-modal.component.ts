import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersModalService} from '../../../../../../services/users-modal.service';
import {ApiService} from '../../../../../../api/Api';
import { ModelsUserRole } from '../../../../../../api/data-contracts';

@Component({
  selector: 'app-edit-member-modal',
  templateUrl: './edit-member-modal.component.html',
  styleUrl: './edit-member-modal.component.scss'
})
export class EditMemberModalComponent implements OnInit{
  onSubmit = new EventEmitter<boolean>();
  memberForm: FormGroup;
  @Input() user: string | null = null;
  @ViewChild('firstInput') firstInput!: ElementRef;

  roles: {name: string, value: ModelsUserRole}[] = [
    {name: 'Администратор', value: ModelsUserRole.AdminRole},
    {name: 'HR', value: ModelsUserRole.HRRole},
    {name: 'Менеджер', value: ModelsUserRole.ManagerRole},
    {name: 'Специалист', value: ModelsUserRole.SpecialistRole},
    // {name: 'Супер администратор', value: ModelsUserRole.UserRoleSuperAdmin},
    // {name: 'Все роли', value: ModelsUserRole.AllRoles},
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private modalService: UsersModalService
  ) {
    this.memberForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      role: [null as ModelsUserRole | null, Validators.required],
      job_title_name: [''],
      text_sign: ['']
    });
  }

  ngOnInit() {
    this.loadUserData();
    setTimeout(() => this.firstInput.nativeElement.focus(), 0);
  }

  private loadUserData(): void {
    if (!this.user) return;
    this.fetchUserData();
  }

  saveProfile(): void {
    if (!this.memberForm.valid) {
    }

    if (!this.user) {
      return;
    }

    this.updateUserData();
  }

  getFormValidationErrors() {
    const errors: any = {};
    Object.keys(this.memberForm.controls).forEach(key => {
      const control = this.memberForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  private fetchUserData(): void {
    this.api.v1UsersDetail(this.user!, { observe: 'response' }).subscribe({
      next: (response) => this.handleUserResponse(response),
      error: (err) => this.handleError('Ошибка в fetchUserData ', err)
    });
  }

  private handleUserResponse(response: any): void {
    const responseBody = 'body' in response ? response.body : response;

    if (responseBody?.data) {
      const userData = {...responseBody.data};
      this.memberForm.patchValue(userData);
      this.memberForm.markAsPristine();
    }
  }

  private updateUserData(): void {
    const formValues = {...this.memberForm.value};
    
    const updateData = {
      email: formValues.email,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      phone_number: formValues.phone_number?.replace(/[^0-9]/g, '') || undefined,
      role: formValues.role as ModelsUserRole,
      job_title_name: formValues.job_title_name || undefined,
      text_sign: formValues.text_sign || undefined
    };

    this.api.v1UsersUpdate(this.user!, updateData).subscribe({
      next: (response: any) => {
        const responseBody = 'body' in response ? response.body : response;
        const updatedUser = (responseBody?.data) ? responseBody.data : {
          id: this.user!,
          ...updateData
        };

        this.onSubmit.emit(updatedUser);
        this.modalService.closeModal();
      },
      error: (err) => this.handleError('Ошибка в updateUserData() ', err)
    });
  }

  private handleSuccessfulUpdate(): void {
    const updatedUser = {
      id: this.user!,
      ...this.memberForm.value
    };


    if (this.memberForm.get('role')?.value) {
      updatedUser.role = this.memberForm.get('role')?.value;
    }

    this.onSubmit.emit(updatedUser);
    this.modalService.closeModal();
  }

  private handleError(message: string, err: any): void {
    console.error(message, err);
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
