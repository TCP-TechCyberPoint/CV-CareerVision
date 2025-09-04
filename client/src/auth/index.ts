// Main authentication module exports
export * from "./constants";
export * from "./types";
export * from "./utils";
export * from "./services/api";

// New Keycloak exports
export { useAuth, AuthProvider } from "./AuthProvider";
export { keycloak, initAuth } from "./keycloak";

// Protected Route component
export { ProtectedRoute } from "./components/ProtectedRoute";

// Default export for axiosInstance (backward compatibility)
export { default } from "./services/api"; 