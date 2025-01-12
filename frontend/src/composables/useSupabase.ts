import { apiService } from "../services/apiService";

export const useGetSupabaseHealth = async () => {
  const response = await apiService(
    `/api/v1/projects/lmzzocmmjtnupgajguma/health?services=realtime`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  return response;
};
