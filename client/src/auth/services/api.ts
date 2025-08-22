import axios from "axios";
import { storageUtils } from "../utils";
import { API_ENDPOINTS, AUTH_ERRORS } from "../constants";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

// Request interceptor: attach JWT from storage if present
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = storageUtils.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else if (config.url?.includes(API_ENDPOINTS.CV)) {
        return Promise.reject(new Error(AUTH_ERRORS.AUTHENTICATION_REQUIRED));
      }
    } catch (error) {
      console.error("Error reading access token:", error);
      if (config.url?.includes(API_ENDPOINTS.CV)) {
        return Promise.reject(new Error(AUTH_ERRORS.AUTHENTICATION_FAILED));
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("API 401 Error - clearing potentially stale tokens");
      storageUtils.clearAllStorage();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
