import { Component } from '@angular/core';
import {MobileMenuService} from '../../services/mobile-menu.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  constructor(private menuService: MobileMenuService) { }

  openMobileMenu() {
    this.menuService.open();
  }
}
