import axios from "axios";

export const API_URL = "http://localhost:3300";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  config.headers.userEmail = `${localStorage.getItem("userEmail")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      try {
        const originalRequest = error.config;
        originalRequest._isRetry = true;
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.log("User is not authorized");
      }
    }
    throw error;
  }
);

export default $api;
