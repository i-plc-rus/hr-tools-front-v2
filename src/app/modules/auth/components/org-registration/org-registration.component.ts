import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrganizationService} from '../../services/organization.service';
import {Router} from '@angular/router';
import {TextInputComponent} from '../../../../components/text-input/text-input.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-org-registration',
  templateUrl: './org-registration.component.html',
  styleUrl: './org-registration.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextInputComponent,
    MatIcon,
    MatButton
  ]
})
export class OrgRegistrationComponent {
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
      //@ts-ignore - todo какого то лешего у бэков в модельке этого поля нет а на макете есть))
      organization_address: new FormControl(this.orgService.organizationData.organization_address || '', Validators.required),
      director_name: new FormControl(this.orgService.organizationData.director_name || '', Validators.required),
    });
    this.form.disable();
  }

  toOrgRegistration() {
    this.router.navigate(['/auth', 'admin-registration'], {
      queryParams: {
        orgData: JSON.stringify(this.orgService.organizationData)
      }
    });
  }
}
