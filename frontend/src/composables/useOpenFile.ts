import supabase from "../supabase/config";
import { ref } from "vue";

export const useOpenFile = () => {
  const signedUrl = ref<any | null>(null);

  const openFile = async (fileName: string) => {
    const { data, error } = await supabase.storage
      .from("test")
      .createSignedUploadUrl("private/" + fileName);

    if (error) {
      console.error("Error opening file:", error);
    } else {
      console.log("File opened successfully:", data);
      signedUrl.value = data;
    }
  };

  const getSignedUrl = async (fileName: string) => {
    const { data, error } = await supabase.storage.from('test').createSignedUploadUrl("private/" + fileName);
    if (error) {
      console.error("Error getting signed url:", error);
    } else {
      console.log("Signed url:", data);
      return data;
    }
  };

  return { openFile, getSignedUrl };
};
