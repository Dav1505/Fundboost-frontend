import {
  createInterceptorCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition
} from 'keycloak-angular';
import {API_URL} from '../support/Constants';

export const bearerTokenInterceptorCondition: IncludeBearerTokenCondition =
  createInterceptorCondition({
    urlPattern: new RegExp(`^${API_URL}(/.*)?$`, 'i'),
    bearerPrefix: 'Bearer'
  });

export const bearerTokenInterceptorProvider = {
  provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  useValue: [bearerTokenInterceptorCondition]
};
