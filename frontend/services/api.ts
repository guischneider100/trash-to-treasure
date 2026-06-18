import * as SecureStore from 'expo-secure-store';
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.101:8080/api",
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItem("sessionToken");

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
