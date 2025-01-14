import { ref } from "vue";
import { useSupabaseStorage } from "./useSupabaseStorage";

export const useGetFilesFromBucket = () => {
  const files = ref<any[]>([]);
  const fileIds = ref<string[]>([]);
  const { listFiles } = useSupabaseStorage();

  const getFiles = async () => {
    const listedFiles = await listFiles("test", "private");
    fileIds.value = listedFiles.map((file) => file.name);
    files.value = listedFiles;
  };

  return { files, getFiles, fileIds };
};
