import { ref } from "vue";

export const useSidebar = () => {
  const visible = ref(false);

  const toggleSidebar = () => {
    visible.value = !visible.value;
  };

  return { visible, toggleSidebar };
};
