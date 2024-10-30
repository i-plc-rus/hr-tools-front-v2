import {AbstractControl, ValidationErrors} from '@angular/forms';
import {ApiService} from '../api/Api';
import {catchError, delay, map, Observable, of, switchMap} from 'rxjs';

export function emailExist(apiService: ApiService) {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      delay(500),
      switchMap(email => apiService.v1AuthCheckEmailCreate({email})
        .pipe(
          map(() => null),
          catchError(() => of({emailExists: true}))
        )
      )
    )
  }
}
