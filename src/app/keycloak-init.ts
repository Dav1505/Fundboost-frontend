import {AutoRefreshTokenService, provideKeycloak, UserActivityService, withAutoRefreshToken} from 'keycloak-angular';
import {URL,REALM,CLIENT_ID} from './model/support/Constants';

export function provideKeycloakAngular() {
  return provideKeycloak({
    config: {
      url: URL,
      realm: REALM,
      clientId: CLIENT_ID
    },
    initOptions: {
      onLoad: 'login-required',
      checkLoginIframe: false
    },
    features: [
      withAutoRefreshToken({
        onInactivityTimeout: 'logout',
        sessionTimeout: 60000
      })
    ],
    providers: [AutoRefreshTokenService, UserActivityService]
  });
}
