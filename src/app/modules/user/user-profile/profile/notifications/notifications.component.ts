import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableModule
} from '@angular/material/table';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    MatCard,
    MatRadioGroup,
    MatRadioButton,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatCheckbox,
    MatTableModule
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  displayedColumns: string[] = ['event', 'system', 'email', 'telegram'];

  notifications = [
    { event: 'Когда экспорт аналитики готов', system: true, email: true, telegram: false },
    { event: 'Когда получен отклик на вакансию', system: false, email: true, telegram: false },
    { event: 'Когда заказчик комментирует кандидата на вакансии, в команде которой вы состоите', system: true, email: true, telegram: false },
    { event: 'Когда экспорт кандидатов в Excel готов', system: true, email: false, telegram: false },
    { event: 'Когда пришло сообщение через Avito', system: false, email: true, telegram: false },
    { event: 'Когда кандидат на потребности переведен на финальный этап', system: false, email: true, telegram: false }
  ];
}
