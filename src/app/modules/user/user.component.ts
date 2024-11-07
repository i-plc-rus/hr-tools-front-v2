import { Component } from '@angular/core';
import {MobileMenuService} from '../../services/mobile-menu.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(
    private menuService: MobileMenuService,
    private userService: UserService
  ) { }

  openMobileMenu() {
    this.menuService.open();
  }

  logout() {
    this.userService.logout();
  }
}
