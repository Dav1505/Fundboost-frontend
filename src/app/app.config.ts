import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideKeycloak} from 'keycloak-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloak({
      config: {
        url: 'http://localhost:8180',
        realm: 'fundboost',
        clientId: 'fundboost-client'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false
      }
    }),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};
