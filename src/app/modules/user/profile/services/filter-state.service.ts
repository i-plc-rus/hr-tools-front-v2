import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterStateService {
  private isFilterOpened = signal(false);

  setFilterOpened(state: boolean): void {
    this.isFilterOpened.set(state);
  }

  getFilterOpened(): boolean {
    return this.isFilterOpened();
  }

  getFilterOpenedSignal() {
    return this.isFilterOpened;
  }
}

