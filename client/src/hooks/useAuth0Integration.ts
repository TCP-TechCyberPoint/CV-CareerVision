import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { User } from "@/utils/auth-types";
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
      
      // Update local state
      setUser(userData);
      
      // Store in cookies
      cookieUtils.setUser(userData);
      cookieUtils.setToken("authenticated");
      
      console.log("User authenticated and stored in cookies:", userData);
    } else if (!auth0IsAuthenticated) {
      // Clear local state and cookies
      setUser(null);
      cookieUtils.clearAll();
    }
  }, [auth0IsAuthenticated, auth0User, isLoading]);

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
      if (auth0IsAuthenticated) {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            scope: "openid profile email",
          }
        });
        return token;
      } else {
        console.log("User is not authenticated with Auth0");
      }
      return null;
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  };

  // Determine if user is authenticated (Auth0 or cookies)
  const isAuthenticated = auth0IsAuthenticated || (!!user && !!cookieUtils.getToken());

  return {
    isAuthenticated,
    user: auth0User || user,
    isLoading,
    loginWithAuth0,
    logout,
    getAccessToken
  };
}; 