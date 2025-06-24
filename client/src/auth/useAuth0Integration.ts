import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { User } from "./types";
import { cookieUtils } from "@/utils/cookie-utils";

export const useAuth0Integration = () => {
  const { 
    isAuthenticated: auth0IsAuthenticated, 
    user: auth0User, 
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
    logout: auth0Logout
  } = useAuth0();
  
  const [user, setUser] = useState<User | null>(null);
  const [isTokenLoading, setIsTokenLoading] = useState(false);

  // Sync Auth0 user with local state and cookies
  useEffect(() => {
    if (isLoading) {
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
      
      // Store user in cookies immediately
      cookieUtils.setUser(userData);
      
      console.log("User authenticated and stored in cookies:", userData);
      
      // Get and store the actual access token asynchronously (non-blocking)
      setIsTokenLoading(true);
      getAccessTokenSilently({
        authorizationParams: {
          scope: "openid profile email",
        }
      }).then(token => {
        if (token) {
          cookieUtils.setToken(token);
          console.log("Access token stored in cookies");
        }
      }).catch(error => {
        console.error("Error getting access token for storage:", error);
      }).finally(() => {
        setIsTokenLoading(false);
      });
      
    } else if (!auth0IsAuthenticated) {
      // Clear local state and cookies
      setUser(null);
      cookieUtils.clearAll();
    }
  }, [auth0IsAuthenticated, auth0User, isLoading, getAccessTokenSilently]);

  // Initialize from cookies on mount (only once)
  useEffect(() => {
    const storedUser = cookieUtils.getUser();
    const token = cookieUtils.getToken();
    
    if (storedUser && token && !auth0IsAuthenticated) {
      setUser(storedUser);
      console.log("User loaded from cookies:", storedUser);
    }
  }, []); // Empty dependency array - only run once

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
        console.log("User is not authenticated with Auth0");
      }
      return null;
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  };

  // Determine if user is authenticated (Auth0 or cookies with valid token)
  const isAuthenticated = auth0IsAuthenticated || (!!user && !!cookieUtils.getToken() && cookieUtils.getToken() !== "authenticated");

  // Combine loading states - only show loading if Auth0 is loading or we're getting initial token
  const combinedLoading = isLoading || (auth0IsAuthenticated && isTokenLoading);

  return {
    isAuthenticated,
    user: auth0User || user,
    isLoading: combinedLoading,
    loginWithAuth0,
    logout,
    getAccessToken
  };
}; 