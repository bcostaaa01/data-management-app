import { ref } from "vue";
import { defineStore } from "pinia";

export const useSmartSearchStore = defineStore("smartSearch", () => {
  const isOpen = ref(false);

  const openModal = () => {
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
  };

  return { isOpen, openModal, closeModal };
});
