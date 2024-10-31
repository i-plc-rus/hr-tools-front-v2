import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification-bubble',
  standalone: true,
  imports: [],
  templateUrl: './notification-bubble.component.html',
  styleUrl: './notification-bubble.component.scss'
})
export class NotificationBubbleComponent {
  @Input() value: number = 0;

  constructor() {
  }

}
