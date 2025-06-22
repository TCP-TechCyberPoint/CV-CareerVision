import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthStore } from "@/store/auth/store";
import type { User } from "@/utils/auth-types";

export const useAuth0Integration = () => {
  const { 
    isAuthenticated: auth0IsAuthenticated, 
    user: auth0User, 
    isLoading: auth0IsLoading,
    getAccessTokenSilently,
    loginWithRedirect,
    logout: auth0Logout
  } = useAuth0();
  
  const { 
    setUserAndToken, 
    logout: storeLogout, 
    setLoading,
    isAuthenticated: storeIsAuthenticated,
    user: storeUser
  } = useAuthStore();

  // Sync Auth0 loading state with our auth store
  useEffect(() => {
    setLoading(auth0IsLoading);
  }, [auth0IsLoading, setLoading]);

  // Sync Auth0 authentication state with our auth store
  useEffect(() => {
    if (auth0IsLoading) {
      return;
    }

    if (auth0IsAuthenticated && auth0User) {
      const user: User = {
        id: auth0User.sub || "",
        name: auth0User.name || "",
        email: auth0User.email || "",
      };
      if (!storeUser || storeUser.id !== user.id) {
        setUserAndToken(user);
      }
    } else if (!auth0IsAuthenticated && storeIsAuthenticated) {
      storeLogout();
    }
  }, [auth0IsAuthenticated, auth0User, auth0IsLoading, setUserAndToken, storeLogout, storeIsAuthenticated, storeUser]);

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
      storeLogout();
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
      }
      return null;
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  };

  return {
    isAuthenticated: auth0IsAuthenticated,
    user: auth0User,
    isLoading: auth0IsLoading,
    loginWithAuth0,
    logout,
    getAccessToken
  };
}; 