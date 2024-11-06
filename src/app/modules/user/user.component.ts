import { Component } from '@angular/core';
import {MobileMenuService} from '../../services/mobile-menu.service';
import {TokenService} from '../../services/token.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(
    private menuService: MobileMenuService,
    private tokenService: TokenService
  ) { }

  openMobileMenu() {
    this.menuService.open();
  }

  logout() {
    this.tokenService.logout();
  }
}
