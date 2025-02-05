import axiosInstance from "axios";
import { env } from "./env";

export const axios = axiosInstance.create({
     baseURL: `${import.meta.env.VITE_API_URL}`,
     headers: {},
});