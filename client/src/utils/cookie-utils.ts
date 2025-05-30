import type { User } from "./auth-types";

// Cookie utility functions for authentication
export const cookieUtils = {
  // Set authentication token
  setToken: (token: string) => {
    document.cookie = `auth-token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
  },

  // Get authentication token
  getToken: (): string | null => {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => 
      cookie.trim().startsWith('auth-token=')
    );
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  },

  // Set user data
  setUser: (user: User) => {
    const userString = encodeURIComponent(JSON.stringify(user));
    document.cookie = `auth-user=${userString}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
  },

  // Get user data
  getUser: (): User | null => {
    const cookies = document.cookie.split(';');
    const userCookie = cookies.find(cookie => 
      cookie.trim().startsWith('auth-user=')
    );
    
    if (userCookie) {
      try {
        const userString = userCookie.split('=')[1];
        return JSON.parse(decodeURIComponent(userString));
      } catch (error) {
        console.error('Error parsing user cookie:', error);
        return null;
      }
    }
    
    return null;
  },

  // Clear all authentication cookies
  clearAll: () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    document.cookie = 'auth-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  },

  // Check if user is authenticated based on cookies
  isAuthenticated: (): boolean => {
    return !!cookieUtils.getToken();
  }
}; 