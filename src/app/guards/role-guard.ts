import {inject} from '@angular/core';
import {ApiService} from '../api/Api';
import {map, tap} from 'rxjs';

export const roleGuard = (accessRolesList: any []) => {
  const api = inject(ApiService);
  console.log('ROLE GUARD');
  return api
    .v1AuthMeList()
    .pipe(tap(r => {
        console.log('TAP ROLE GUARD', r)
      // todo Бэк не возвращает роли))) надо будет дописать
      }),
      map(r => !!r)
    );
}
