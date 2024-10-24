import {Component, DestroyRef, inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ApiService} from '../../../api/Api';
import {ScreenWidthService} from '../../../services/screen-width.service';

@Component({
  selector: 'app-org-registration',
  templateUrl: './org-registration.component.html',
  styleUrl: './org-registration.component.scss'
})
export class OrgRegistrationComponent {
  idInput = new FormControl('', [Validators.required]);
  destroyRef = inject(DestroyRef);
  orgs: any;

  constructor(
    private apiService: ApiService,
    public screen: ScreenWidthService
  ) {
  }

  searchOrganization() {
    this.orgs = [
      {fullName: 'ИП Константинопольский Алексей Анатольевич', INN: '123009475800', OGRN: '253427867543908'},
      {fullName: 'ООО Моя Оборона', INN: '123002323420', OGRN: '99999867543908'},
      {fullName: 'ЗАО Шапито', INN: '123009479232', OGRN: '09427888883908'},
      {fullName: 'ИП Константинопольский Алексей Анатольевич', INN: '123009475800', OGRN: '253427867543908'},
      {fullName: 'ИП Константинопольский Алексей Анатольевич', INN: '123009475800', OGRN: '253427867543908'},
      {fullName: 'ИП Константинопольский Алексей Анатольевич', INN: '123009475800', OGRN: '253427867543908'},
    ]
    // this.apiService.v1OrganizationsSuggestList({
    //   query: this.idInput.value || ''
    // })
    //   .pipe(takeUntilDestroyed(this.destroyRef))
    //   .subscribe(r => {
    //     console.log('r', r);
    //   })
  }

  chooseOrganization(org: any) {
    this.orgs = null;
    this.idInput.reset();
    console.log(`Выбрана организация ${org.fullName}`);
  }
}
