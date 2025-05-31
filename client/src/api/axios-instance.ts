import axios from "axios";
import { cookieUtils } from "@/utils/cookie-utils";

const VITE_API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL, // Replace with your API URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = cookieUtils.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
