import { create } from "zustand";
import { cookieUtils } from "@/utils/cookie-utils";
import { loginUser, registerUser } from "./actions";
import type { AuthState, LoginCredentials, RegisterCredentials } from "./types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    return loginUser(credentials, set);
  },

  register: async (credentials: RegisterCredentials) => {
    return registerUser(credentials, set);
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
    cookieUtils.clearAll();
  },

  clearError: () => set({ error: null }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
