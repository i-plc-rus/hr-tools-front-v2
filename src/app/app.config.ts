import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {API_BASE_URL} from './tokens/api.token';
import {cookieInterceptor} from './interceptors/cookie.interceptor';
import {credentialsInterceptor} from './interceptors/credentials.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(withInterceptors([
      cookieInterceptor,
      credentialsInterceptor
    ])),
    {
      provide: API_BASE_URL,
      useValue: 'https://api-hr.bnbhost.ru'
    }
  ]
};
