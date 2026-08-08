import axios, { AxiosRequestConfig } from "axios";

const token = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseProjectKey = import.meta.env.VITE_SUPABASE_PROJECT_KEY;

export const apiService = (path: string, options?: AxiosRequestConfig) =>
  axios({
    baseURL: import.meta.env.VITE_API_URL,
    url: path,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${supabaseProjectKey}`,
      ...options?.headers,
    },
    withCredentials: true,
  });
