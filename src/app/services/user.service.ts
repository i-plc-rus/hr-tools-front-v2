import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {SpaceapimodelsSpaceUser} from '../api/data-contracts';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  logout() {
    this.tokenService.clearToken();
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

}
