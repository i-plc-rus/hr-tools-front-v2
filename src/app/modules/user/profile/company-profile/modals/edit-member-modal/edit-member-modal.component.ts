import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersModalService} from '../../../../../../services/users-modal.service';
import {ApiService} from '../../../../../../api/Api';

@Component({
  selector: 'app-edit-member-modal',
  templateUrl: './edit-member-modal.component.html',
  styleUrl: './edit-member-modal.component.scss'
})
export class EditMemberModalComponent implements OnInit{
  onSubmit = new EventEmitter<boolean>();
  memberForm: FormGroup;
  @Input() user: string | null = null; //id
  @ViewChild('firstInput') firstInput!: ElementRef;


  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private modalService: UsersModalService
  ) {
    this.memberForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      role: ['', Validators.required],
      job_title_id: [''],
      text_sign: ['']
    });
  }

  ngOnInit() {
    this.loadUserData();
    setTimeout(() => this.firstInput.nativeElement.focus(), 0); //ставлю фокус на первый инпут
  }

  private loadUserData(): void {
    if (!this.user) return;
    this.fetchUserData();
  }

  saveProfile(): void {
    if (!this.memberForm.valid || !this.user) return;
    this.updateUserData();
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
      this.memberForm.patchValue(responseBody.data);
    }

  }

  private updateUserData(): void {
    this.api.v1UsersUpdate(this.user!, this.memberForm.value).subscribe({
      next: () => this.handleSuccessfulUpdate(),
      error: (err) => this.handleError('Ошибка в  updateUserData() ', err)
    });
  }

  private handleSuccessfulUpdate(): void {
    const updatedUser = {
      id: this.user!,
      ...this.memberForm.value
    };

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
