import { Injectable } from '@angular/core';
import {CookieService} from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token = '';

  constructor(private cookieService: CookieService) {
    this.updateToken();
  }

  updateToken(token?: string) {
    if (token) {
      this.cookieService.setCookie({name: 'hr-platform', value: token});
    }
    this.token = this.cookieService.getCookie('hr-platform');
  }

  // todo надо реализовать менеджмент рефреш токена, да и вообще механизм обновления JWT токена, тк бэк сам это не делает
}
