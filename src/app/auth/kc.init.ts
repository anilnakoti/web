import { KeycloakOptions, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

export function kcInit(kc: KeycloakService): () => Promise<boolean> {
  const options: KeycloakOptions = {
    config: environment.kc,
    loadUserProfileAtStartUp: true,
    initOptions: {
      onLoad: 'check-sso',
      checkLoginIframe: false,
    },
    enableBearerInterceptor: true,
    bearerExcludedUrls: ['/assets', '/api/hello'],
  };
  return () => kc.init(options);
}
