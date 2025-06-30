// Main authentication module exports
export * from "./constants";
export * from "./types";
export * from "./utils";
export * from "./hooks";
export * from "./components";
export * from "./services/api";

// Legacy exports for backward compatibility
export { useAuth0Integration } from "./hooks/useAuth0Integration";
export { ProtectedRoute } from "./components/ProtectedRoute";
export { default as Login } from "@/pages/Login";
export { default as useAppInit } from "./hooks/useAppInit";

// Default export for axiosInstance (backward compatibility)
export { default } from "./services/api"; 