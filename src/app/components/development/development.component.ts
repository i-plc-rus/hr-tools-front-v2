import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-development',
  standalone: true,
  imports: [],
  templateUrl: './development.component.html',
  styleUrl: './development.component.scss'
})
export class DevelopmentComponent {

  constructor(private router: Router, private location: Location) {
  }

  goBack() {
    this.location.back();
  }
}
