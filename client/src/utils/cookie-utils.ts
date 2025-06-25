import type { User } from "@/auth/types";

const TOKEN_KEY = "auth-token";
const USER_KEY = "auth-user";

// Cookie utility functions for authentication
export const cookieUtils = {
  // Set authentication token
  setToken: (token: string) => {
    document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
  },

  // Get authentication token
  getToken: (): string | null => {
    const cookies = document.cookie.split(";");
    const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith(`${TOKEN_KEY}=`));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  },

  // Set user data
  setUser: (user: User) => {
    const userString = encodeURIComponent(JSON.stringify(user));
    document.cookie = `${USER_KEY}=${userString}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
  },

  // Get user data
  getUser: (): User | null => {
    const cookies = document.cookie.split(";");
    const userCookie = cookies.find((cookie) => cookie.trim().startsWith(`${USER_KEY}=`));
    
    if (!userCookie) return null;
    
    try {
      const userString = userCookie.split("=")[1];
      return JSON.parse(decodeURIComponent(userString));
    } catch {
      return null;
    }
  },

  // Clear all authentication cookies
  clearAll: () => {
    document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    document.cookie = `${USER_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  },

  // Clear all browser storage (cookies + localStorage + sessionStorage)
  clearAllStorage: () => {
    // Clear cookies
    cookieUtils.clearAll();
    
    // Clear localStorage (where Auth0 stores tokens)
    try {
      // Clear all localStorage
      localStorage.clear();
      console.log("Cleared localStorage");
      
      // Specifically clear Auth0 keys (in case they persist)
      const auth0Keys = Object.keys(localStorage).filter(key => 
        key.includes('auth0') || 
        key.includes('Auth0') || 
        key.includes('access_token') ||
        key.includes('id_token')
      );
      
      auth0Keys.forEach(key => {
        localStorage.removeItem(key);
        console.log(`Removed Auth0 key: ${key}`);
      });
      
    } catch (e) {
      console.error("Failed to clear localStorage:", e);
    }
    
    // Clear sessionStorage
    try {
      sessionStorage.clear();
      console.log("Cleared sessionStorage");
    } catch (e) {
      console.error("Failed to clear sessionStorage:", e);
    }
  },

  // Check if user is authenticated based on cookies
  isAuthenticated: (): boolean => {
    return !!cookieUtils.getToken();
  }
}; 