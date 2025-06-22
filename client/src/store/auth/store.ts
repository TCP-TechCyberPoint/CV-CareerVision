import { create } from "zustand";
import { cookieUtils } from "@/utils/cookie-utils";
import type { AuthState } from "./types";
import type { User } from "@/utils/auth-types";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
    cookieUtils.clearAll();
  },

  clearError: () => set({ error: null }),

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setUserAndToken: (user: User | null) => {
    if (user) {
      cookieUtils.setUser(user);
      cookieUtils.setToken("authenticated");
    } else {
      cookieUtils.clearAll();
    }
    
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  },

  initFromCookies: () => {
    const token = cookieUtils.getToken();
    const user = cookieUtils.getUser();
    
    if (token && user) {
      set({
        user,
        isAuthenticated: true,
      });
    } else if (user) {
      set({
        user,
      });
    }
  },
}));
