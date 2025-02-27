import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private _snackBar = inject(MatSnackBar);

  snackBarMessageSuccess(message: string, duration?: number) {
    this._snackBar.open(message, undefined, {
      duration: duration || 2500,
      panelClass: ['snackbar-primary']
    });
  }

  snackBarMessageWarning(message: string, duration?: number) {
    this._snackBar.open(message, undefined, {
      duration: duration || 2500,
      panelClass: ['snackbar-warning']
    });
  }

  snackBarMessageError(message: string, duration?: number) {
    this._snackBar.open(message, undefined, {
      duration: duration || 2500,
      panelClass: ['snackbar-danger']
    });
  }

  snackBarMessageInfo(message: string, duration?: number) {
    this._snackBar.open(message, undefined, {
      duration: duration || 2500,
      panelClass: ['snackbar-info']
    });
  }

}