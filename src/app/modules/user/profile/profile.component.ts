import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }
}
