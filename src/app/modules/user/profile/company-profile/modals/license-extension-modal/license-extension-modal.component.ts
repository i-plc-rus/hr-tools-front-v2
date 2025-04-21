import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersModalService} from '../../../../../../services/users-modal.service';
import {SnackBarService} from '../../../../../../services/snackbar.service';
import {catchError, finalize, of} from 'rxjs';
import {SpaceapimodelsSalesRequest} from '../../../../../../api/data-contracts';
import {ApiService} from '../../../../../../api/Api';

@Component({
  selector: 'app-license-extension-modal',
  templateUrl: './license-extension-modal.component.html',
  styleUrl: './license-extension-modal.component.scss'
})
export class LicenseExtensionModalComponent implements OnInit{
  onSubmit = new EventEmitter<any>();
  isLoading = false;

  extensionForm = new FormGroup({
    company: new FormControl({value: '', disabled: true}),
    comment: new FormControl('', [Validators.required])
  });

  constructor(
    private modalService: UsersModalService,
    private snackBarService: SnackBarService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadCompanyData();
  }

  private loadCompanyData(): void {
    this.apiService.v1SpaceProfileList({observe: 'response'}).subscribe({
      next: (response) => {
        if (response && response.body && response.body.data) {
          const companyName = response.body.data.organization_name || '';
          this.extensionForm.patchValue({
            company: companyName
          });
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  submit() {
    if (!this.extensionForm.valid) return;

    this.isLoading = true;

    const formData = {
      company: this.extensionForm.controls.company.value,
      comment: this.extensionForm.controls.comment.value
    };

    const requestBody: SpaceapimodelsSalesRequest = {
      text: formData.comment || ''
    };

    this.apiService.v1SpaceProfileSendLicenseRequestUpdate(requestBody)
      .pipe(
        catchError(error => {
            this.snackBarService.snackBarMessageError(JSON.parse(error.message).error.message);
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(response => {
        if (response && response.status === 'success') {
          this.snackBarService.snackBarMessageSuccess('Заявка успешно отправлена!');
          this.onSubmit.emit(formData);
          this.modalService.closeModal();
          this.extensionForm.reset();
        }
      });
  }

  cancel() {
    this.onSubmit.emit(undefined);
    this.modalService.closeModal();
    this.extensionForm.reset();
  }
}
