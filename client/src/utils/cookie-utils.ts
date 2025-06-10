import type { User } from "./auth-types";

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

  // Check if user is authenticated based on cookies
  isAuthenticated: (): boolean => {
    return !!cookieUtils.getToken();
  }
}; 