import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// Constants
export const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3300";
const AUTH_TOKEN_KEY = "token";
const USER_EMAIL_KEY = "userEmail";
const REFRESH_TOKEN_URL = "/auth/refresh";

/**
 * Custom Axios instance with authentication and refresh token handling
 */
const apiClient = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor to add authentication headers
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const userEmail = localStorage.getItem(USER_EMAIL_KEY);

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
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _isRetry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      try {
        originalRequest._isRetry = true;

        const response = await axios.get(`${API_URL}${REFRESH_TOKEN_URL}`, {
          withCredentials: true,
        });

        if (response.data?.accessToken) {
          localStorage.setItem(AUTH_TOKEN_KEY, response.data.accessToken);

          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("Failed to refresh authentication token:", refreshError);
        localStorage.removeItem(AUTH_TOKEN_KEY);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
