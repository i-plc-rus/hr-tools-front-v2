import {inject} from '@angular/core';
import {ApiService} from '../api/Api';
import {map, tap} from 'rxjs';
import {UserService} from '../services/user.service';
import {SpaceapimodelsSpaceUser} from '../api/data-contracts';

export const roleGuard = (accessRolesList: any []) => {
  const api = inject(ApiService);
  const userService = inject(UserService);
  console.log('ROLE GUARD');
  return api
    .v1AuthMeList()
    .pipe(
      tap((r: any) => {
      console.log('TAP ROLE GUARD', r)
      userService.setUserData(r.body.data as SpaceapimodelsSpaceUser);
      // todo Бэк не возвращает роли))) надо будет дописать
    }),
      map(r => !!r)
    );
}
