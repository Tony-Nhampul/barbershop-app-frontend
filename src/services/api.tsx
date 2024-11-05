import axios from "axios";
import { apiBaseUrl, namePersistAuth } from "../config/constants";

export const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use(async (config) => {
  const authUser =
    JSON.parse(sessionStorage.getItem(namePersistAuth) as string) || {};

  if (authUser && authUser?.token) {
    config.headers.Authorization = `Bearer ${authUser?.token}`;
  }

  return config;
});
