import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {includeBearerTokenInterceptor} from 'keycloak-angular';

import { routes } from './app.routes';
import {provideKeycloakAngular} from './keycloak-init';
import {bearerTokenInterceptorProvider} from './model/interceptors/Bearer-token-interceptor';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {httpErrorInterceptor} from './model/interceptors/http-error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    bearerTokenInterceptorProvider,
    provideHttpClient(
      withInterceptors([includeBearerTokenInterceptor, httpErrorInterceptor])
    )
  ]
};
