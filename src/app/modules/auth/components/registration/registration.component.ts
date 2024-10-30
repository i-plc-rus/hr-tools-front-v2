import {Component} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TextInputComponent} from '../../../../components/text-input/text-input.component';
import {Router} from '@angular/router';
import {emailExist} from '../../../../validators/email-exist';
import {ApiService} from '../../../../api/Api';
import debounce from 'lodash.debounce';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    ReactiveFormsModule,
    TextInputComponent
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  form: FormGroup;

  constructor(
    private router: Router,
    private api: ApiService,
  ) {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [emailExist(this.api)],
        updateOn: 'change'
      }),
    })
  }

  toOrgRegistration() {
    this.router.navigate(['/auth', 'org-search'], {
      queryParams: {
        orgData: JSON.stringify({
          admin_data: {
            email: this.form.get('email')!.value,
          }
        })
      }
    });
  }

  debouncedValidatorFn = debounce(emailExist, 2000)
}
