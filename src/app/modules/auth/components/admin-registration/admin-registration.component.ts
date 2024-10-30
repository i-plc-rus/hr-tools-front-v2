import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TextInputComponent} from "../../../../components/text-input/text-input.component";
import {OrganizationService} from '../../services/organization.service';
import {Router} from '@angular/router';
import {ApiService} from '../../../../api/Api';
import {matchValidator} from '../../../../validators/match';
import {map} from 'rxjs';

@Component({
  selector: 'app-admin-registration',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    TextInputComponent
  ],
  templateUrl: './admin-registration.component.html',
  styleUrl: './admin-registration.component.scss'
})
export class AdminRegistrationComponent {
  form: FormGroup;
  isLoading: boolean = false;

  constructor(
    private orgService: OrganizationService,
    private router: Router,
    private api: ApiService
  ) {
    this.form = new FormGroup({
      email: new FormControl(this.orgService.organizationData.admin_data?.email || '', Validators.required),
      first_name: new FormControl(this.orgService.organizationData.admin_data?.first_name || '', Validators.required),
      is_admin: new FormControl(true),
      last_name: new FormControl(this.orgService.organizationData.admin_data?.last_name || '', Validators.required),
      password: new FormControl(this.orgService.organizationData.admin_data?.password || '',
        [
          Validators.required,
          Validators.minLength(6),
          matchValidator('password_confirm', true)
        ]
      ),
      password_confirm: new FormControl('', [
          Validators.required,
          matchValidator('password')
        ]
      ),
      phone_number: new FormControl(this.orgService.organizationData.admin_data?.phone_number || '', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.form.get('email')?.disable();
  }

  createOrgData() {
    this.isLoading = true;
    const {password_confirm, ...formValue} = this.form.getRawValue();
    formValue['phone_number'] = formValue['phone_number'].replace(/[^0-9+]/g, '');

    this.orgService.updateOrganizationData({
      admin_data: formValue
    });

    this.api.v1OrganizationsCreate(this.orgService.organizationData)
      .subscribe(
        {
          next: () => {
            this.isLoading = false;
            this.router.navigate(['/auth', 'login']);
          },
          error: () => this.isLoading = false
        }
      )
  }
}
