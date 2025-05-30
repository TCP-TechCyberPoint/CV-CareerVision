import { useCallback } from "react";
import axiosInstance from "@/api/axios-instance";
import { cookieUtils } from "@/utils/cookie-utils";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  AuthState,
  AxiosError,
} from "@/utils/auth-types";

interface UseAuthOperationsProps {
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  logout: () => void;
}

export const useAuthOperations = ({ setAuthState, logout }: UseAuthOperationsProps) => {
  const handleAuthError = useCallback((error: unknown, fallbackMessage: string) => {
    const axiosError = error as AxiosError;
    const customError = axiosError?.response?.data?.message || fallbackMessage;
    const errorMessage = error instanceof Error ? error.message : fallbackMessage;
    
    return {
      status: axiosError?.response?.status || 500,
      data: { message: customError || errorMessage },
    };
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<AuthResponse> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      const authResponse: AuthResponse = { status: response.status, data: response.data };

      if (response.status === 200 && response.data.token) {
        const { token, user } = response.data;
        cookieUtils.setToken(token);
        if (user) cookieUtils.setUser(user);

        setAuthState({
          user: user || null,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: response.data.message || "Login failed",
        }));
      }

      return authResponse;
    } catch (error) {
      const errorResponse = handleAuthError(error, "Login failed");
      setAuthState(prev => ({ ...prev, isLoading: false, error: errorResponse.data.message }));
      return errorResponse;
    }
  }, [setAuthState, handleAuthError]);

  const register = useCallback(async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axiosInstance.post("/auth/register", credentials);
      const authResponse: AuthResponse = { status: response.status, data: response.data };

      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: response.status === 201 ? null : response.data.message || "Registration failed",
      }));

      return authResponse;
    } catch (error) {
      const errorResponse = handleAuthError(error, "Registration failed");
      setAuthState(prev => ({ ...prev, isLoading: false, error: errorResponse.data.message }));
      return errorResponse;
    }
  }, [setAuthState, handleAuthError]);

  const validateToken = useCallback(async (): Promise<boolean> => {
    const token = cookieUtils.getToken();
    
    if (!token) {
      setAuthState(prev => ({ ...prev, isAuthenticated: false, user: null, token: null }));
      return false;
    }

    try {
      const response = await axiosInstance.get("/auth/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const user = cookieUtils.getUser();
        setAuthState(prev => ({ ...prev, isAuthenticated: true, user, token, error: null }));
        return true;
      } else {
        logout();
        return false;
      }
    } catch {
      logout();
      return false;
    }
  }, [setAuthState, logout]);

  return { login, register, validateToken };
}; 