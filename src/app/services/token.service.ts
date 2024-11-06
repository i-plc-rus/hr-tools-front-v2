import { Injectable } from '@angular/core';
import {CookieService} from './cookie.service';
import {Router} from '@angular/router';
import {SpaceapimodelsSpaceUser} from '../api/data-contracts';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token = '';
  

  constructor(private cookieService: CookieService, private router: Router) {
    this.updateToken();
  }

  updateToken(token?: string) {
    if (token) {
      this.cookieService.setCookie({name: 'hr-platform', value: token});
    }
    this.token = this.cookieService.getCookie('hr-platform');
  }

  logout() {
    this.token = '';
    this.cookieService.deleteCookie('hr-platform');
    this.clearUserData();
    this.router.navigate(['/login']);
  }

  setUserData(data: SpaceapimodelsSpaceUser) {
    localStorage.setItem('spaceId', data.space_id || '');
    localStorage.setItem('userId', data.id || '');
    localStorage.setItem('isAdmin', data.is_admin ? 'true' : 'false');
  }

  clearUserData() {
    localStorage.removeItem('spaceId');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  }

  // todo надо реализовать менеджмент рефреш токена, да и вообще механизм обновления JWT токена, тк бэк сам это не делает
}
