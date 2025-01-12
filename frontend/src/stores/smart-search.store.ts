import { ref } from "vue";
import { defineStore } from "pinia";
import supabase from "../supabase/config";

interface FileObject {
  id: number;
  name: string;
}

export const useSmartSearchStore = defineStore("smartSearch", () => {
  const isOpen = ref(false);
  const searchQuery = ref("");
  const searchResults = ref<FileObject[]>([]);

  console.log(searchQuery.value);

  const openModal = () => {
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  const search = async () => {
    const { data, error } = await supabase.storage.from("test").list("private");
    if (error) {
      console.error("Error searching:", error);
    } else {
      console.log(data);
      searchResults.value = data.map((file) => ({
        id: parseInt(file.id),
        name: file.name,
      }));
    }
  };

  return { isOpen, openModal, closeModal, searchQuery, searchResults, search };
});
