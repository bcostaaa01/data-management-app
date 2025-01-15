import { ref } from "vue";
import { useSupabaseStorage } from "./useSupabaseStorage";

export const useGetFilesFromBucket = () => {
  const files = ref<any[]>([]);
  const fileIds = ref<string[]>([]);
  const { listFiles } = useSupabaseStorage();

  const getFiles = async () => {
    const listedFiles = await listFiles("test", "private");

    files.value = listedFiles
      .filter((file) => file.name !== ".emptyFolderPlaceholder")
      .map((file) => ({
        id: file.name,
        name: file.name.split("/").pop() || file.name,
      }));

    fileIds.value = files.value.map((file) => file.id);
  };

  return { files, getFiles, fileIds };
};
