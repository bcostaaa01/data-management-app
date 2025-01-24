import { ref } from "vue";
import { defineStore } from "pinia";
import supabase from "../supabase/config";

export const useUserStore = defineStore("user", () => {
  const user = ref<any>(null);
  const userSettings = ref<any>(null);

  const fetchUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      user.value = data;
      return user;
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const getUserSettings = async () => {
    try {
      const { data, error } = await supabase.from("app_settings").select("*");
      if (error) throw error;
      userSettings.value = data;
      return userSettings.value;
    } catch (err) {
      console.error("Error fetching user settings:", err);
    }
  };

  const updateAppSettings = async (settings: any) => {
    try {
      const { data, error } = await supabase
        .from("app_settings")
        .update(settings)
        .eq("id", userSettings.value[0]?.id)
        .select();
      if (error) throw error;
      localStorage.setItem("settings", JSON.stringify(data));
      return data;
    } catch (err) {
      console.error("Error updating app settings:", err);
    }
  };

  const updateUserSettings = async (settings: any) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: settings,
      });
      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error updating user settings:", err);
    }
  };

  return {
    user,
    fetchUser,
    getUserSettings,
    updateAppSettings,
    updateUserSettings,
  };
});
