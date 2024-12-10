import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {API_BASE_URL} from './tokens/api.token';
import {cookieInterceptor} from './interceptors/cookie.interceptor';
import {credentialsInterceptor} from './interceptors/credentials.interceptor';
import {TokenService} from './services/token.service';
import {CookieService} from './services/cookie.service';
import {authorizationInterceptor} from './interceptors/authorization.interceptor';
import {provideEnvironmentNgxMask} from 'ngx-mask';
import {provideNativeDateAdapter} from '@angular/material/core';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
registerLocaleData(localeRu, 'ru-RU', localeRuExtra);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(withInterceptors([
      authorizationInterceptor,
      cookieInterceptor,
      credentialsInterceptor
    ])),
    {
      provide: LOCALE_ID,
      useValue: 'ru-RU'
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: {
        hasBackdrop: true,
        backdropClass: 'bg-[var(--overlay)]',
      }
    },
    {
      provide: API_BASE_URL,
      useValue: 'https://a.hr-tools.pro'
    },
    TokenService,
    CookieService,
    provideEnvironmentNgxMask(),
    provideNativeDateAdapter(),
  ]
};
