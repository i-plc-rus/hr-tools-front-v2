import {Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import {ModelsUserRole, SpaceapimodelsSpaceUser} from '../api/data-contracts';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  private userSignal = signal<SpaceapimodelsSpaceUser | null>(null);

  logout() {
    this.tokenService.clearToken();
    this.clearUserData();
    this.router.navigate(['/login']);
  }

  setUserData(data: SpaceapimodelsSpaceUser) {
    this.userSignal.set(data);
    localStorage.setItem('spaceId', data.space_id || '');
    localStorage.setItem('userId', data.id || '');
    // localStorage.setItem('isAdmin', data.is_admin ? 'true' : 'false');
  }

  hasRole(role: ModelsUserRole): boolean {
    const currentUser = this.userSignal();
    return currentUser?.role === role;
  }

  clearUserData() {
    localStorage.removeItem('spaceId');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
  }
}
