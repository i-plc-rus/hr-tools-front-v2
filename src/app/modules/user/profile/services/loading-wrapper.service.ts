import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingWrapperService {
  private isLoading = signal(false);

  setLoading(state: boolean): void {
    if (this.isLoading() !== state) {
      this.isLoading.set(state);
    }
  }

  getLoading(): boolean {
    return this.isLoading();
  }
}
