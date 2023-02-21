import { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig = {
  realm: 'springup-labs',
  url: 'https://slid.springuplabs.com',
  clientId: 'rewards-webapp',
};

export default keycloakConfig;
