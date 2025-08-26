import Keycloak from 'keycloak-js';

let keycloakInstance: Keycloak | null = null;

export const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

export async function initAuth() {
  if (keycloakInstance) {
    return keycloakInstance;
  }
  
  try {
    await keycloak.init({ 
      onLoad: 'check-sso', 
      pkceMethod: 'S256',
      checkLoginIframe: false, // Disable iframe checks to avoid CSP issues
      silentCheckSsoRedirectUri: undefined // Remove silent SSO check
    });
    keycloakInstance = keycloak;
    return keycloak;
  } catch (error) {
    console.error('Failed to initialize Keycloak:', error);
    throw error;
  }
}
