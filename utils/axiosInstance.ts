import axios from "axios";
import { getCookie, setCookie } from "./cookieUtils";
// import { getCookie, setCookie } from './cookieUtils'; // Adjust import as needed

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookie("refresh_token");

      try {
        const { data } = await api.post(
          "/refresh-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        localStorage.setItem("access_token", data.access_token);
        setCookie("refresh_token", data.refresh_token);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.access_token}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        // Handle logout or redirection
      }
    }

    return Promise.reject(error);
  }
);

export default api;
