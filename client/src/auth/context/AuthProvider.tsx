import { useCallback, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import type { AuthContextType, AuthState } from "@/auth/types";
import { AuthContext, authHelpers, storageUtils } from "@/auth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const {
      isAuthenticated: auth0IsAuthenticated,
      isLoading: auth0IsLoading,
      user: auth0User,
      loginWithRedirect,
      logout: auth0Logout,
      getAccessTokenSilently,
    } = useAuth0();
  
    const [authState, setAuthState] = useState<AuthState>({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      isInitialized: false,
    });
  
    // Initialize auth state from storage
    useEffect(() => {
      const initializeAuth = () => {
        const storedUser = storageUtils.getUser();
        const storedToken = storageUtils.getToken();
        
        if (storedUser && storedToken) {
          setAuthState((prev) => ({
            ...prev,
            user: storedUser,
            isAuthenticated: true,
            isInitialized: true,
          }));
        } else {
          setAuthState((prev) => ({
            ...prev,
            isInitialized: true,
          }));
        }
      };
  
      initializeAuth();
    }, []);
  
    // Handle Auth0 authentication state changes
    useEffect(() => {
      if (!authState.isInitialized) return;
  
      const handleAuthChange = async () => {
        if (auth0IsAuthenticated && auth0User) {
          const userData = authHelpers.convertAuth0User(auth0User);
          
          // Check if user changed
          if (authState.user?.email !== userData.email) {
            storageUtils.clearAllStorage();
          }
          
          // Update user data
          storageUtils.setUser(userData);
          
          // Get and store token
          try {
            const token = await getAccessTokenSilently({
              authorizationParams: authHelpers.getAuth0Params(),
            });
            
            if (token) {
              storageUtils.setToken(token);
            }
          } catch (error) {
            console.error("Failed to get access token:", error);
          }
          
          setAuthState((prev) => ({
            ...prev,
            isAuthenticated: true,
            user: userData,
            isLoading: false,
          }));
        } else if (!auth0IsAuthenticated && !auth0IsLoading) {
          // User is not authenticated
          storageUtils.clearAllStorage();
          setAuthState((prev) => ({
            ...prev,
            isAuthenticated: false,
            user: null,
            isLoading: false,
          }));
        }
      };
  
      handleAuthChange();
    }, [
      auth0IsAuthenticated,
      auth0User,
      auth0IsLoading,
      authState.isInitialized,
      authState.user?.email,
      getAccessTokenSilently,
    ]);
  
    // Update loading state based on Auth0 loading
    useEffect(() => {
      if (authState.isInitialized) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: auth0IsLoading,
        }));
      }
    }, [auth0IsLoading, authState.isInitialized]);
  
    const login = useCallback(
      async (returnTo?: string) => {
        try {
          await loginWithRedirect({
            appState: { returnTo: returnTo || window.location.pathname },
            authorizationParams: authHelpers.getAuth0Params(),
          });
        } catch (error) {
          console.error("Login error:", error);
        }
      },
      [loginWithRedirect]
    );
  
    const logout = useCallback(async () => {
      try {
        storageUtils.clearAllStorage();
        setAuthState((prev) => ({
          ...prev,
          isAuthenticated: false,
          user: null,
        }));
        
        await auth0Logout({
          logoutParams: authHelpers.getLogoutParams(),
        });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }, [auth0Logout]);
  
    const getAccessToken = useCallback(async (): Promise<string | null> => {
      try {
        if (!authState.isAuthenticated) {
          return null;
        }
  
        const token = await getAccessTokenSilently({
          authorizationParams: authHelpers.getAuth0Params(),
        });
  
        if (token) {
          storageUtils.setToken(token);
        }
  
        return token;
      } catch (error) {
        console.error("Error getting access token:", error);
        return null;
      }
    }, [authState.isAuthenticated, getAccessTokenSilently]);
  
    const value: AuthContextType = {
      ...authState,
      login,
      logout,
      getAccessToken,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  };
  