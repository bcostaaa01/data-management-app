import axios, { AxiosRequestConfig } from "axios";

const token = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseProjectKey = "sbp_2f8d3bfe5c25c9746d0eac063265b9978a81c306";

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
