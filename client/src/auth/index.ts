// Main authentication module exports
export * from "./constants";
export * from "./types";
export * from "./components";
export * from "./context/AuthContext";




// Export all authentication hooks
export { useAuth0Integration } from "./hooks/useAuth0Integration";
export { default as useAppInit } from "./hooks/useAppInit";

// Export all services
export { default as api } from "./services/api";
export { setTokenGetter } from "./services/api";

// Legacy exports for backward compatibility
export { ProtectedRoute } from "./components/ProtectedRoute";
export { default as Login } from "@/pages/Login";

// Export all utils
export { authHelpers } from "./utils/auth-helpers";
export { storageUtils } from "./utils/storage";
export { useAuth0Timeout } from "./utils/timeout";

// Default export for axiosInstance (backward compatibility)
export { default } from "./services/api";
