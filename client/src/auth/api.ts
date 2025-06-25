import axios from "axios";
import { cookieUtils } from "@/utils/cookie-utils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

let getAccessToken: (() => Promise<string | null>) | null = null;

export const setTokenGetter = (tokenGetter: () => Promise<string | null>) => {
  getAccessToken = tokenGetter;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      console.log("Axios request interceptor called for:", config.url);
      console.log("getAccessToken function exists:", !!getAccessToken);
      
      if (getAccessToken) {
        const token = await getAccessToken();
        console.log("Token retrieved:", token ? `Bearer ${token.substring(0, 20)}...` : "null");
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log("Authorization header set successfully");
        } else {
          console.warn("No token available, request will be sent without authorization");
          // SECURITY: Don't send requests without proper authentication
          // This could be a race condition where Auth0 hasn't initialized yet
          if (config.url?.includes('/api/cv/')) {
            console.error("Blocking CV API request without authentication");
            return Promise.reject(new Error("Authentication required for CV operations"));
          }
        }
      } else {
        console.error("No token getter function available");
        if (config.url?.includes('/api/cv/')) {
          return Promise.reject(new Error("Authentication not initialized"));
        }
      }
    } catch (error) {
      console.error("Error getting access token:", error);
      if (config.url?.includes('/api/cv/')) {
        return Promise.reject(new Error("Authentication failed"));
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling and token cleanup
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("API 401 Error - clearing potentially stale tokens:", {
        url: error.config?.url,
        method: error.config?.method,
        message: error.response?.data?.message || "Unauthorized",
      });
      
      // SECURITY: Clear potentially stale tokens on 401 errors
      // This helps prevent using old tokens from previous users
      try {
        cookieUtils.clearAllStorage();
        console.log("Cleared all cached tokens due to 401 error");
      } catch (e) {
        console.error("Failed to clear tokens:", e);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
