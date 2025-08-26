import { createRemoteJWKSet, jwtVerify } from 'jose';

const base = (process.env.KEYCLOAK_URL || '').replace(/\/$/, '');
const issuer = `${base}/realms/${process.env.KEYCLOAK_REALM}`;
const audience = process.env.KEYCLOAK_API_AUDIENCE!;
const JWKS = createRemoteJWKSet(new URL(`${issuer}/protocol/openid-connect/certs`));

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, JWKS, { issuer, audience });
  return payload as any; // sub, email, preferred_username, realm_access, etc.
}

