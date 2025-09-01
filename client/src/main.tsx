import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./components/shared/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
  <ChakraProvider value={defaultSystem}>
    <ErrorBoundary showDetails={import.meta.env.DEV}>
      <App />
    </ErrorBoundary>
  </ChakraProvider>
</StrictMode>
);
