import type { User } from "../types";
import { storageUtils } from "./storage";
import { AUTH_CONSTANTS } from "../constants";

// Auth0 user interface
interface Auth0User {
  sub?: string;
  name?: string;
  email?: string;
}

// Helper functions for authentication logic
export const authHelpers = {
  // Convert Auth0 user to our User type
  convertAuth0User: (auth0User: Auth0User): User => ({
    id: auth0User.sub || "",
    name: auth0User.name || "",
    email: auth0User.email || "",
  }),

  // Check if user data has changed
  hasUserChanged: (currentUser: User | null, newUser: User): boolean => {
    return !currentUser || currentUser.email !== newUser.email;
  },

  // Validate if user has required fields
  isValidUser: (user: User): boolean => {
    return !!(user.id && user.email);
  },

  // Check if we have valid cached authentication
  hasValidCachedAuth: (): boolean => {
    const token = storageUtils.getToken();
    const user = storageUtils.getUser();
    return !!(token && user && authHelpers.isValidUser(user));
  },

  // Clear authentication data when user changes
  clearAuthOnUserChange: (currentUser: User | null, newUser: User) => {
    if (authHelpers.hasUserChanged(currentUser, newUser)) {
      storageUtils.clearAllStorage();
      return true;
    }
    return false;
  },

  // Get authorization params for Auth0
  getAuth0Params: () => ({
    scope: AUTH_CONSTANTS.AUTH0_SCOPES,
  }),

  // Get logout params for Auth0
  getLogoutParams: () => ({
    returnTo: window.location.origin,
  }),
}; 