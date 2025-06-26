// Authentication constants
export const AUTH_CONSTANTS = {
  // Cookie keys
  TOKEN_KEY: "auth-token",
  USER_KEY: "auth-user",
  
  // Timeouts (in milliseconds)
  AUTH0_LOADING_TIMEOUT: 2000,
  TOKEN_FETCH_TIMEOUT: 1000,
  APP_INIT_DELAY: 100,
  
  // Cookie settings
  COOKIE_MAX_AGE: 7 * 24 * 60 * 60, // 7 days
  COOKIE_PATH: "/",
  COOKIE_SECURE: true,
  COOKIE_SAME_SITE: "strict" as const,
  
  // Auth0 scopes
  AUTH0_SCOPES: "openid profile email",
  
  // Loading states
  LOADING_STEPS: {
    INITIALIZING: "Initializing...",
    AUTHENTICATING: "Authenticating...",
    LOADING_DATA: "Loading your data...",
    READY: "Ready!"
  }
} as const;

// API endpoints
export const API_ENDPOINTS = {
  CV: "/api/cv/",
  AUTH: "/api/auth/"
} as const;

// Error messages
export const AUTH_ERRORS = {
  AUTHENTICATION_REQUIRED: "Authentication required for CV operations",
  AUTH_NOT_INITIALIZED: "Authentication not initialized",
  AUTHENTICATION_FAILED: "Authentication failed",
  TOKEN_FETCH_ERROR: "Error getting access token",
  LOGOUT_ERROR: "Auth0 logout error"
} as const; 