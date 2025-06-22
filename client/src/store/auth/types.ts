import type { User } from "@/utils/auth-types";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  logout: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setUserAndToken: (user: User | null) => void;
  initFromCookies: () => void;
}

export type AuthResponse = {
  status: number;
  token?: string;
  user?: User;
  message?: string;
} 