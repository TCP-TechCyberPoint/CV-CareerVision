import { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { User } from "./types";
import { cookieUtils } from "@/utils/cookie-utils";

// Global timeout for Auth0 operations
const AUTH0_TIMEOUT = 10000; // 10 seconds

export const useAuth0Integration = () => {
  const { 
    isAuthenticated: auth0IsAuthenticated, 
    user: auth0User, 
    isLoading: auth0IsLoading,
    getAccessTokenSilently,
    loginWithRedirect,
    logout: auth0Logout
  } = useAuth0();
  
  const [user, setUser] = useState<User | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [auth0Timeout, setAuth0Timeout] = useState(false);

  // Initialize from cookies on mount (only once)
  useEffect(() => {
    const storedUser = cookieUtils.getUser();
    const token = cookieUtils.getToken();
    
    if (storedUser && token && token !== "authenticated") {
      setUser(storedUser);
    }
    
    setIsInitialized(true);
  }, []); // Empty dependency array - only run once

  // Global timeout for Auth0 loading
  useEffect(() => {
    if (auth0IsLoading && !auth0Timeout) {
      const timeout = setTimeout(() => {
        console.warn("Auth0 loading timed out, proceeding with cached data");
        setAuth0Timeout(true);
      }, AUTH0_TIMEOUT);

      return () => clearTimeout(timeout);
    } else if (!auth0IsLoading) {
      setAuth0Timeout(false);
    }
  }, [auth0IsLoading, auth0Timeout]);

  // Optimized loading state calculation
  const isLoading = useCallback(() => {
    // If not initialized yet, show loading briefly
    if (!isInitialized) return true;
    
    // If Auth0 timed out, don't show loading
    if (auth0Timeout) return false;
    
    // If Auth0 is loading and we don't have cached user data, show loading
    if (auth0IsLoading && !user) return true;
    
    // If we're getting a token for an authenticated user, show loading briefly
    if (auth0IsAuthenticated && isTokenLoading) return true;
    
    return false;
  }, [isInitialized, auth0IsLoading, user, auth0IsAuthenticated, isTokenLoading, auth0Timeout]);

  // Sync Auth0 user with local state and cookies
  useEffect(() => {
    if (!isInitialized || (auth0IsLoading && !auth0Timeout)) {
      return;
    }

    if (auth0IsAuthenticated && auth0User) {
      const userData: User = {
        id: auth0User.sub || "",
        name: auth0User.name || "",
        email: auth0User.email || "",
      };
      
      // Update local state immediately
      setUser(userData);
      
      cookieUtils.setUser(userData);
      setIsTokenLoading(true);
      
      // Add timeout to prevent hanging
      const tokenTimeout = setTimeout(() => {
        setIsTokenLoading(false);
        console.warn("Token retrieval timed out");
      }, 5000); // 5 second timeout
      
      getAccessTokenSilently({
        authorizationParams: {
          scope: "openid profile email",
        }
      }).then(token => {
        clearTimeout(tokenTimeout);
        if (token) {
          cookieUtils.setToken(token);
        }
      }).catch(error => {
        clearTimeout(tokenTimeout);
        console.error("Error getting access token for storage:", error);
      }).finally(() => {
        setIsTokenLoading(false);
      });
      
    } else if (!auth0IsAuthenticated) {
      setUser(null);
      cookieUtils.clearAll();
    }
  }, [auth0IsAuthenticated, auth0User, auth0IsLoading, isInitialized, auth0Timeout, getAccessTokenSilently]);

  const loginWithAuth0 = async (returnTo?: string) => {
    try {
      await loginWithRedirect({
        appState: { returnTo: returnTo || window.location.pathname },
        authorizationParams: {
          scope: "openid profile email",
        }
      });
    } catch (error) {
      console.error("Auth0 login error:", error);
    }
  };

  const logout = async () => {
    try {
      // Clear local state and cookies
      setUser(null);
      cookieUtils.clearAll();
      
      await auth0Logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    } catch (error) {
      console.error("Auth0 logout error:", error);
    }
  };

  const getAccessToken = async (): Promise<string | null> => {
    try {
      // First try to get from Auth0 if authenticated
      if (auth0IsAuthenticated) {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            scope: "openid profile email",
          }
        });
        // Update the stored token
        if (token) {
          cookieUtils.setToken(token);
        }
        return token;
      } else {
        // Try to get from cookies
        const storedToken = cookieUtils.getToken();
        if (storedToken && storedToken !== "authenticated") {
          return storedToken;
        }
      }
      return null;
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  };

  // Determine if user is authenticated (Auth0 or cookies with valid token)
  const isAuthenticated = auth0IsAuthenticated || (!!user && !!cookieUtils.getToken() && cookieUtils.getToken() !== "authenticated");

  return {
    isAuthenticated,
    user: auth0User || user,
    isLoading: isLoading(),
    loginWithAuth0,
    logout,
    getAccessToken
  };
}; 