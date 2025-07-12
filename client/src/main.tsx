import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0ProviderWithNavigate } from "./utils/auth0-provider-with-navigate";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { AuthProvider } from "./auth/context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <ChakraProvider value={defaultSystem}>
      <Auth0ProviderWithNavigate>
      <AuthProvider>
        <ErrorBoundary showDetails={import.meta.env.DEV}>
          <App />
        </ErrorBoundary>
      </AuthProvider>
      </Auth0ProviderWithNavigate>
  </ChakraProvider>
</StrictMode>
);
