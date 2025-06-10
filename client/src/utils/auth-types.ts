import type { SlideshowFormData } from "@/features/slideshow-form/store/types";

// Authentication related types
export interface User {
  id: string;
  name: string;
  email: string;
  cv: SlideshowFormData;
}

export interface AuthResponse {
  status: number;
  data: {
    message: string;
    token?: string;
    user?: User;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  register: (credentials: RegisterCredentials) => Promise<AuthResponse>;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  initializeAuth: () => void;
  validateToken: () => Promise<boolean>;
}

export interface AxiosError {
  response?: {
    status?: number;
    data?: { message?: string };
  };
} 