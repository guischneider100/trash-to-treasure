import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: "http://10.195.208.70:8080/api",
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("sessionToken");

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default api;
