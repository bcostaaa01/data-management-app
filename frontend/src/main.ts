import { createApp } from "vue";
import "./index.css";
import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import App from "./App.vue";
import Aura from "@primevue/themes/aura";
import { router } from "./router";

const pinia = createPinia();

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(pinia)
  .use(router)
  .mount("#app");
