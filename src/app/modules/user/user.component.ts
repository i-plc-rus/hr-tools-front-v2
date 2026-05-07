import { Component } from '@angular/core';
import {MobileMenuService} from '../../services/mobile-menu.service';
import {UserService} from '../../services/user.service';
import { ModelsUserRole } from '../../api/data-contracts';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(
    private menuService: MobileMenuService,
    public userService: UserService
  ) { }

  public readonly Roles = ModelsUserRole;

  openMobileMenu() {
    this.menuService.open();
  }

  logout() {
    this.userService.logout();
  }
}
