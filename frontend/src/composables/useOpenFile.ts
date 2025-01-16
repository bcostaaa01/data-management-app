import supabase from "../supabase/config";
import { ref } from "vue";

export const useOpenFile = () => {
  const signedUrl = ref<any | null>(null);

  const openFile = async (fileName: string) => {
    const { data, error } = await supabase.storage
      .from("reports")
      .createSignedUploadUrl("reports/" + fileName);

    if (error) {
      console.error("Error opening file:", error);
    } else {
      console.log("File opened successfully:", data);
      signedUrl.value = data;
    }
  };

  const getSignedUrl = async (fileName: string) => {
    const { data, error } = await supabase.storage.from('reports').createSignedUploadUrl("reports/" + fileName);
    if (error) {
      console.error("Error getting signed url:", error);
    } else {
      console.log("Signed url:", data);
      return data;
    }
  };

  const downloadFile = async (fileName: string) => {
    const { data, error } = await supabase.storage.from('reports').download("reports/" + fileName);
    if (error) {
      console.error("Error downloading file:", error);
    } else {
      console.log("File downloaded successfully:", data);
      return data;
    }
  };

  return { openFile, getSignedUrl, downloadFile };
};
