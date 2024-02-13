import { getCurrentConfig } from "@/config/config";
import { getToken } from "@/storage/token";
import axios from "axios";

// Moved the retrieval of app_url inside a function to be executed when needed
const getBaseUrl = async () => {
  const app_url = await getCurrentConfig();
  return app_url || "http://localhost:3000";
};

// Create an Axios instance with default configuration
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to add authorization token from session storage to requests
api.interceptors.request.use(
  async (config) => {
    const baseUrl = await getBaseUrl();
    config.baseURL = baseUrl.appUrl;
    const accessToken = getToken();
    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define functions for common HTTP methods (GET, POST, PUT, PATCH, DELETE)
export const get = (url, params) => api.get(url, { params });
export const post = (url, data) => api.post(url, data);
export const put = (url, data) => api.put(url, data);
export const patch = (url, data) => api.patch(url, data);
export const del = (url) => api.delete(url);
