import { createApp } from "vue";
import "./index.css";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import App from "./App.vue";
import Aura from "@primevue/themes/aura";
import { router } from "./router";
import "../node_modules/flowbite-vue/dist/index.css";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const pinia = createPinia();

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(Vue3Toastify, {
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  } as ToastContainerOptions)
  .use(pinia)
  .use(router)
  .mount("#app");
