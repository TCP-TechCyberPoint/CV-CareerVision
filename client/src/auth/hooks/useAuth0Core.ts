import { useEffect, useState, useCallback, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { User } from "../types";
import { storageUtils, useAuth0Timeout, authHelpers } from "../utils";
import { AUTH_CONSTANTS } from "../constants";

export const useAuth0Core = () => {
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
  const [hasValidToken, setHasValidToken] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Use ref to track current user for comparison without causing re-renders
  const currentUserRef = useRef<User | null>(null);
  const tokenFetchedRef = useRef<string | null>(null); // Track if we've fetched token for current user
  
  const auth0Timeout = useAuth0Timeout(auth0IsLoading);

  // Initialize on mount
  useEffect(() => {
    const existingToken = storageUtils.getToken();
    const existingUser = storageUtils.getUser();
    
    if (existingToken && existingUser) {
      setHasValidToken(true);
      setUser(existingUser);
      currentUserRef.current = existingUser;
      tokenFetchedRef.current = existingUser.email;
    }
    
    setIsInitialized(true);
  }, []);

  // Handle Auth0 user sync
  useEffect(() => {
    if (!isInitialized || (auth0IsLoading && !auth0Timeout)) {
      return;
    }

    if (auth0IsAuthenticated && auth0User) {
      const userData = authHelpers.convertAuth0User(auth0User);
      
      // Clear old data if user changed
      if (authHelpers.clearAuthOnUserChange(currentUserRef.current, userData)) {
        setUser(null);
        setHasValidToken(false);
        tokenFetchedRef.current = null;
      }
      
      setUser(userData);
      currentUserRef.current = userData;
      setHasValidToken(true);
      storageUtils.setUser(userData);
      
      // Only fetch token if we haven't already fetched it for this user
      if (tokenFetchedRef.current !== userData.email) {
        setIsTokenLoading(true);
        const tokenTimeout = setTimeout(() => {
          setIsTokenLoading(false);
        }, AUTH_CONSTANTS.TOKEN_FETCH_TIMEOUT);
        
        getAccessTokenSilently({
          authorizationParams: authHelpers.getAuth0Params()
        })
          .then(token => {
            clearTimeout(tokenTimeout);
            if (token) {
              storageUtils.setToken(token);
              tokenFetchedRef.current = userData.email;
            }
          })
          .catch(error => {
            clearTimeout(tokenTimeout);
            console.error("Error getting access token:", error);
          })
          .finally(() => {
            setIsTokenLoading(false);
          });
      }
        
    } else if (!auth0IsAuthenticated && !auth0IsLoading) {
      setUser(null);
      currentUserRef.current = null;
      tokenFetchedRef.current = null;
      setHasValidToken(false);
      storageUtils.clearAllStorage();
    }
  }, [auth0IsAuthenticated, auth0User, auth0IsLoading, isInitialized, auth0Timeout]); // Removed getAccessTokenSilently

  // Cleanup when auth state changes
  useEffect(() => {
    if (isInitialized && !auth0IsLoading && !auth0IsAuthenticated) {
      setUser(null);
      currentUserRef.current = null;
      tokenFetchedRef.current = null;
      setHasValidToken(false);
      storageUtils.clearAllStorage();
    }
  }, [isInitialized, auth0IsLoading, auth0IsAuthenticated]);

  const loginWithAuth0 = useCallback(async (returnTo?: string) => {
    try {
      await loginWithRedirect({
        appState: { returnTo: returnTo || window.location.pathname },
        authorizationParams: authHelpers.getAuth0Params()
      });
    } catch (error) {
      console.error("Auth0 login error:", error);
    }
  }, [loginWithRedirect]);

  const logout = useCallback(async () => {
    try {
      setUser(null);
      currentUserRef.current = null;
      tokenFetchedRef.current = null;
      setHasValidToken(false);
      storageUtils.clearAllStorage();
      
      if (auth0Logout) {
        await auth0Logout({
          logoutParams: authHelpers.getLogoutParams()
        });
      }
    } catch (error) {
      console.error("Auth0 logout error:", error);
      setUser(null);
      currentUserRef.current = null;
      tokenFetchedRef.current = null;
      setHasValidToken(false);
      storageUtils.clearAllStorage();
    }
  }, [auth0Logout]);

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    try {
      if (auth0IsLoading && hasValidToken) {
        return storageUtils.getToken();
      }
      
      if (auth0IsAuthenticated && auth0User) {
        const token = await getAccessTokenSilently({
          authorizationParams: authHelpers.getAuth0Params()
        });
        
        if (token) {
          storageUtils.setToken(token);
        }
        return token;
      }
      
      storageUtils.clearAllStorage();
      return null;
    } catch (error) {
      console.error("Error getting access token:", error);
      storageUtils.clearAllStorage();
      return null;
    }
  }, [auth0IsAuthenticated, auth0User, getAccessTokenSilently, auth0IsLoading, hasValidToken]);

  return {
    auth0IsAuthenticated,
    auth0User,
    auth0IsLoading,
    user,
    isTokenLoading,
    hasValidToken,
    isInitialized,
    auth0Timeout,
    loginWithAuth0,
    logout,
    getAccessToken
  };
}; 