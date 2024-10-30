import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';
import {MatIcon} from '@angular/material/icon';
import {TextInputComponent} from '../../../../components/text-input/text-input.component';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-org-approval',
  standalone: true,
  imports: [
    MatIcon,
    TextInputComponent,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './org-approval.component.html',
  styleUrl: './org-approval.component.scss'
})
export class OrgApprovalComponent {
  form: FormGroup;

  constructor(
    private orgService: OrganizationService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      full_name: new FormControl(this.orgService.organizationData.full_name || '', Validators.required),
      organization_name: new FormControl(this.orgService.organizationData.organization_name || '', Validators.required),
      inn: new FormControl(this.orgService.organizationData.inn || '', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      kpp: new FormControl(this.orgService.organizationData.kpp || '', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      ogrn: new FormControl(this.orgService.organizationData.ogrn || '', [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(15),
      ]),
      organization_address: new FormControl('', Validators.required),
      director_name: new FormControl(this.orgService.organizationData.director_name || '', Validators.required),
    });
  }

  toOrgRegistration() {
    this.orgService.updateOrganizationData(this.form.getRawValue());
    this.router.navigate(['/auth', 'org-registration'], {
      queryParams: {
        orgData: JSON.stringify({...this.orgService.organizationData, ...this.form.getRawValue()})
      }
    });
  }
}
