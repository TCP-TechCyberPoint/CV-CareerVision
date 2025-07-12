// Authentication related types
export interface User {
  id: string;
  name: string;
  email: string;
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

export interface AxiosError {
  response?: {
    status?: number;
    data?: { message?: string };
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  isInitialized: boolean;
}

export interface AuthContextType extends AuthState {
  login: (returnTo?: string) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}
export interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
