// context/AuthContext.tsx

import React, { createContext, useState, useContext } from "react";
import axiosInstance from "@/api/axios-instance";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<number>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email: string, password: string) => {
    const response = await axiosInstance.post("/auth/login", { email, password });
    console.log("response", response);
    setIsAuthenticated(true);
  };

  const logout = () => setIsAuthenticated(false);

  const register = async (email: string, password: string, name: string) => {
    const response = await axiosInstance.post("/auth/register", { email, password, name });
    console.log("response", response);
    setIsAuthenticated(false);
    return response.status;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
