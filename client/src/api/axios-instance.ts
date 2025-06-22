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
      console.log("Axios request interceptor called for:", config.url);
      console.log("getAccessToken function exists:", !!getAccessToken);
      
      if (getAccessToken) {
        const token = await getAccessToken();
        console.log("Token retrieved:", token ? `Bearer ${token.substring(0, 20)}...` : "null");
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log("Authorization header set successfully");
        } else {
          console.log("No token available, request will be sent without authorization");
        }
      } else {
        console.log("No token getter function available");
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
