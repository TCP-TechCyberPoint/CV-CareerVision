import { Auth0Provider } from "@auth0/auth0-react";
import type { AppState } from "@auth0/auth0-react";
import { Heading, Text } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode;
}

export const Auth0ProviderWithNavigate = ({
  children,
}: PropsWithChildren<Auth0ProviderWithNavigateProps>): React.ReactNode | null => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = window.location.origin;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId) {
    return (
      <Text p={4} textAlign="center">
        <Heading as="h2" size="lg" mb={2}>Configuration Error</Heading>
        <Text mb={2}>Auth0 environment variables are missing. Please check your .env file.</Text>
        <Text>Required: VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID</Text>
      </Text>
    );
  }

  const onRedirectCallback = (appState?: AppState) => {
    const returnTo = appState?.returnTo || window.location.pathname;
    window.history.replaceState({}, document.title, returnTo);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
        scope: "openid profile email",
      }}
      onRedirectCallback={onRedirectCallback}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      {children}
    </Auth0Provider>
  );
};
