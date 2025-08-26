import axios from 'axios';
import { keycloak } from '../auth/keycloak';

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use(async (config) => {
  if (keycloak.authenticated) {
    if (keycloak.isTokenExpired()) {
      try {
        await keycloak.updateToken(30);
      } catch (error) {
        // Token refresh failed, redirect to login
        keycloak.login();
        return Promise.reject(error);
      }
    }
    config.headers.Authorization = `Bearer ${keycloak.token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid, redirect to login
      keycloak.login();
    }
    return Promise.reject(error);
  }
);
