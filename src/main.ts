import { createApp } from "vue";
import "./index.css";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import App from "./App.vue";
import Aura from "@primevue/themes/aura";

const pinia = createPinia();

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(pinia)
  .mount("#app");
