import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0ProviderWithNavigate } from "./utils/auth0-provider-with-navigate";
import ErrorBoundary from "./components/shared/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <ChakraProvider value={defaultSystem}>
      <Auth0ProviderWithNavigate>
        <ErrorBoundary showDetails={import.meta.env.DEV}>
          <App />
        </ErrorBoundary>
      </Auth0ProviderWithNavigate>
  </ChakraProvider>
</StrictMode>
);
