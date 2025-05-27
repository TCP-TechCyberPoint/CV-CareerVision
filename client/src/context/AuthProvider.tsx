import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    console.log(email, password);
    // TODO: Implement actual API call here
    // For now, we'll just simulate a successful login
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const signup = async (email: string, password: string, name: string) => {
    console.log(email, password, name);
    // TODO: Implement actual API call here
    // For now, we'll just simulate a successful login
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}; 