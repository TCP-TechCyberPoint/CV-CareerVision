import type { User } from "../types";
import { AUTH_CONSTANTS } from "../constants";

// Storage utility functions for authentication
export const storageUtils = {
  // Set authentication token
  setToken: (token: string) => {
    document.cookie = `${AUTH_CONSTANTS.TOKEN_KEY}=${token}; path=${AUTH_CONSTANTS.COOKIE_PATH}; max-age=${AUTH_CONSTANTS.COOKIE_MAX_AGE}; secure; samesite=${AUTH_CONSTANTS.COOKIE_SAME_SITE}`;
  },

  // Get authentication token
  getToken: (): string | null => {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) => 
      cookie.trim().startsWith(`${AUTH_CONSTANTS.TOKEN_KEY}=`)
    );
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  },

  // Set user data
  setUser: (user: User) => {
    const userString = encodeURIComponent(JSON.stringify(user));
    document.cookie = `${AUTH_CONSTANTS.USER_KEY}=${userString}; path=${AUTH_CONSTANTS.COOKIE_PATH}; max-age=${AUTH_CONSTANTS.COOKIE_MAX_AGE}; secure; samesite=${AUTH_CONSTANTS.COOKIE_SAME_SITE}`;
  },

  // Get user data
  getUser: (): User | null => {
    const cookies = document.cookie.split(";");
    const userCookie = cookies.find((cookie) => 
      cookie.trim().startsWith(`${AUTH_CONSTANTS.USER_KEY}=`)
    );
    
    if (!userCookie) return null;
    
    try {
      const userString = userCookie.split("=")[1];
      return JSON.parse(decodeURIComponent(userString));
    } catch {
      return null;
    }
  },

  // Clear authentication cookies
  clearCookies: () => {
    const expireDate = "Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = `${AUTH_CONSTANTS.TOKEN_KEY}=; path=${AUTH_CONSTANTS.COOKIE_PATH}; expires=${expireDate};`;
    document.cookie = `${AUTH_CONSTANTS.USER_KEY}=; path=${AUTH_CONSTANTS.COOKIE_PATH}; expires=${expireDate};`;
  },

  // Clear localStorage
  clearLocalStorage: () => {
    try {
      localStorage.clear();
      
      // Specifically clear Auth0 keys
      const auth0Keys = Object.keys(localStorage).filter(key => 
        key.includes('auth0') || 
        key.includes('Auth0') || 
        key.includes('access_token') ||
        key.includes('id_token')
      );
      
      auth0Keys.forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (e) {
      console.error("Failed to clear localStorage:", e);
    }
  },

  // Clear sessionStorage
  clearSessionStorage: () => {
    try {
      sessionStorage.clear();
    } catch (e) {
      console.error("Failed to clear sessionStorage:", e);
    }
  },

  // Clear all browser storage
  clearAllStorage: () => {
    storageUtils.clearCookies();
    storageUtils.clearLocalStorage();
    storageUtils.clearSessionStorage();
  },

  // Check if user is authenticated based on cookies
  isAuthenticated: (): boolean => {
    return !!storageUtils.getToken();
  }
}; 