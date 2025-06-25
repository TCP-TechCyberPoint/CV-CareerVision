import { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { User } from "./types";
import { cookieUtils } from "@/utils/cookie-utils";

// Global timeout for Auth0 operations


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
  const [hasValidToken, setHasValidToken] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // Mark component as mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Check for existing token on mount to optimize loading state
  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    const existingToken = cookieUtils.getToken();
    const existingUser = cookieUtils.getUser();
    
    if (existingToken && existingUser) {
      setHasValidToken(true);
      setUser(existingUser);
    }
    
    setIsInitialized(true);
  }, [hasMounted]); // Run when component mounts

  // Increased timeout for Auth0 loading to give more time for session restoration
  useEffect(() => {
    if (auth0IsLoading && !auth0Timeout) {
      const timeout = setTimeout(() => {
        setAuth0Timeout(true);
      }, 2000); // Increased from 500ms to 2000ms to give Auth0 more time

      return () => clearTimeout(timeout);
    } else if (!auth0IsLoading) {
      setAuth0Timeout(false);
    }
  }, [auth0IsLoading, auth0Timeout]);

  // Optimized loading state calculation for better refresh handling
  const isLoading = useCallback(() => {
    // If not initialized yet, show loading briefly
    if (!isInitialized) {
      return true;
    }
    
    // If we have a valid token and Auth0 is loading, don't show loading
    if (hasValidToken && auth0IsLoading && !auth0Timeout) {
      return false;
    }
    
    // If Auth0 is loading, show loading only briefly
    if (auth0IsLoading && !auth0Timeout) {
      return true;
    }
    
    // If we're getting a token for an authenticated user, show loading briefly
    if (auth0IsAuthenticated && isTokenLoading) {
      return true;
    }
    
    return false;
  }, [isInitialized, auth0IsLoading, auth0IsAuthenticated, isTokenLoading, auth0Timeout, hasValidToken]);

  // Cleanup effect to clear data when authentication state changes
  useEffect(() => {
    if (isInitialized && !auth0IsLoading && !auth0IsAuthenticated) {
      setUser(null);
      setHasValidToken(false);
      cookieUtils.clearAllStorage();
    }
  }, [isInitialized, auth0IsLoading, auth0IsAuthenticated]);

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
      
      // SECURITY FIX: Always clear old data when Auth0 user changes
      const currentUser = cookieUtils.getUser();
      if (!currentUser || currentUser.email !== userData.email) {
        cookieUtils.clearAllStorage();
        setUser(null); // Clear local state first
        setHasValidToken(false);
      }
      
      // Update local state immediately
      setUser(userData);
      setHasValidToken(true);
      
      cookieUtils.setUser(userData);
      setIsTokenLoading(true);
      
      // Add timeout to prevent hanging
      const tokenTimeout = setTimeout(() => {
        setIsTokenLoading(false);
      }, 1000); // 1 second timeout
      
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
      
    } else if (!auth0IsAuthenticated && !auth0IsLoading) {
      // Only clear data if Auth0 is not loading and not authenticated
      setUser(null);
      setHasValidToken(false);
      cookieUtils.clearAllStorage();
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
      // Clear local state and ALL storage IMMEDIATELY
      setUser(null);
      setHasValidToken(false);
      cookieUtils.clearAllStorage();
      
      // Clear any cached Auth0 state
      if (auth0Logout) {
        await auth0Logout({
          logoutParams: {
            returnTo: window.location.origin
          }
        });
      }
    } catch (error) {
      console.error("Auth0 logout error:", error);
      // Even if Auth0 logout fails, ensure local cleanup happens
      setUser(null);
      setHasValidToken(false);
      cookieUtils.clearAllStorage();
    }
  };

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      // If Auth0 is still loading and we have valid tokens, return the cached token
      if (auth0IsLoading && hasValidToken) {
        const cachedToken = cookieUtils.getToken();
        return cachedToken;
      }
      
      // SECURITY FIX: Only use Auth0 tokens, never fall back to cached tokens
      if (auth0IsAuthenticated && auth0User) {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            scope: "openid profile email",
          }
        });
        
        // Update the stored token only for current authenticated user
        if (token) {
          cookieUtils.setToken(token);
        }
        return token;
      }
      
      // SECURITY FIX: Never return cached tokens from previous users
      // Clear any stale tokens
      cookieUtils.clearAllStorage();
      return null;
    } catch (error) {
      console.error("Error getting access token:", error);
      // SECURITY FIX: Clear potentially stale tokens on error
      cookieUtils.clearAllStorage();
      return null;
    }
  }, [auth0IsAuthenticated, auth0User, getAccessTokenSilently, auth0IsLoading, hasValidToken]);

  // Determine if user is authenticated (optimized for page refreshes)
  const isAuthenticated = useCallback(() => {
    const auth0Auth = auth0IsAuthenticated && !!auth0User;
    
    // During initial loading with valid token, consider user authenticated
    const hasValidTokenDuringLoading = hasValidToken && auth0IsLoading && !auth0Timeout;
    
    // If we have valid tokens and Auth0 is not authenticated, still consider authenticated
    const hasValidTokenButAuth0NotReady = hasValidToken && !auth0IsAuthenticated && (auth0IsLoading || auth0Timeout);
    
    return auth0Auth || hasValidTokenDuringLoading || hasValidTokenButAuth0NotReady;
  }, [auth0IsAuthenticated, auth0User, hasValidToken, auth0IsLoading, auth0Timeout]);

  return {
    isAuthenticated: isAuthenticated(),
    user: auth0User || user,
    isLoading: isLoading(),
    loginWithAuth0,
    logout,
    getAccessToken
  };
}; 