import axios from "axios";

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
      if (getAccessToken) {
        const token = await getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error("Error getting access token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("API 401 Error:", {
        url: error.config?.url,
        method: error.config?.method,
        message: error.response?.data?.message || "Unauthorized",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
