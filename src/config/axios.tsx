import axiosInstance from "axios";
import { env } from "./env";
import Cookies from "js-cookie";
import { UserType } from "../context/AuthContext";
import { isTokenExpired } from "../utils/app/time";

export const axios = axiosInstance.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = JSON.parse(Cookies.get("token") || "null");
    const user: UserType = JSON.parse(Cookies.get("user") || "null");
    if (token && user) {
      if (isTokenExpired(token.access)) {
        Cookies.remove("token");      
        Cookies.remove("user");      
        window.location.href = "/auth/sign-in";
      } else {
        config.headers.Authorization = `Bearer ${token.access}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      Cookies.remove("token");
      // Optionally, redirect to login page or show a message
    }
    return Promise.reject(error);
  }
);
