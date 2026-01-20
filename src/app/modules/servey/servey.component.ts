import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-servey',
  templateUrl: './servey.component.html',
  styleUrl: './servey.component.scss',
})
export class ServeyComponent {
  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  // Запрет события копирования
  @HostListener('copy', ['$event'])
  onCopy(event: ClipboardEvent) {
    event.preventDefault();
    return false;
  }

  // Запрет вырезания текста
  @HostListener('cut', ['$event'])
  onCut(event: ClipboardEvent) {
    event.preventDefault();
    return false;
  }
}
