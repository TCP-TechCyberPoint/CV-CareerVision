// client/src/auth/utils/storage.ts
import type { User } from '../types';
import type { User as Auth0User } from '@auth0/auth0-react';

export const storageUtils = {
  getToken: (): string | null => {
    try {
      return localStorage.getItem('access_token');
    } catch {
      return null;
    }
  },

  setToken: (token: string): void => {
    try {
      localStorage.setItem('access_token', token);
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  },

  getUser: (): User | null => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  setUser: (user: User): void => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user:', error);
    }
  },

  clearAllStorage: (): void => {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  },
};


// client/src/auth/utils/auth-helpers.ts

export const authHelpers = {
  convertAuth0User: (auth0User: Auth0User): User => ({
    id: auth0User.sub!,
    email: auth0User.email!,
    name: auth0User.name!,

  }),

  getAuth0Params: () => ({
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    scope: 'openid profile email',
  }),

  getLogoutParams: () => ({
    returnTo: window.location.origin,
  }),
};
