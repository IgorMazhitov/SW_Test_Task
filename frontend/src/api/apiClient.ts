/**
 * API client for making HTTP requests
 */
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { API_URL, HTTP_STATUS, REQUEST_TIMEOUT } from "../config/api.config";
import { STORAGE_KEYS } from "../config/api.config";

/**
 * Custom Axios instance with authentication and refresh token handling
 */
const apiClient = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor to add authentication headers
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const userEmail = localStorage.getItem(STORAGE_KEYS.USER_EMAIL);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (userEmail && config.headers) {
      config.headers.userEmail = userEmail;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle token refresh on 401 errors
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _isRetry?: boolean };
    
    // Handle unauthorized errors with token refresh
    if (
      error.response?.status === HTTP_STATUS.UNAUTHORIZED &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      try {
        originalRequest._isRetry = true;
        
        // Attempt to refresh the token
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });
        
        if (response.data?.accessToken) {
          localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.accessToken);
          
          // Retry the original request with the new token
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh authentication token:", refreshError);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        
        // Handle logout - could dispatch event or redirect
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
