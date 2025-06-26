import { useCallback } from "react";
import { useAuth0Core } from "./useAuth0Core";

export const useAuth0Integration = () => {
  const {
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
  } = useAuth0Core();

  // Optimized loading state calculation
  const isLoading = useCallback(() => {
    if (!isInitialized) return true;
    if (hasValidToken && auth0IsLoading && !auth0Timeout) return false;
    if (auth0IsLoading && !auth0Timeout) return true;
    if (auth0IsAuthenticated && isTokenLoading) return true;
    return false;
  }, [isInitialized, auth0IsLoading, auth0IsAuthenticated, isTokenLoading, auth0Timeout, hasValidToken]);

  // Determine if user is authenticated
  const isAuthenticated = useCallback(() => {
    const auth0Auth = auth0IsAuthenticated && !!auth0User;
    const hasValidTokenDuringLoading = hasValidToken && auth0IsLoading && !auth0Timeout;
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