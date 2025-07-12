import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { storageUtils } from '@/auth';

class ApiService {
  private instance: AxiosInstance;
  private getAccessToken: (() => Promise<string | null>) | null = null;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
    });

    this.setupInterceptors();
  }

  public setTokenGetter(tokenGetter: () => Promise<string | null>) {
    this.getAccessToken = tokenGetter;
  }

  private setupInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        try {
          if (this.getAccessToken) {
            const token = await this.getAccessToken();
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          }
        } catch (error) {
          console.error('Error getting access token:', error);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.error('API 401 Error - clearing tokens');
          storageUtils.clearAllStorage();
          // Optionally redirect to login
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export const axiosInstance = apiService.getInstance();
export const setTokenGetter = apiService.setTokenGetter.bind(apiService);
export default axiosInstance;