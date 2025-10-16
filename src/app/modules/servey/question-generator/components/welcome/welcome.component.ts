import { Component, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {
  @Input() childInputId: string | null = null;
  isPermissionChecked: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log('Child Component received ID:', this.childInputId);
  }

  checkPermission(change: MatCheckboxChange) {
    this.isPermissionChecked = change.checked;
  }
}
