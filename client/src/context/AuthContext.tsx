// context/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect } from "react";
import { cookieUtils } from "@/utils/cookie-utils";
import { useAuthOperations } from "@/hooks/useAuthOperations";
import type { AuthState, AuthContextType } from "@/utils/auth-types";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const logout = () => {
    cookieUtils.clearAll();
    setAuthState({ user: null, token: null, isAuthenticated: false, isLoading: false, error: null });
  };

  const { login, register, validateToken } = useAuthOperations({ setAuthState, logout });

  const clearError = () => setAuthState(prev => ({ ...prev, error: null }));
  const setLoading = (loading: boolean) => setAuthState(prev => ({ ...prev, isLoading: loading }));
  
  const initializeAuth = () => {
    const token = cookieUtils.getToken();
    const user = cookieUtils.getUser();
    if (token) setAuthState(prev => ({ ...prev, token, user, isAuthenticated: true }));
  };

  useEffect(() => initializeAuth(), []);

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
