import {Injectable} from '@angular/core';
import {CookieService} from './cookie.service';
import {ApiService} from '../api/Api';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token = '';
  refreshToken = '';
  isRefreshing = false;

  constructor(
    private cookieService: CookieService,
    private api: ApiService
  ) {
    this.updateToken();
  }

  updateToken(token?: string, refreshToken?: string) {
    if (token) {
      this.cookieService.setCookie({name: 'hr-platform', value: token});
    }
    if (refreshToken) {
      localStorage.setItem('hr-platform-refresh', refreshToken);
    }
    this.token = this.cookieService.getCookie('hr-platform');
    this.refreshToken = localStorage.getItem('hr-platform-refresh') || '';
  }

  refresh() {
    if (!this.refreshToken) {
      this.refreshToken = localStorage.getItem('hr-platform-refresh') || '';
    }
    return this.api.v1AuthRefreshTokenCreate({refresh_token: this.refreshToken}, {observe: 'response'})
  }

  clearToken() {
    this.token = '';
    this.refreshToken = '';
    this.cookieService.deleteCookie('hr-platform');
    localStorage.removeItem('hr-platform-refresh');
  }
}
