import { ref } from "vue";
import { defineStore } from "pinia";
import supabase from "../supabase/config";

export const useUserStore = defineStore("user", () => {
  const user = ref<any>(null);
  const userSettings = ref<any>(null);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    user.value = data;
    console.log("user", user.value);
    console.log("user", user.value.user.email);
    return user;
  };

  const getUserSettings = async () => {
    const { data, error } = await supabase.from("user_settings").select("*");
    userSettings.value = data;
    console.log("userSettings", userSettings.value);
    return userSettings.value;
  };

  const updateUserSettings = async (settings: any) => {
    const { data, error } = await supabase
      .from("user_settings")
      .update(settings)
      .eq("id", userSettings.value[0].id)
      .select();
    localStorage.setItem("settings", JSON.stringify(data));
    return data;
  };

  return { user, fetchUser, getUserSettings, updateUserSettings };
});
