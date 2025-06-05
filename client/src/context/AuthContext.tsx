// context/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { cookieUtils } from "@/utils/cookie-utils";
import { useAuthOperations } from "@/hooks/useAuthOperations";
import type { AuthState, AuthContextType } from "@/utils/auth-types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const logout = () => {
    cookieUtils.clearAll();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const { login, register, validateToken } = useAuthOperations({
    setAuthState,
    logout,
  });

  const clearError = () => setAuthState((prev) => ({ ...prev, error: null }));
  const setLoading = (loading: boolean) =>
    setAuthState((prev) => ({ ...prev, isLoading: loading }));

  const initializeAuth = useCallback(() => {
    const token = cookieUtils.getToken();
    const user = cookieUtils.getUser();
    
    if (token) {
      setAuthState((prev) => ({ 
        ...prev, 
        token, 
        user, 
        isAuthenticated: true,
        isLoading: false 
      }));
    } else {
      setAuthState((prev) => ({ 
        ...prev, 
        isAuthenticated: false,
        isLoading: false 
      }));
    }
  }, []);

  useEffect(() => { 
    initializeAuth();
  }, [initializeAuth]);

  // Background token validation - runs once after initialization
  useEffect(() => {
    const backgroundValidation = async () => {
      // Only validate if we think we're authenticated but haven't validated yet
      if (authState.isAuthenticated && authState.token && !authState.isLoading) {
        try {
          const isValid = await validateToken();
          if (!isValid) {
            // Token is invalid, logout
            logout();
          }
        } catch (error) {
          console.warn("Background token validation failed:", error);
          // Don't logout on network errors, just log the warning
        }
      }
    };

    // Run validation after a short delay to avoid blocking initial render
    const timeoutId = setTimeout(backgroundValidation, 1000);
    return () => clearTimeout(timeoutId);
  }, [authState.isAuthenticated, authState.token, authState.isLoading, validateToken]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        clearError,
        setLoading,
        initializeAuth,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
