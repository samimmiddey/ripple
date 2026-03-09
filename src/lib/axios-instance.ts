import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
   baseURL: process.env.EXPO_PUBLIC_API_URL,
   timeout: 15000,
   headers: {
      "Content-Type": "application/json",
   },
});

export default apiClient;