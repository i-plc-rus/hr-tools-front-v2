import {Component, DestroyRef, inject} from '@angular/core';
import {DropdownDirective} from "../../../../directives/dropdown.directive";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {TextInputComponent} from "../../../../components/text-input/text-input.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiService} from '../../../../api/Api';
import {ScreenWidthService} from '../../../../services/screen-width.service';
import {OrganizationService} from '../../services/organization.service';
import {Router, RouterLink} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-org-search',
  standalone: true,
  imports: [
    DropdownDirective,
    MatButton,
    MatIcon,
    TextInputComponent,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './org-search.component.html',
  styleUrl: './org-search.component.scss'
})
export class OrgSearchComponent {
  form: FormGroup;
  destroyRef = inject(DestroyRef);
  orgs: any;

  constructor(
    private apiService: ApiService,
    public screen: ScreenWidthService,
    private orgService: OrganizationService,
    public router: Router,
  ) {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
    })
  }

  searchOrganization() {
    this.apiService.v1OrganizationsSuggestList({
      query: this.form.get('id')?.value || ''
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        // todo проверить маппинг не удалось, произвольная модель от ДаДаты,
        //  и этот запрос сегодня не работает, выходной видимо
        next: (response: any) => {
          const rawOrgs: any[] = response.body.suggestions;
          if (rawOrgs && rawOrgs.length > 0) {
            this.orgs = rawOrgs.map(org => ({
              full_name: org.data?.name?.full_with_opf,
              organization_name: org.data?.name?.short,
              inn: org.data?.inn,
              kpp: org.data?.kpp,
              ogrn: org.data?.ogrn,
              organization_address: org.data?.address?.unrestricted_value,
              director_name: org.data?.management?.name,
            }));
          } else {
            this.orgs = [];
          }
        },
        error: () => this.orgs = []
      })
  }

  chooseOrganization(org: any) {
    this.orgs = null;
    this.router.navigate(['/auth', 'org-approval'], {
      queryParams: {
        orgData: JSON.stringify({...this.orgService.organizationData, ...org})
      }
    });
  }

  manualRegistration() {
    this.router.navigate(['/auth', 'org-approval'], {
      queryParams: {
        orgData: JSON.stringify(this.orgService.organizationData)
      }
    });
  }
}
