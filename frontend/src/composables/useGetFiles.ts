import { ref } from "vue";
import { useSupabaseStorage } from "./useSupabaseStorage";

export const useGetFilesFromBucket = () => {
  const files = ref<any[]>([]);
  const { listFiles } = useSupabaseStorage();

  const getFiles = async () => {
    files.value = await listFiles("test", "private");
  };

  return { files, getFiles };
};
